/// <reference types="vite/client" />
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import imgPayment from "../assets/img/payment.png";
import parkImg from "../assets/img/carousel-1.jpg";
import waterImg from "../assets/img/gallery-1.jpg";
import { unitPriceOf, isWeekend, computeDiscount, GROUP_DISCOUNT_THRESHOLD } from "../lib/pricing";

type CartItem = {
  id?: string;
  zoneCode: "PARK" | "WATER";
  visitDate: string;
  quantity: number;
  unitPrice?: number;
};
const CART_KEY = "cart";
const ZONES: Record<"PARK" | "WATER", { name: string; logo: string }> = {
  PARK: { name: "Zone 1", logo: parkImg },
  WATER: { name: "Zone 2", logo: waterImg },
};

// Pricing helpers
const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

const Cart: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY) || "[]";
      const parsed: CartItem[] = JSON.parse(raw);
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  }, []);

  // Cart totals
  const totalQty = items.reduce(
    (sum, it) => sum + Math.max(0, it.quantity || 0),
    0
  );
  const subtotal = items.reduce(
    (sum, it) =>
      sum + (it.visitDate ? unitPriceOf(it.visitDate) * (it.quantity || 0) : 0),
    0
  );
  const discount = computeDiscount(subtotal, totalQty);
  const grandTotal = subtotal - discount;

  const updateQty = (index: number, next: number) => {
    const clamped = Math.min(
      99,
      Math.max(
        1,
        Math.trunc(Number.isFinite(next as unknown as number) ? next : 1)
      )
    );
    const updated = items.map((x, i) =>
      i === index ? { ...x, quantity: clamped } : x
    );
    setItems(updated);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
    } catch {}
    showToast("Quantity updated", "success");
  };

  const updateDate = (index: number, date: string) => {
    const updated = items.map((x, i) =>
      i === index ? { ...x, visitDate: date } : x
    );
    setItems(updated);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
    } catch {}
  };

  const removeAt = (index: number) => {
    if (!window.confirm("Remove this item from cart?")) return;
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
    } catch {}
    showToast("Removed from cart", "success");
  };

  const clearCart = () => {
    if (!window.confirm("Clear all items in your cart?")) return;
    setItems([]);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify([]));
    } catch {}
  };

  const hasMissingDate = items.some((it) => !it.visitDate);
  const canProceed = items.length > 0 && !hasMissingDate;

  // Lightweight toast
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVariant, setToastVariant] = useState<"success" | "danger">(
    "success"
  );
  const showToast = (message: string, variant: "success" | "danger") => {
    setToastMessage(message);
    setToastVariant(variant);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1800);
  };

  return (
    <>
      {/* Spinner Start */}
      {isLoading && (
        <div
          id="spinner"
          className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {/* Spinner End */}

      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4
            className="text-white display-4 mb-4 wow fadeInDown"
            data-wow-delay="0.1s"
          >
            Cart
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <a href="#/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active text-primary">Cart</li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* Cart Page Start */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-white rounded p-4 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Your Cart</h2>
                <div>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => navigate("/ticket")}
                  >
                    Continue shopping
                  </button>
                  {items.length > 0 && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={clearCart}
                    >
                      Clear cart
                    </button>
                  )}
                </div>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-5">
                  <img
                    src={imgPayment}
                    alt="Empty cart"
                    className="img-fluid mb-4"
                    style={{ maxWidth: 260 }}
                  />
                  <h5 className="mb-2">Your cart is empty</h5>
                  <p className="text-muted mb-4">
                    Add tickets from the Ticket page to see them here.
                  </p>
                  <Link
                    to="/ticket"
                    className="btn btn-primary rounded-pill px-4"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <>
                  {/* Table-like header */}
                  <div className="row fw-semibold text-muted px-2 mb-2">
                    <div className="col-12 col-lg-5">Packages</div>
                    <div className="col-6 col-lg-2">Price</div>
                    <div className="col-6 col-lg-2">Quantity</div>
                    <div className="col-6 col-lg-2 mt-2 mt-lg-0">Subtotal</div>
                    <div className="col-6 col-lg-1 text-end mt-2 mt-lg-0">
                      Remove
                    </div>
                  </div>

                  <hr className="my-2" />

                  {items.map((it, idx) => (
                    <div key={(it.id || "") + idx} className="py-3">
                      <div className="row align-items-center g-3 px-2">
                        {/* Packages */}
                        <div className="col-12 col-lg-5 d-flex align-items-center">
                          <div
                            className="me-3"
                            style={{ width: 96, height: 56 }}
                          >
                            <img
                              src={ZONES[it.zoneCode].logo}
                              alt={`${ZONES[it.zoneCode].name} logo`}
                              className="img-fluid rounded h-100"
                              onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement;
                                img.style.display = "none";
                                const ph =
                                  img.nextElementSibling as HTMLElement | null;
                                if (ph) ph.classList.remove("d-none");
                              }}
                            />
                            <div className="placeholder bg-light d-none w-100 h-100 rounded d-flex align-items-center justify-content-center">
                              <span className="text-muted">Logo</span>
                            </div>
                          </div>
                          <div style={{ minWidth: 220 }}>
                            <div className="fw-semibold mb-1">
                              {ZONES[it.zoneCode].name}
                            </div>
                            <label className="form-label small mb-1">
                              Booking date
                            </label>
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              aria-label="Booking date"
                              value={it.visitDate || ""}
                              onChange={(e) => updateDate(idx, e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-6 col-lg-2">
                          {it.visitDate ? (
                            <>
                              <div>{money(unitPriceOf(it.visitDate))}</div>
                              <div className="small mt-1">
                                {isWeekend(it.visitDate) ? (
                                  <span className="badge bg-light text-dark">
                                    Weekend $12
                                  </span>
                                ) : (
                                  <span className="badge bg-light text-dark">
                                    Weekday $10
                                  </span>
                                )}
                              </div>
                            </>
                          ) : (
                            <span>—</span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="col-6 col-lg-2">
                          <div
                            className="input-group"
                            style={{ maxWidth: 160 }}
                          >
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQty(idx, (it.quantity || 1) - 1)
                              }
                              disabled={
                                (it.quantity || 1) <= 1 || !it.visitDate
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control text-center"
                              aria-label="Item quantity"
                              min={1}
                              max={99}
                              value={it.quantity || 1}
                              onChange={(e) => {
                                const n = parseInt(e.target.value, 10);
                                updateQty(idx, Number.isNaN(n) ? 1 : n);
                              }}
                              onBlur={(e) => {
                                const n = parseInt(e.target.value, 10);
                                updateQty(idx, Number.isNaN(n) ? 1 : n);
                              }}
                              disabled={!it.visitDate}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQty(idx, (it.quantity || 1) + 1)
                              }
                              disabled={!it.visitDate}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-6 col-lg-2">
                          {it.visitDate ? (
                            <span>
                              {money(
                                unitPriceOf(it.visitDate) * (it.quantity || 1)
                              )}
                            </span>
                          ) : (
                            <span>—</span>
                          )}
                        </div>

                        {/* Remove */}
                        <div className="col-6 col-lg-1 text-end">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            aria-label="Remove item"
                            onClick={() => removeAt(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <hr className="my-3" />
                    </div>
                  ))}

                  {/* Order Summary */}
                  <div className="row justify-content-end">
                    <div className="col-12 col-lg-5">
                      <div className="border rounded p-3">
                        <h5 className="mb-3">Order Summary</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Subtotal</span>
                          <strong>{money(subtotal)}</strong>
                        </div>
                          {discount > 0 ? (
                          <div className="d-flex justify-content-between mb-2">
                            <span>Group discount (10% for ≥10 tickets)</span>
                            <strong className="text-success">
                              - {money(discount)}
                            </strong>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between mb-2">
                            <span>
                              Group discount (10% for ≥10 tickets)
                              {totalQty < GROUP_DISCOUNT_THRESHOLD && (
                                <small className="text-muted ms-2">
                                  Add {Math.max(0, GROUP_DISCOUNT_THRESHOLD - totalQty)} more to get
                                  10% off
                                </small>
                              )}
                            </span>
                            <strong>—</strong>
                          </div>
                        )}
                        <div className="d-flex justify-content-between border-top pt-2">
                          <span>Total</span>
                          <strong>{money(grandTotal)}</strong>
                        </div>
                        <button
                          className="btn btn-primary rounded-pill mt-3 w-100"
                          disabled={!canProceed}
                          onClick={() => {
                            if (!canProceed) return;
                            try {
                              navigate("/checkout");
                            } catch {
                              console.log("Proceed to checkout");
                            }
                          }}
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lightweight toast (non-blocking) */}
                  <div
                    className="toast-container position-fixed bottom-0 end-0 p-3"
                    style={{ zIndex: 1080 }}
                  >
                    <div
                      className={`toast ${toastVisible ? "show" : "hide"}`}
                      role="status"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <div
                        className={`toast-header ${
                          toastVariant === "success"
                            ? "bg-success text-white"
                            : "bg-danger text-white"
                        }`}
                      >
                        <strong className="me-auto">
                          {toastVariant === "success" ? "Success" : "Notice"}
                        </strong>
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2 mb-1"
                          aria-label="Close"
                          onClick={() => setToastVisible(false)}
                        ></button>
                      </div>
                      <div className="toast-body">{toastMessage}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Cart Page End */}

      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-primary btn-lg-square rounded-circle back-to-top"
      >
        <i className="fa fa-arrow-up"></i>
      </a>
    </>
  );
};

export default Cart;
