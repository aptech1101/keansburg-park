import React, { useEffect, useState } from "react";
import { Feedback, AdminFeedbackUpdate } from "../types/feedback";

interface AdminFeedbackManagerProps {
  apiUrl?: string;
}

export default function AdminFeedbackManager({ apiUrl }: AdminFeedbackManagerProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const baseUrl = apiUrl || '/api';
      const response = await fetch(`${baseUrl}/admin/feedbacks`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      if (data.status === 'success') {
        setFeedbacks(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch feedbacks');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const updateFeedbackStatus = async (id: number, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const baseUrl = apiUrl || '/api';
      const response = await fetch(`${baseUrl}/admin/feedbacks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 'success') {
        // Update local state
        setFeedbacks(prev => 
          prev.map(feedback => 
            feedback.id === id ? { ...feedback, status } : feedback
          )
        );
      } else {
        throw new Error(data.message || 'Failed to update feedback');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update feedback');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter(feedback => 
    filter === 'all' || feedback.status === filter
  );

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-warning text-dark',
      approved: 'bg-success text-white',
      rejected: 'bg-danger text-white'
    };
    
    return (
      <span className={`badge ${statusClasses[status as keyof typeof statusClasses] || 'bg-secondary'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i 
        key={i} 
        className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Feedback Management</h2>
            <button 
              className="btn btn-outline-primary"
              onClick={fetchFeedbacks}
            >
              <i className="fas fa-sync-alt me-2"></i>
              Refresh
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {/* Filter buttons */}
          <div className="btn-group mb-4" role="group">
            <button
              type="button"
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All ({feedbacks.length})
            </button>
            <button
              type="button"
              className={`btn ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({feedbacks.filter(f => f.status === 'pending').length})
            </button>
            <button
              type="button"
              className={`btn ${filter === 'approved' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setFilter('approved')}
            >
              Approved ({feedbacks.filter(f => f.status === 'approved').length})
            </button>
            <button
              type="button"
              className={`btn ${filter === 'rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => setFilter('rejected')}
            >
              Rejected ({feedbacks.filter(f => f.status === 'rejected').length})
            </button>
          </div>

          {/* Feedback list */}
          <div className="row">
            {filteredFeedbacks.length === 0 ? (
              <div className="col-12">
                <div className="text-center p-5">
                  <i className="fas fa-comments fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">No feedbacks found</h5>
                  <p className="text-muted">
                    {filter === 'all' ? 'No feedbacks have been submitted yet.' : `No ${filter} feedbacks found.`}
                  </p>
                </div>
              </div>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">{feedback.name}</h6>
                      {getStatusBadge(feedback.status)}
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <small className="text-muted">{feedback.email}</small>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <span className="me-2">Rating:</span>
                          {getRatingStars(feedback.rating)}
                        </div>
                      </div>
                      <p className="card-text">{feedback.message}</p>
                      <small className="text-muted">
                        <i className="fas fa-clock me-1"></i>
                        {new Date(feedback.created_at).toLocaleString()}
                      </small>
                    </div>
                    <div className="card-footer">
                      <div className="btn-group w-100" role="group">
                        <button
                          type="button"
                          className={`btn btn-sm ${feedback.status === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                          onClick={() => updateFeedbackStatus(feedback.id, 'pending')}
                          disabled={feedback.status === 'pending'}
                        >
                          <i className="fas fa-clock me-1"></i>
                          Pending
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm ${feedback.status === 'approved' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => updateFeedbackStatus(feedback.id, 'approved')}
                          disabled={feedback.status === 'approved'}
                        >
                          <i className="fas fa-check me-1"></i>
                          Approve
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm ${feedback.status === 'rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
                          onClick={() => updateFeedbackStatus(feedback.id, 'rejected')}
                          disabled={feedback.status === 'rejected'}
                        >
                          <i className="fas fa-times me-1"></i>
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
