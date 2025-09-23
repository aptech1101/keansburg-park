/// <reference types="vite/client" />
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { unitPriceOf, computeDiscount } from "../lib/pricing";

const CheckoutPage: FC = () => {
  const { token } = useAuth();
  // Lightweight QR placeholder to avoid extra dependency
  const QRCode: FC<{ value: string; size?: number }> = ({ value }) => (
    <div
      aria-label="QR code placeholder"
      className="border rounded d-flex align-items-center justify-content-center"
      style={{ width: 72, height: 72, fontSize: 10 }}
      title={value}
    >
      QR
    </div>
  );

  type CartItem = {
    id?: string;
    zoneCode: "PARK" | "WATER";
    visitDate: string;
    quantity: number;
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart") || "[]";
      const parsed = JSON.parse(raw);
      const arr: CartItem[] = Array.isArray(parsed)
        ? parsed.map((it: any) => ({
            id: it.id,
            zoneCode: (it.zoneCode || it.zone || "PARK").toUpperCase(),
            visitDate: it.visitDate || "",
            quantity: Math.max(1, Number(it.quantity) || 1),
          }))
        : [];
      setCartItems(arr);
    } catch {
      setCartItems([]);
    }
  }, []);

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, it) => sum + Math.max(0, it.quantity || 0), 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, it) => sum + unitPriceOf(it.visitDate) * Math.max(0, it.quantity || 0),
        0
      ),
    [cartItems]
  );

  const discount = useMemo(
    () => computeDiscount(subtotal, totalQuantity),
    [subtotal, totalQuantity]
  );

  const total = useMemo(() => subtotal - discount, [subtotal, discount]);

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);

  // Booking details form state
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [visitDate, setVisitDate] = useState<string>("");

  const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value);

  const canConfirm =
    cartItems.length > 0 &&
    fullName.trim().length > 0 &&
    phone.trim().length > 0 &&
    visitDate.trim().length > 0 &&
    isEmailValid(email.trim());

  type IssuedTicket = {
    code: string;
    zone?: string;
    name: string;
    visitDate: string;
  };
  const [paid, setPaid] = useState<boolean>(false);
  const [orderCode, setOrderCode] = useState<string>("");
  const [issuedTickets, setIssuedTickets] = useState<IssuedTicket[]>([]);
  const ticketsRef = useRef<HTMLDivElement | null>(null);

  const formatDateParts = (d: Date) => {
    const pad = (n: number, w = 2) => n.toString().padStart(w, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const HH = pad(d.getHours());
    const MM = pad(d.getMinutes());
    const SS = pad(d.getSeconds());
    return { yyyy, mm, dd, HH, MM, SS };
  };

  const buildOrderCode = () => {
    const now = new Date();
    const { yyyy, mm, dd, HH, MM, SS } = formatDateParts(now);
    const rand = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");
    return `ORD-${yyyy}${mm}${dd}-${HH}${MM}${SS}-${rand}`;
  };

  const toYyMmDd = (dateIso?: string) => {
    const d = dateIso ? new Date(dateIso) : new Date();
    if (Number.isNaN(d.getTime())) {
      return toYyMmDd(undefined);
    }
    const yy = (d.getFullYear() % 100).toString().padStart(2, "0");
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    const dd = d.getDate().toString().padStart(2, "0");
    return `${yy}${mm}${dd}`;
  };

  const onConfirm = () => {
    if (!canConfirm) return;

    const oc = buildOrderCode();
    const baseUrl = (import.meta as any).env?.VITE_API_BASE_URL || '/api';
    const url = `${baseUrl.replace(/\/$/, '')}/bookings/create.php`;

    const payload = {
      orderCode: oc,
      customer: {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        visitDate: visitDate.trim(),
      },
      cart: cartItems.map((c) => ({
        zoneCode: c.zoneCode,
        visitDate: c.visitDate,
        quantity: c.quantity,
      })),
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    try {
      const idk = (window.crypto && 'randomUUID' in window.crypto)
        ? (window.crypto as any).randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      headers['Idempotency-Key'] = idk;
    } catch {}

    (async () => {
      try {
        const res = await fetch(`/api/bookings/create`, { method: 'POST', headers, body: JSON.stringify(payload) });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        if (!json || json.ok !== true || !json.booking) {
          throw new Error('Invalid response');
        }

        const booking = json.booking as { booking_code?: string };
        const details = (json.details || []) as Array<{ ticket_code: string; using_date: string; zone_code?: string }>;

        setOrderCode(booking.booking_code || oc);
        setIssuedTickets(
          details.map((d) => ({
            code: d.ticket_code,
            zone: (d.zone_code || '').toUpperCase() || undefined,
            name: fullName.trim(),
            visitDate: d.using_date,
          }))
        );
        setPaid(true);
        try { localStorage.removeItem('cart'); } catch {}
      } catch (e) {
        alert('Payment failed. Please try again.');
      }
    })();
  };

  const handleDownloadPDF = async () => {
    if (!paid) return;
    // Use browser print dialog as a simple export option without extra deps
    window.print();
  };

  const handlePrint = () => {
    if (!paid) return;
    window.print();
  };

  return (
    <main id="checkout-page" aria-labelledby="checkout-title">
      <div className="container py-4">
        <div className="row justify-content-center g-4">
          {/* Left column: Booking Details */}
          <div className="col-12 col-lg-7">
            <section
              aria-labelledby="booking-details-title"
              className="bg-white rounded p-4 shadow-sm h-100"
            >
              <h2 id="booking-details-title" className="h4 mb-3">
                Booking Details
              </h2>
              <form aria-describedby="booking-details-help" noValidate>
                <p id="booking-details-help" className="text-muted small mb-4">
                  Please provide the details for the ticket holder. Fields
                  marked with * are required.
                </p>
                <div className="mb-3">
                  <label htmlFor="bd-name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="bd-name"
                    name="name"
                    className="form-control"
                    placeholder="John Doe"
                    aria-required="true"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bd-email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="bd-email"
                    name="email"
                    className="form-control"
                    placeholder="john.doe@example.com"
                    inputMode="email"
                    aria-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {email.length > 0 && !isEmailValid(email) && (
                    <div className="form-text text-danger">
                      Please enter a valid email address.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="bd-phone" className="form-label">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="bd-phone"
                    name="phone"
                    className="form-control"
                    placeholder="(555) 000-0000"
                    inputMode="tel"
                    aria-required="true"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bd-date" className="form-label">
                    Visit Date *
                  </label>
                  <input
                    type="date"
                    id="bd-date"
                    name="visitDate"
                    className="form-control"
                    aria-required="true"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    required
                  />
                </div>

                {/* Placeholder for future validation messages */}
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="small text-danger"
                />
              </form>
            </section>
          </div>

          {/* Right column: Payment Summary */}
          <div className="col-12 col-lg-5">
            <section
              aria-labelledby="payment-summary-title"
              className="bg-white rounded p-4 shadow-sm"
            >
              <h2 id="payment-summary-title" className="h4 mb-3">
                Payment Summary
              </h2>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <strong>{formatMoney(subtotal)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  <strong>
                    {discount > 0 ? (
                      <span className="text-success">
                        - {formatMoney(discount)}
                      </span>
                    ) : (
                      "—"
                    )}
                  </strong>
                </div>
                <div className="d-flex justify-content-between border-top pt-2">
                  <span>Total</span>
                  <strong>{formatMoney(total)}</strong>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary w-100 rounded-pill"
                aria-disabled={!canConfirm}
                disabled={!canConfirm}
                onClick={onConfirm}
              >
                Confirm Payment
              </button>

              <p className="text-muted small mt-3 mb-0">
                {cartItems.length === 0 ? (
                  <>
                    Your cart is empty. Please add tickets before confirming
                    payment.
                  </>
                ) : (
                  <>
                    You can confirm payment once booking details are complete.
                  </>
                )}
              </p>
            </section>

            {paid && (
              <section
                className="bg-white rounded p-4 shadow-sm mt-4"
                aria-live="polite"
              >
                <h2 className="h4 mb-3 text-success">Payment Successful</h2>
                <div className="mb-3">
                  <h3 className="h5 mb-2">Order Summary</h3>
                  <div className="mb-1">
                    <strong>Order Code:</strong> {orderCode}
                  </div>
                  <div className="mb-1">
                    <strong>Name:</strong> {fullName}
                  </div>
                  <div className="mb-1">
                    <strong>Email:</strong> {email}
                  </div>
                  <div className="mb-1">
                    <strong>Phone:</strong> {phone}
                  </div>
                  <div className="mb-1">
                    <strong>Visit Date:</strong> {visitDate || "—"}
                  </div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal</span>
                      <strong>{formatMoney(subtotal)}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Discount</span>
                      <strong>
                        {discount > 0 ? (
                          <span className="text-success">
                            - {formatMoney(discount)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between border-top pt-2">
                      <span>Total</span>
                      <strong>{formatMoney(total)}</strong>
                    </div>
                  </div>
                </div>

                <div ref={ticketsRef}>
                  <h3 className="h5 mb-3">Tickets</h3>
                  <div className="row g-3">
                    {issuedTickets.map((t, idx) => (
                      <div className="col-12 col-md-6" key={t.code + "-" + idx}>
                        <div
                          className="border rounded p-3 h-100 ticket-card"
                          style={{ background: "#fff" }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <div className="fw-semibold">{t.code}</div>
                              <div className="text-muted small">
                                Zone: {t.zone || "General"}
                              </div>
                              <div className="text-muted small">
                                Visit: {t.visitDate}
                              </div>
                            </div>
                            <QRCode value={t.code} size={72} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handlePrint}
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleDownloadPDF}
                  >
                    Download All Tickets (PDF)
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
