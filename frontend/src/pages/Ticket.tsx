/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imgPayment from "../assets/img/payment.png";

export default function Ticket() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<'PARK' | 'WATER'>('PARK');

  const scrollToWidget = () => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  type CartItem = {
    zoneCode: 'PARK' | 'WATER';
    visitDate: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    discountTotal: number;
    lineTotal: number;
  };

  function BookingWidget({ zone, onZoneChange }: { zone: 'PARK' | 'WATER'; onZoneChange: (z: 'PARK' | 'WATER') => void }) {
    const [visitDate, setVisitDate] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    // Pricing helpers (local)
    const BASE_PRICE = 10;
    const WEEKEND_SURCHARGE = 0.2;
    const money = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
    const isWeekend = (iso: string) => !!iso && [0, 6].includes(new Date(iso).getDay());
    const computePrice = (date: string, qty: number) => {
      const unit = BASE_PRICE * (isWeekend(date) ? (1 + WEEKEND_SURCHARGE) : 1);
      const subtotal = unit * qty;
      const discountTotal = qty >= 10 ? subtotal * 0.10 : 0;
      const lineTotal = subtotal - discountTotal;
      return { unitPrice: unit, subtotal, discountTotal, lineTotal };
    };

    const decrement = () => setQuantity((q) => Math.max(1, q - 1));
    const increment = () => setQuantity((q) => q + 1);
    const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = parseInt(e.target.value, 10);
      setQuantity(Number.isNaN(next) ? 1 : Math.max(1, next));
    };

    const pricing = visitDate ? computePrice(visitDate, quantity) : null;

    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [toastVisible, setToastVisible] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');

    const showToast = (message: string, variant: 'success' | 'danger') => {
      setToastMessage(message);
      setToastVariant(variant);
      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 2200);
    };

    const handleAddToCart = () => {
      if (!visitDate || quantity < 1 || !pricing) {
        showToast('Please select a date and valid quantity.', 'danger');
        return;
      }
      setIsAdding(true);
      try {
        const item: CartItem = {
          zoneCode: zone,
          visitDate,
          quantity,
          unitPrice: pricing.unitPrice,
          subtotal: pricing.subtotal,
          discountTotal: pricing.discountTotal,
          lineTotal: pricing.lineTotal,
        };
        const raw = localStorage.getItem('cart') || '[]';
        const arr: CartItem[] = JSON.parse(raw);
        arr.push(item);
        localStorage.setItem('cart', JSON.stringify(arr));
        showToast('Added to cart', 'success');
      } catch (e) {
        showToast('Failed to add to cart', 'danger');
      } finally {
        setIsAdding(false);
      }
    };

    return (
      <div className="card border-0 shadow-sm p-4 position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="btn-group" role="group" aria-label="Select zone">
            <button
              type="button"
              className={`btn ${zone === 'PARK' ? 'btn-primary' : 'btn-outline-primary'}`}
              aria-pressed={zone === 'PARK'}
              onClick={() => onZoneChange('PARK')}
            >
              Amusement Park
            </button>
            <button
              type="button"
              className={`btn ${zone === 'WATER' ? 'btn-primary' : 'btn-outline-primary'}`}
              aria-pressed={zone === 'WATER'}
              onClick={() => onZoneChange('WATER')}
            >
              Water Park
            </button>
          </div>
          <span className="badge bg-light text-dark">Zone: {zone === 'PARK' ? 'Amusement' : 'Water'}</span>
        </div>

        <div className="row g-3 align-items-end mb-4">
          <div className="col-md-6">
            <label className="form-label">Visit date</label>
            <input
              type="date"
              className="form-control"
              aria-label="Visit date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
            />
            {!visitDate && (
              <div className="form-text text-danger">Please select a date</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantity</label>
            <div className="input-group">
              <button type="button" className="btn btn-outline-secondary" aria-label="Decrease quantity" onClick={decrement} disabled={quantity === 1}>-</button>
              <input
                type="number"
                className="form-control text-center"
                aria-label="Ticket quantity"
                min={1}
                step={1}
                inputMode="numeric"
                value={quantity}
                onChange={handleQuantityInput}
                onBlur={(e) => {
                  const next = parseInt(e.target.value, 10);
                  setQuantity(Number.isNaN(next) ? 1 : Math.max(1, next));
                }}
              />
              <button type="button" className="btn btn-outline-secondary" aria-label="Increase quantity" onClick={increment}>+</button>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-6">
            <div className="border rounded p-3 h-100">
              <h6 className="mb-3">Pricing</h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Unit Price</span>
                {pricing ? (
                  <strong>{money(pricing.unitPrice)}</strong>
                ) : (
                  <strong className="text-muted">—</strong>
                )}
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                {pricing ? (
                  <strong>{money(pricing.subtotal)}</strong>
                ) : (
                  <strong className="text-muted">—</strong>
                )}
              </div>
              {pricing && quantity >= 10 ? (
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Discount <span className="badge bg-light text-dark ms-1">10% for ≥10 persons</span>
                  </span>
                  <strong className="text-danger">- {money(pricing.discountTotal)}</strong>
                </div>
              ) : (
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  <strong className="text-muted">—</strong>
                </div>
              )}
              <div className="d-flex justify-content-between border-top pt-2">
                <span>Line Total</span>
                {pricing ? (
                  <strong>{money(pricing.lineTotal)}</strong>
                ) : (
                  <strong className="text-muted">—</strong>
                )}
              </div>
              <div className="mt-2 text-muted small">Group discount: 10% for ≥10 persons</div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-end">
            <button type="button" className="btn btn-secondary w-100 py-3" aria-label="Add selected tickets to cart" disabled={!pricing || isAdding} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Toast container (Bootstrap styles) */}
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
          <div className={`toast ${toastVisible ? 'show' : 'hide'}`} role="status" aria-live="polite" aria-atomic="true">
            <div className={`toast-header ${toastVariant === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
              <strong className="me-auto">{toastVariant === 'success' ? 'Success' : 'Error'}</strong>
              <small>now</small>
              <button type="button" className="btn-close btn-close-white ms-2 mb-1" aria-label="Close" onClick={() => setToastVisible(false)}></button>
            </div>
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Spinner Start */}
      {isLoading && (
        <div id="spinner" className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {/* Spinner End */}

      {/* Navbar removed: using global layout Navbar */}

      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Ticket Packages</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-primary">Ticket</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* Ticket Packages Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row g-4">
            {/* Card 1: General */}
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
              <div className="packages-item h-100 p-4">
                <h4 className="text-primary mb-3">General Ticket Info</h4>
                <p className="mb-3">Giá áp dụng chung cho cả 2 khu (Amusement & Water Park).</p>
                <div className="d-flex align-items-center justify-content-between border rounded p-3 mb-3">
                  <div className="me-3">
                    <div className="fw-semibold">Weekday</div>
                    <small className="text-muted">Thứ 2–Thứ 6</small>
                  </div>
                  <div className="text-primary fs-4 fw-bold">$10</div>
                </div>
                <div className="d-flex align-items-center justify-content-between border rounded p-3 mb-4">
                  <div className="me-3">
                    <div className="fw-semibold">Weekend</div>
                    <small className="text-muted">Thứ 7–CN (+20%)</small>
                  </div>
                  <div className="text-primary fs-4 fw-bold">$12</div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill py-3 px-5"
                  onClick={() => {
                    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Book now
                </button>
              </div>
            </div>

            {/* Card 2: Zone 1 – Amusement Park */}
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="pricing-item rounded text-center p-4 h-100">
                <div className="mb-3">
                  <img src="/src/assets/img/carousel-1.jpg" alt="Amusement Park" className="img-fluid rounded" />
                </div>
                <h4 className="mb-2">Zone 1 – Amusement Park</h4>
                <p className="mb-4">Khu vui chơi cảm giác mạnh, trò chơi gia đình và không gian lễ hội sôi động.</p>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill py-3 px-5"
                  onClick={() => {
                    setSelectedZone('PARK');
                    scrollToWidget();
                  }}
                >
                  Book now
                </button>
              </div>
            </div>

            {/* Card 3: Zone 2 – Water Park */}
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
              <div className="pricing-item rounded text-center p-4 h-100">
                <div className="mb-3">
                  <img src="/src/assets/img/gallery-1.jpg" alt="Water Park" className="img-fluid rounded" />
                </div>
                <h4 className="mb-2">Zone 2 – Water Park</h4>
                <p className="mb-4">Công viên nước với đường trượt, hồ tạo sóng và khu vực thư giãn mát mẻ.</p>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill py-3 px-5"
                  onClick={() => {
                    setSelectedZone('WATER');
                    scrollToWidget();
                  }}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>

          {/* Anchor + Widget */}
          <div className="mt-4">
            <div id="booking-widget" className="mb-4" />
            <BookingWidget zone={selectedZone} onZoneChange={setSelectedZone} />
          </div>
        </div>
      </div>
      {/* Ticket Packages End */}

      {/* Footer removed: using global layout Footer */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
    </>
  );
}
