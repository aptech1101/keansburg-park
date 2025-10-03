import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Form,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import { apiConfig, getAuthHeaders } from "../../services/api";

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

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const params: any = { page, limit };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;

      const res = await axios.get(`${apiConfig.baseURL}/admin/orders`, {
        headers: getAuthHeaders(),
        params,
      });

      if (res.data.data) {
        setOrders(res.data.data);
        setTotal(res.data.total);
      } else {
        setError("Cannot fetch orders");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetail = async (id: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiConfig.baseURL}/admin/orders`, {
        headers: getAuthHeaders(),
        params: { id },
      });

      if (res.data.data) {
        setSelectedOrder(res.data.data);
        setShowModal(true);
      } else {
        setError("Failed to load order detail");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading order detail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, search, statusFilter, fromDate, toDate]);

  const totalPages = Math.ceil(total / limit);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Badge bg="success">Paid</Badge>;
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "cancelled":
      case "refunded":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container-fluid admin-orders admin-table admin-form admin-pagination">
      <h2 className="mb-4">Order Management</h2>

      <div className="d-flex flex-column flex-md-row gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Search by code/email"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <Form.Select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          style={{ minWidth: "180px" }}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
        </Form.Select>
        <Form.Control
          type="date"
          value={fromDate}
          onChange={(e) => {
            setPage(1);
            setFromDate(e.target.value);
          }}
        />
        <Form.Control
          type="date"
          value={toDate}
          onChange={(e) => {
            setPage(1);
            setToDate(e.target.value);
          }}
        />
      </div>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order Code</th>
                  <th>Username (Email)</th>
                  <th>Subtotal</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => fetchOrderDetail(order.id)}
                  >
                    <td>{order.booking_code}</td>
                    <td>
                      {order.full_name}{" "}
                      {order.email && <span className="text-muted">({order.email})</span>}
                    </td>
                    <td>${order.subtotal}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {page > 1 && (
                  <Pagination.Prev onClick={() => setPage(page - 1)} />
                )}

                {page > 2 && (
                  <>
                    <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
                    {page > 3 && <Pagination.Ellipsis disabled />}
                  </>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - page) <= 1)
                  .map((p) => (
                    <Pagination.Item
                      key={p}
                      active={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Item>
                  ))}

                {page < totalPages - 1 && (
                  <>
                    {page < totalPages - 2 && <Pagination.Ellipsis disabled />}
                    <Pagination.Item onClick={() => setPage(totalPages)}>{totalPages}</Pagination.Item>
                  </>
                )}

                {page < totalPages && (
                  <Pagination.Next onClick={() => setPage(page + 1)} />
                )}
              </Pagination>

            </div>
          )}
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
              <p>Status: {getStatusBadge(selectedOrder.status)}</p>
              <p>Subtotal: ${selectedOrder.subtotal}</p>

              <h6>Items</h6>
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th>Ticket code</th>
                    <th>Using Date</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Discount Rate</th>
                    <th>Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item) => (
                    <tr key={item.bookingdetail_id}>
                      <td>{item.ticket_code}</td>
                      <td>{item.using_date}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit_price ?? "-"}</td>
                      <td>{item.discount_rate ?? "-"}</td>
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
