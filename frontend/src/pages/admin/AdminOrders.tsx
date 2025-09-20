import { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Table,
  Spinner,
  Alert,
  Form,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";

interface Order {
  id: number;
  booking_code: string;
  full_name: string;
  subtotal: number;
  status: string;
  created_at: string;
  email?: string;
}

interface OrderDetail extends Order {
  phone?: string;
  items: {
    bookingdetail_id: number;
    ticket_id: number;
    ticket_code: string;
    using_date: string;
    quantity: number;
    unit_price?: number;
    discount_rate?: number;
    line_total: number;
  }[];
}

interface ApiResponse<T> {
  data: T;
  total: number;
  per_page: number;
  current_page: number;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [showModal, setShowModal] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const token = localStorage.getItem("token");

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get<ApiResponse<Order[]>>("http://localhost:8000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          per_page: perPage,
          search,
          status,
          from: fromDate,
          to: toDate,
        },
      })
      .then((res) => {
        setOrders(res.data.data || []);
        setTotal(res.data.total || 0);
        setError(null);
      })
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [page, perPage]);

  const fetchOrderDetail = (id: number) => {
    setLoading(true);
    axios
      .get<{ data: OrderDetail }>(
        `http://localhost:8000/api/admin/orders?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setSelectedOrder(res.data.data);
        setShowModal(true);
      })
      .catch(() => setError("Failed to load order detail"))
      .finally(() => setLoading(false));
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>

      {/* Filters */}
      <Form
        className="mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          fetchOrders();
        }}
      >
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Search (Order Code / Email)</Form.Label>
              <Form.Control
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>To</Form.Label>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button type="submit" className="w-100">
              Apply
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Loading */}
      {loading && <Spinner animation="border" />}

      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Empty */}
      {!loading && !error && orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {/* Table */}
      {!loading && orders.length > 0 && (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order Code</th>
                <th>User</th>
                <th>Subtotal</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => fetchOrderDetail(o.id)}
                >
                  <td>{o.booking_code}</td>
                  <td>
                    {o.full_name} {o.email && `(${o.email})`}
                  </td>
                  <td>${o.subtotal}</td>
                  <td>{o.status}</td>
                  <td>{new Date(o.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center">
            <Form.Select
              style={{ width: "100px" }}
              value={perPage}
              onChange={(e) => {
                setPerPage(parseInt(e.target.value));
                setPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Form.Select>

            <Pagination>
              <Pagination.First
                onClick={() => setPage(1)}
                disabled={page === 1}
              />
              <Pagination.Prev
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              />
              <Pagination.Last
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
              />
            </Pagination>
          </div>
        </>
      )}

      {/* Modal chi tiết đơn */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!selectedOrder ? (
            <p>Loading...</p>
          ) : (
            <>
              <h5>
                {selectedOrder.booking_code} - {selectedOrder.full_name}
              </h5>
              <p>
                Email: {selectedOrder.email} | Phone: {selectedOrder.phone}
              </p>
              <p>
                Status: <b>{selectedOrder.status}</b>
              </p>
              <p>Subtotal: ${selectedOrder.subtotal}</p>

              <h6>Items</h6>
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th>Ticket code</th>
                    <th>Using Date</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Discount rate</th>
                    <th>Line total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item.bookingdetail_id}>
                      <td>{item.ticket_code}</td>
                      <td>{item.using_date}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit_price}</td>
                      <td>{item.discount_rate}</td>
                      <td>${item.line_total}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOrders;
