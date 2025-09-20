import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner, Alert, Button, Card, Row, Col, Badge } from "react-bootstrap";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { apiConfig, getAuthHeaders } from "../../config/api";

interface DashboardStats {
  total_users: number;
  total_bookings: number;
  total_tickets_sold: number;
  total_revenue: number;
  total_feedbacks: number;
  pending_feedbacks: number;
  approved_feedbacks: number;
  rejected_feedbacks: number;
  recent_bookings: any[];
  revenue_by_month: any[];
  bookings_by_status: any[];
  feedbacks_by_status: any[];
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${apiConfig.baseURL}/api/admin/dashboard`, {
        headers: getAuthHeaders(),
      });

      if (res.data.status === "success") {
        setStats(res.data.data);
      } else {
        setError("Failed to load dashboard data");
      }
    } catch (err) {
      setError("Cannot load Dashboard data. Please try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={fetchStats}>Try Again</Button>
      </div>
    );
  }

  if (!stats) return null;

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="mb-2 mb-md-0">Admin Dashboard</h2>
        <Button variant="outline-primary" onClick={fetchStats} size="sm">
          <i className="fas fa-sync-alt me-1"></i>
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <Row className="mb-4">
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <i className="fas fa-users fa-2x text-primary me-2"></i>
                <div>
                  <h3 className="mb-0">{stats.total_users}</h3>
                  <small className="text-muted">Total Users</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Link to="/admin/orders" className="text-decoration-none">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <i className="fas fa-shopping-cart fa-2x text-success me-2"></i>
                  <div>
                    <h3 className="mb-0">{stats.total_bookings}</h3>
                    <small className="text-muted">Total Bookings</small>
                  </div>
                </div>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Link to="/admin/tickets" className="text-decoration-none">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <i className="fas fa-ticket-alt fa-2x text-warning me-2"></i>
                  <div>
                    <h3 className="mb-0">{stats.total_tickets_sold}</h3>
                    <small className="text-muted">Tickets Sold</small>
                  </div>
                </div>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <i className="fas fa-dollar-sign fa-2x text-success me-2"></i>
                <div>
                  <h3 className="mb-0">{formatCurrency(stats.total_revenue)}</h3>
                  <small className="text-muted">Total Revenue</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Feedback Status Cards */}
      <Row className="mb-4">
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Link to="/admin/feedback" className="text-decoration-none">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <i className="fas fa-comments fa-2x text-info me-2"></i>
                  <div>
                    <h3 className="mb-0">{stats.total_feedbacks}</h3>
                    <small className="text-muted">Total Feedbacks</small>
                  </div>
                </div>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <Badge bg="warning" className="me-2" style={{ fontSize: '1.2rem', padding: '0.5rem' }}>
                  {stats.pending_feedbacks}
                </Badge>
                <div>
                  <h5 className="mb-0">Pending</h5>
                  <small className="text-muted">Awaiting Review</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <Badge bg="success" className="me-2" style={{ fontSize: '1.2rem', padding: '0.5rem' }}>
                  {stats.approved_feedbacks}
                </Badge>
                <div>
                  <h5 className="mb-0">Approved</h5>
                  <small className="text-muted">Published</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <Badge bg="danger" className="me-2" style={{ fontSize: '1.2rem', padding: '0.5rem' }}>
                  {stats.rejected_feedbacks}
                </Badge>
                <div>
                  <h5 className="mb-0">Rejected</h5>
                  <small className="text-muted">Not Published</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row className="mb-4">
        {/* Revenue Chart */}
        <Col xs={12} lg={8} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Revenue Trend (Last 6 Months)</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={stats.revenue_by_month}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Bookings Status Pie Chart */}
        <Col xs={12} lg={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Bookings Status</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.bookings_by_status}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => `${props.name} ${props.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.bookings_by_status.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings */}
      <Row>
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Recent Bookings</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Booking Code</th>
                      <th className="d-none d-md-table-cell">Customer</th>
                      <th className="d-none d-lg-table-cell">Visit Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th className="d-none d-lg-table-cell">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent_bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <code>{booking.booking_code}</code>
                          <div className="d-md-none">
                            <small className="text-muted">
                              {booking.guest_name || booking.username || 'Guest'}
                            </small>
                          </div>
                        </td>
                        <td className="d-none d-md-table-cell">
                          {booking.guest_name || booking.username || 'Guest'}
                          <br />
                          <small className="text-muted">{booking.guest_email || booking.email}</small>
                        </td>
                        <td className="d-none d-lg-table-cell">{formatDate(booking.visit_date)}</td>
                        <td>
                          {formatCurrency(booking.grand_total)}
                          <div className="d-md-none">
                            <small className="text-muted d-block">{formatDate(booking.visit_date)}</small>
                            <small className="text-muted">{formatDate(booking.created_at)}</small>
                          </div>
                        </td>
                        <td>
                          <Badge 
                            bg={
                              booking.status === 'PAID' ? 'success' :
                              booking.status === 'PENDING' ? 'warning' :
                              booking.status === 'CANCELLED' ? 'danger' : 'secondary'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="d-none d-lg-table-cell">{formatDate(booking.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;