import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getOrders, getOrderDetails, OrdersListResponse, OrderDetailsResponse } from "../../services/api";

interface Order {
  id: number;
  order_date: string;
  total_amount: number;
  status: string;
  item_count: number;
  ticket_names: string;
}

interface Pagination {
  current_page: number;
  per_page: number;
  total_orders: number;
  total_pages: number;
}

interface OrdersData {
  status: string;
  orders: Order[];
  pagination: Pagination;
  filters: {
    start_date?: string;
    end_date?: string;
    status?: string;
  };
}

const Orders: React.FC = () => {
  const { token } = useAuth();
  const [ordersData, setOrdersData] = useState<OrdersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailsResponse | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Filters state
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    status: "",
    page: 1,
    limit: 5 // 5 orders per page
  });

  // Fetch orders function
  const fetchOrders = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      const response = await getOrders(token, filters);
      setOrdersData(response);
    } catch (err: any) {
      setError(err.message || "Failed to fetch orders");
      setOrdersData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when filters change
  useEffect(() => {
    fetchOrders();
  }, [token, filters.page, filters.status, filters.start_date, filters.end_date]);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  // Handle order details click
  const handleOrderClick = async (orderId: number) => {
    if (!token) return;
    
    try {
      const response = await getOrderDetails(token, orderId);
      setSelectedOrder(response);
      setShowDetails(true);
    } catch (err: any) {
      setError(err.message || "Failed to fetch order details");
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      start_date: "",
      end_date: "",
      status: "",
      page: 1,
      limit: 5
    });
  };

  // Go to specific page
  const goToPage = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  // Get current month range
  const setCurrentMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    setFilters(prev => ({
      ...prev,
      start_date: firstDay.toISOString().split('T')[0],
      end_date: lastDay.toISOString().split('T')[0],
      page: 1
    }));
  };

  // Get last month range
  const setLastMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
    
    setFilters(prev => ({
      ...prev,
      start_date: firstDay.toISOString().split('T')[0],
      end_date: lastDay.toISOString().split('T')[0],
      page: 1
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button className="btn btn-outline-danger" onClick={fetchOrders}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-shopping-bag me-2" style={{ color: '#3cbeee' }}></i>
          My Orders
        </h2>
        <div className="text-muted">
          {ordersData?.pagination ? (
            `Showing ${((ordersData.pagination.current_page - 1) * ordersData.pagination.per_page) + 1} to ${Math.min(ordersData.pagination.current_page * ordersData.pagination.per_page, ordersData.pagination.total_orders)} of ${ordersData.pagination.total_orders} orders`
          ) : (
            "No orders found"
          )}
        </div>
      </div>
      
      {/* Filters */}
      <div className="card mb-4 shadow-sm rounded-3" style={{ border: '1px solid #e9ecef' }}>
        <div className="card-body py-3">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold text-dark">Start Date</label>
              <input
                type="date"
                className="form-control rounded-pill"
                name="start_date"
                value={filters.start_date}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold text-dark">End Date</label>
              <input
                type="date"
                className="form-control rounded-pill"
                name="end_date"
                value={filters.end_date}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold text-dark">Status</label>
              <select
                className="form-select rounded-pill"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {!ordersData || !ordersData.orders || ordersData.orders.length === 0 ? (
        <div className="alert alert-info">
          <h4 className="alert-heading">
            <i className="fas fa-info-circle me-2"></i>
            No Orders Found
          </h4>
          <p>You don't have any orders yet. Start by booking some tickets!</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover rounded">
              <thead style={{ backgroundColor: '#3cbeee', color: 'white' }}>
                <tr>
                  <th className="border-0">Order ID</th>
                  <th className="border-0">Date</th>
                  <th className="border-0">Total</th>
                  <th className="border-0">Status</th>
                  <th className="border-0">Items</th>
                  <th className="border-0">Action</th>
                </tr>
              </thead>
                    <tbody>
                {ordersData.orders.map((order: Order) => (
                  <tr key={order.id} style={{ cursor: 'pointer' }}>
                    <td className="border-0">
                      <strong>#{order.id}</strong>
                    </td>
                    <td className="border-0">
                      {new Date(order.order_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="border-0">
                      <strong>${order.total_amount.toFixed(2)}</strong>
                    </td>
                    <td className="border-0">
                      <span className={`badge rounded-pill ${
                        order.status === 'PAID' ? 'bg-success' : 
                        order.status === 'PENDING' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="border-0">
                      <span className="badge bg-info rounded-pill">
                        {order.item_count || 0} items
                      </span>
                    </td>
                    <td className="border-0">
                      <button 
                        className="btn btn-sm text-white rounded-pill px-3"
                        style={{ 
                          backgroundColor: '#1570ef', 
                          border: '1px solid #1570ef'
                        }}
                        onClick={() => handleOrderClick(order.id)}
                      >
                        <i className="fas fa-eye me-1"></i>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {ordersData.pagination && ordersData.pagination.total_pages > 1 && (
            <nav aria-label="Orders pagination" className="mt-4">
              <ul className="pagination justify-content-center rounded">
                <li className={`page-item ${ordersData.pagination.current_page === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link rounded-pill" 
                    style={{ 
                      color: ordersData.pagination.current_page === 1 ? '#6c757d' : '#1570ef',
                      borderColor: '#1570ef',
                      margin: '0 2px'
                    }}
                    onClick={() => goToPage(ordersData.pagination.current_page - 1)}
                    disabled={ordersData.pagination.current_page === 1}
                  >
                    Previous
                  </button>
                </li>
                
                {Array.from({ length: ordersData.pagination.total_pages }, (_, i) => i + 1).map(page => (
                  <li key={page} className={`page-item ${page === ordersData.pagination.current_page ? 'active' : ''}`}>
                    <button 
                      className="page-link rounded-pill" 
                      style={{ 
                        backgroundColor: page === ordersData.pagination.current_page ? '#1570ef' : 'white',
                        color: page === ordersData.pagination.current_page ? 'white' : '#1570ef',
                        borderColor: '#1570ef',
                        margin: '0 2px',
                        minWidth: '40px'
                      }}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${ordersData.pagination.current_page === ordersData.pagination.total_pages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link rounded-pill" 
                    style={{ 
                      color: ordersData.pagination.current_page === ordersData.pagination.total_pages ? '#6c757d' : '#1570ef',
                      borderColor: '#1570ef',
                      margin: '0 2px'
                    }}
                    onClick={() => goToPage(ordersData.pagination.current_page + 1)}
                    disabled={ordersData.pagination.current_page === ordersData.pagination.total_pages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header text-white" style={{ backgroundColor: '#3cbeee' }}>
                <h5 className="modal-title">
                  <i className="fas fa-receipt me-2"></i>
                  Order Details #{selectedOrder.order.id}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowDetails(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6>Order Information</h6>
                    <p><strong>Date:</strong> {new Date(selectedOrder.order.order_date).toLocaleString()}</p>
                    <p><strong>Status:</strong> 
                      <span className={`badge ms-2 ${
                        selectedOrder.order.status === 'PAID' ? 'bg-success' : 
                        selectedOrder.order.status === 'PENDING' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {selectedOrder.order.status}
                      </span>
                    </p>
                    <p><strong>Total Amount:</strong> ${selectedOrder.order.total_amount.toFixed(2)}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <p><strong>Name:</strong> {selectedOrder.order.customer.full_name}</p>
                    <p><strong>Email:</strong> {selectedOrder.order.customer.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.order.customer.phone}</p>
                  </div>
                </div>

                <h6>Order Items</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Ticket</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedOrder.order.items || []).map((item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <div>
                              <strong>{item.ticket_name}</strong>
                            </div>
                          </td>
                          <td>{item.quantity}</td>
                          <td>${item.unit_price.toFixed(2)}</td>
                          <td>${item.line_total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedOrder.order.payments && selectedOrder.order.payments.length > 0 && (
                  <>
                    <h6>Payments</h6>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Amount</th>
                            <th>Provider</th>
                            <th>Paid At</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.order.payments.map((payment: any, index: number) => (
                            <tr key={index}>
                              <td>${payment.amount.toFixed(2)}</td>
                              <td>{payment.provider || 'N/A'}</td>
                              <td>{payment.paid_at ? new Date(payment.paid_at).toLocaleString() : 'N/A'}</td>
                              <td>
                                <span className={`badge ${
                                  payment.status === 'SUCCESS' ? 'bg-success' : 
                                  payment.status === 'INIT' ? 'bg-warning' : 'bg-danger'
                                }`}>
                                  {payment.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn text-white"
                  style={{ backgroundColor: '#1570ef' }}
                  onClick={() => setShowDetails(false)}
                >
                  <i className="fas fa-times me-2"></i>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;