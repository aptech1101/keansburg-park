import React from 'react';
import { Link } from 'react-router-dom';

interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    features?: string[];
    details?: string;
    category?: string;
  }>;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ItemDetailsModal({
  isOpen,
  onClose,
  items,
  currentIndex,
  onPrevious,
  onNext
}: ItemDetailsModalProps) {
  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && hasPrevious) {
      onPrevious();
    } else if (e.key === 'ArrowRight' && hasNext) {
      onNext();
    }
  };

  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1055 }}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content" style={{ 
          borderRadius: '20px', 
          border: 'none',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div className="modal-header border-0 position-relative" style={{ 
            background: 'linear-gradient(135deg, #3CBEEE 0%, #007bff 100%)',
            padding: '1.5rem 2rem'
          }}>
            <h4 className="modal-title text-white fw-bold mb-0" style={{ fontSize: '1.5rem' }}>
              {currentItem.title}
            </h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              style={{ 
                fontSize: '1.2rem',
                filter: 'brightness(0) invert(1)'
              }}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-0">
            <div className="row g-0">
              {/* Image Section */}
              <div className="col-lg-6">
                <div style={{ 
                  height: '500px', 
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-100 h-100"
                    style={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  
                  {/* Navigation Arrows - Left */}
                  <button
                    className={`btn btn-light rounded-circle p-3 ${!hasPrevious ? 'disabled' : ''}`}
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '10px',
                      transform: 'translateY(-50%)',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      border: 'none'
                    }}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  {/* Navigation Arrows - Right */}
                  <button
                    className={`btn btn-light rounded-circle p-3 ${!hasNext ? 'disabled' : ''}`}
                    onClick={onNext}
                    disabled={!hasNext}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      border: 'none'
                    }}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  
                  {/* Item Counter */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px'
                  }}>
                    <span className="badge bg-primary text-white px-3 py-2" style={{ fontSize: '0.9rem' }}>
                      {currentIndex + 1} / {items.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="col-lg-6 d-flex flex-column">
                <div className="p-4 h-100 d-flex flex-column">
                  {/* Category */}
                  {currentItem.category && (
                    <div className="mb-3">
                      <span className="badge bg-primary bg-opacity-10 text-white px-3 py-2" style={{ fontSize: '0.9rem' }}>
                        {currentItem.category}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-4 flex-grow-1">
                    <p className="fs-5 mb-3" style={{ color: '#021016', lineHeight: '1.6' }}>
                      {currentItem.description}
                    </p>
                    
                    {currentItem.details && (
                      <p className="mb-3" style={{ color: '#666', lineHeight: '1.6' }}>
                        {currentItem.details}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  {currentItem.features && currentItem.features.length > 0 && (
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>
                        <i className="fas fa-star me-2"></i>
                        Key Features
                      </h6>
                      <ul className="list-unstyled">
                        {currentItem.features.map((feature, index) => (
                          <li key={index} className="mb-2 d-flex align-items-center">
                            <i className="fas fa-check-circle text-success me-3" style={{ fontSize: '0.9rem' }}></i>
                            <span style={{ color: '#021016' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto">
                    <Link
                      to="/ticket"
                      className="btn btn-primary btn-lg px-4 py-3 rounded-pill fw-bold w-100 text-decoration-none"
                      style={{
                        background: 'linear-gradient(45deg, #3CBEEE, #007bff)',
                        border: 'none',
                        boxShadow: '0 8px 25px rgba(60, 190, 238, 0.3)',
                        transition: 'all 0.3s ease',
                        display: 'block',
                        textAlign: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(60, 190, 238, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(60, 190, 238, 0.3)';
                      }}
                    >
                      🎫 Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
