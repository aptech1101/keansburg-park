import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Pagination, Spinner, Table } from "react-bootstrap";
import { apiConfig, getAuthHeaders } from "../../services/api";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const AdminContact: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // state cho popup
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");
      const params: any = { page, limit };
      if (search) params.search = search;

      const res = await axios.get(`${apiConfig.baseURL}/admin/messages`, {
        headers: getAuthHeaders(),
        params,
      });

      if (res.data.status === "success") {
        setMessages(res.data.data);
        setTotal(res.data.total);
      } else {
        setError("Cannot fetch messages");
      }
    } catch (err) {
      console.error(err);
      setError("Error while fetching messages");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      const res = await axios.delete(
        `${apiConfig.baseURL}/admin/messages?id=${id}`,
        { headers: getAuthHeaders() }
      );

      if (res.data.status === "success") {
        fetchMessages();
      } else {
        setError("Failed to delete message");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting message");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container-fluid admin-contact admin-table admin-form admin-modal admin-pagination">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="mb-2 mb-md-0">Contact Messages</h2>
      </div>

      <div className="d-flex flex-column flex-md-row gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name/email/subject"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="mb-2 mb-md-0"
        />
      </div>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : messages.length === 0 ? (
        <Alert variant="info">No messages found.</Alert>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="d-none d-md-table-cell">Email</th>
                  <th className="d-none d-lg-table-cell">Phone</th>
                  <th>Subject</th>
                  <th className="d-none d-lg-table-cell">Message</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id}>
  <td>
    {msg.name}
    <div className="d-md-none">
      <small className="text-muted">{msg.email}</small>
      <br />
      <small className="text-muted">{msg.phone}</small>
    </div>
  </td>
  <td className="d-none d-md-table-cell">{msg.email}</td>
  <td className="d-none d-lg-table-cell">{msg.phone}</td>
  <td>{msg.subject}</td>
  <td className="d-none d-lg-table-cell">
    <div
      style={{
        maxWidth: "300px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        cursor: "pointer",
      }}
      onClick={() => {
        setSelectedMessage(msg);
        setShowModal(true);
      }}
      title="Click to view full message"
    >
      {msg.message}
    </div>
  </td>
  <td>{new Date(msg.created_at).toLocaleString()}</td>
  <td className="d-flex gap-2">
    <Button
      size="sm"
      variant="outline-primary"
      onClick={() => {
        setSelectedMessage(msg);
        setShowModal(true);
      }}
    >
      View
    </Button>
    <Button
      size="sm"
      variant="outline-danger"
      onClick={() => deleteMessage(msg.id)}
    >
      Delete
    </Button>
  </td>
</tr>
                ))}
              </tbody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === page}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Modal xem chi tiết message */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMessage ? selectedMessage.subject : "Message"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              <p>
                <strong>From:</strong> {selectedMessage.name} (
                {selectedMessage.email})
              </p>
              {selectedMessage.phone && (
                <p>
                  <strong>Phone:</strong> {selectedMessage.phone}
                </p>
              )}
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
              <hr />
              <p style={{ whiteSpace: "pre-line" }}>{selectedMessage.message}</p>
            </div>
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

export default AdminContact;
