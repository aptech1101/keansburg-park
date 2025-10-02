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

interface User {
  id: number;
  username?: string;
  full_name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  is_active: number;
  created_at: string;
  updated_at: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const params: any = { page, limit };
      if (search) params.search = search;
      if (roleFilter) params.role = roleFilter;
      if (activeFilter) params.is_active = activeFilter;

      const res = await axios.get(`${apiConfig.baseURL}/admin/users.php`, {
        headers: getAuthHeaders(),
        params,
      });

      if (res.data.data) {
        setUsers(res.data.data);
        setTotal(res.data.total);
      } else {
        setError("Cannot fetch users");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetail = async (id: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiConfig.baseURL}/admin/users.php`, {
        headers: getAuthHeaders(),
        params: { id },
      });

      if (res.data.data) {
        setSelectedUser(res.data.data);
        setShowModal(true);
      } else {
        setError("Failed to load user detail");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading user detail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search, roleFilter, activeFilter]);

  const totalPages = Math.ceil(total / limit);

  const getStatusBadge = (is_active: number) => {
    return is_active
      ? <Badge bg="success">Active</Badge>
      : <Badge bg="secondary">Inactive</Badge>;
  };

  const getRoleBadge = (role: string) => {
    return role === "admin"
      ? <Badge bg="primary">Admin</Badge>
      : <Badge bg="info">User</Badge>;
  };

  return (
    <div className="container-fluid admin-users admin-table admin-form admin-pagination">
      <h2 className="mb-4">User Management</h2>

      <div className="d-flex flex-column flex-md-row gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name/email/username"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <Form.Select
          value={roleFilter}
          onChange={(e) => {
            setPage(1);
            setRoleFilter(e.target.value);
          }}
          style={{ minWidth: "150px" }}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Form.Select>
        <Form.Select
          value={activeFilter}
          onChange={(e) => {
            setPage(1);
            setActiveFilter(e.target.value);
          }}
          style={{ minWidth: "150px" }}
        >
          <option value="">All Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </Form.Select>
      </div>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : users.length === 0 ? (
        <Alert variant="info">No users found.</Alert>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => fetchUserDetail(user.id)}
                  >
                    <td>{user.id}</td>
                    <td>{user.username ?? "-"}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone ?? "-"}</td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>{getStatusBadge(user.is_active)}</td>
                    <td>{new Date(user.created_at).toLocaleString()}</td>
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
                    <Pagination.Item onClick={() => setPage(totalPages)}>
                      {totalPages}
                    </Pagination.Item>
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

      {/* Modal chi tiết user */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!selectedUser ? (
            <p>Loading...</p>
          ) : (
            <>
              <h5>{selectedUser.full_name}</h5>
              <p>
                Username: {selectedUser.username ?? "-"}
                <br />
                Email: {selectedUser.email}
                <br />
                Phone: {selectedUser.phone ?? "-"}
              </p>
              <p>
                Role: {getRoleBadge(selectedUser.role)} <br />
                Status: {getStatusBadge(selectedUser.is_active)}
              </p>
              <p>
                Created: {new Date(selectedUser.created_at).toLocaleString()} <br />
                Updated: {new Date(selectedUser.updated_at).toLocaleString()}
              </p>
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

export default AdminUsers;
