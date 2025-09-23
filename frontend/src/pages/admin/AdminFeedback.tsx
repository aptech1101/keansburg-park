import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Pagination, Spinner, Table, Badge } from "react-bootstrap";
import { apiConfig, getAuthHeaders } from "../../services/api";

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  created_by: number | null;
  created_at: string;
}

const AdminFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError("");
      const params: any = { page, limit };
      if (search) params.search = search;
      if (statusFilter !== "all") params.status = statusFilter;

      const res = await axios.get(
        `${apiConfig.baseURL}/admin/feedback`,
        {
          headers: getAuthHeaders(),
          params,
        }
      );
      
      if (res.data.status === "success") {
        setFeedbacks(res.data.data);
        setTotal(res.data.total);
      } else {
        setError("Cannot fetch feedbacks");
      }
    } catch (err) {
      setError("Error while fetching feedbacks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateFeedbackStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      const res = await axios.put(
        `${apiConfig.baseURL}/admin/feedback`,
        { id, status },
        { headers: getAuthHeaders() }
      );
      
      if (res.data.status === "success") {
        fetchFeedbacks(); // Refresh the list
      } else {
        setError("Failed to update feedback status");
      }
    } catch (err) {
      setError("Error updating feedback status");
      console.error(err);
    }
  };

  const deleteFeedback = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    
    try {
      const res = await axios.delete(
        `${apiConfig.baseURL}/admin/feedback?id=${id}`,
        { headers: getAuthHeaders() }
      );
      
      if (res.data.status === "success") {
        fetchFeedbacks(); // Refresh the list
      } else {
        setError("Failed to delete feedback");
      }
    } catch (err) {
      setError("Error deleting feedback");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [page, search, statusFilter]);

  const totalPages = Math.ceil(total / limit);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="mb-2 mb-md-0">Feedback Management</h2>
      </div>

      <div className="d-flex flex-column flex-md-row gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name/email"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="mb-2 mb-md-0"
        />
        <Form.Select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          style={{ minWidth: "200px" }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </Form.Select>
      </div>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : feedbacks.length === 0 ? (
        <Alert variant="info">No feedbacks found.</Alert>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="d-none d-md-table-cell">Email</th>
                  <th>Rating</th>
                  <th className="d-none d-lg-table-cell">Message</th>
                  <th>Status</th>
                  <th className="d-none d-lg-table-cell">Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>
                      {feedback.name}
                      <div className="d-md-none">
                        <small className="text-muted">{feedback.email}</small>
                      </div>
                    </td>
                    <td className="d-none d-md-table-cell">{feedback.email}</td>
                    <td>
                      <span className="text-warning">{getRatingStars(feedback.rating)}</span>
                      <small className="text-muted ms-1">({feedback.rating}/5)</small>
                    </td>
                    <td className="d-none d-lg-table-cell">
                      <div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {feedback.message}
                      </div>
                    </td>
                    <td>
                      {getStatusBadge(feedback.status)}
                      <div className="d-lg-none mt-1">
                        <small className="text-muted d-block">{new Date(feedback.created_at).toLocaleString()}</small>
                      </div>
                    </td>
                    <td className="d-none d-lg-table-cell">{new Date(feedback.created_at).toLocaleString()}</td>
                    <td>
                      <div className="d-flex flex-column flex-md-row gap-1">
                        {feedback.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => updateFeedbackStatus(feedback.id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => updateFeedbackStatus(feedback.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => deleteFeedback(feedback.id)}
                        >
                          Delete
                        </Button>
                      </div>
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
    </div>
  );
};

export default AdminFeedback;
