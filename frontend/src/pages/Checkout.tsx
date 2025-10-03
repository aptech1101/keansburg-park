/// <reference types="vite/client" />
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { unitPriceOf, computeDiscount } from "../lib/pricing";
import { useCart } from "../hooks/useCart";
import QRCode from "react-qr-code";

const CheckoutPage: FC = () => {
  const { token } = useAuth();
  const { cartItems, clearCart } = useCart();
  // QR Code component using react-qr-code library
  const QRCodeComponent: FC<{ value: string; size?: number }> = ({ 
  value, 
  size = 72 
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  
  const QRCodeElement = QRCode as any;
  return (
    <div ref={qrRef}>
      <QRCodeElement
        value={value}
        size={size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        bgColor="#ffffff"
        fgColor="#000000"
        level="M"
      />
    </div>
  );
};

//Helper function để convert QR to base64
const convertQRToBase64 = async (ticketCode: string, size: number = 100): Promise<string> => {
  try {
    // Sử dụng QR API để lấy base64
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(ticketCode)}&bgcolor=FFFFFF&color=000000&format=png`;
    
    const response = await fetch(qrApiUrl);
    if (response.ok) {
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } else {
      throw new Error('QR API failed');
    }
  } catch (error) {
    console.error('QR conversion error:', error);
    // Fallback: tạo placeholder image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    
    if (ctx) {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('QR', size/2, size/2);
    }
    return canvas.toDataURL();
  }
};
// Cart items are now managed by useCart hook

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

  const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value);

  // Check if all cart items have valid visitDates
  const allItemsHaveVisitDate = useMemo(() => {
    return cartItems.length > 0 && cartItems.every(item => item.visitDate && item.visitDate.trim() !== '');
  }, [cartItems]);

  //state agreePolicy
  const [agreePolicy, setAgreePolicy] = useState(false);

  const canConfirm =
    cartItems.length > 0 &&
    fullName.trim().length > 0 &&
    phone.trim().length > 0 &&
    isEmailValid(email.trim()) &&
    allItemsHaveVisitDate &&
    agreePolicy;

  type IssuedTicket = {
    code: string;
    zone?: string;
    name: string;
    visitDate?: string;
  };
  const [paid, setPaid] = useState<boolean>(false);
  const [orderCode, setOrderCode] = useState<string>("");
  const [issuedTickets, setIssuedTickets] = useState<IssuedTicket[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ticketsPerPage = 10;
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
  
    // Validate that all cart items have visitDates
    if (!allItemsHaveVisitDate) {
      alert('Please ensure all cart items have a visit date selected.');
      return;
    }
  
    const oc = buildOrderCode();
    const baseUrl = (import.meta as any).env?.VITE_API_BASE_URL || '/api';
    const url = `${baseUrl.replace(/\/$/, '')}/bookings/create.php`;
  
    const payload = {
      stage: "checkout",
      orderCode: oc,
      customer: {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
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
        const res = await fetch(`/api/bookings/create.php`, { method: 'POST', headers, body: JSON.stringify(payload) });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        if (!json || json.ok !== true || !json.booking) {
          console.error('Invalid response:', json);
          throw new Error('Invalid response');
        }
  
        const booking = json.booking as { booking_code?: string };
        const details = (json.details || []) as Array<{ ticket_code: string; using_date: string; zone_code?: string }>;
  
        setOrderCode(booking.booking_code || oc);
        
        // Tạo danh sách vé riêng lẻ từ ticket_code
        const allTickets: IssuedTicket[] = [];
        details.forEach((d) => {
          allTickets.push({
            code: d.ticket_code || `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            zone: (d.zone_code || '').toUpperCase() || undefined,
            name: fullName.trim(),
            visitDate: d.using_date,
          });
        });
        
        setIssuedTickets(allTickets);
        setPaid(true);
        clearCart(); // Clear cart using hook
      } catch (e) {
        alert('Payment failed. Please try again.');
      }
    })();
  };

  // Kiểm tra QR API
  const testQRLibrary = async () => {
    try {
      const testUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent('TEST-123')}&bgcolor=FFFFFF&color=000000`;
      const response = await fetch(testUrl, { method: 'HEAD' });
      console.log('QR API working:', response.ok);
      return response.ok;
    } catch (error) {
      console.error('QR API not working:', error);
      return false;
    }
  };

// Test khi component mount
useEffect(() => {
  testQRLibrary();
}, []);

  //handlePrint với QR code thực
  const handlePrint = async () => {
    if (!paid) return;
    
    console.log('Starting print process...');
    
    try {
      // Test thư viện trước
      const isWorking = await testQRLibrary();
      if (!isWorking) {
        console.warn('QR library not working, using fallback');
      }
      
      // Tạo QR codes cho tất cả tickets
      const ticketsWithQR = await Promise.all(
        currentTickets.map(async (t) => {
          try {
            const qrDataURL = await generateQRDataURL(t.code);
            return { ...t, qrDataURL };
          } catch (error) {
            console.error(`Failed to generate QR for ${t.code}:`, error);
            return { ...t, qrDataURL: createFallbackQR(t.code) };
          }
        })
      );
      
      console.log('Generated QR codes for', ticketsWithQR.length, 'tickets');
      
      // Tạo cửa sổ in
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to print tickets');
        return;
      }
      
      const ticketsHTML = ticketsWithQR.map((t, idx) => `
        <div class="ticket-card" style="border: 2px solid #000; padding: 15px; margin: 10px 0; page-break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
              <div style="font-weight: bold; font-size: 16px;">${t.code}</div>
              <div style="color: #666; font-size: 12px;">Zone: ${t.zone || "General"}</div>
              <div style="color: #666; font-size: 12px;">
                Visit: ${t.visitDate ? new Date(t.visitDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : "—"}
              </div>
              <div style="color: #666; font-size: 12px;">Customer: ${fullName}</div>
            </div>
            <div style="width: 100px; height: 100px;">
              <img src="${t.qrDataURL}" 
                   alt="QR Code for ${t.code}" 
                   style="width: 100%; height: 100%; object-fit: contain;" 
                   onerror="console.error('QR image failed to load for ${t.code}');" />
            </div>
          </div>
        </div>
      `).join('');
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Keansburg Park Tickets - Page ${currentPage}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .ticket-card { 
                border: 2px solid #000; 
                padding: 15px; 
                margin: 10px 0; 
                page-break-inside: avoid;
              }
              @media print {
                .ticket-card { margin: 5px 0; }
              }
            </style>
          </head>
          <body>
            <h1>Keansburg Park - Order ${orderCode}</h1>
            <p><strong>Customer:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Page:</strong> ${currentPage} of ${totalPages}</p>
            <hr>
            ${ticketsHTML}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Đợi images load rồi print
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 1500);
      
    } catch (error) {
      console.error('Print failed:', error);
      alert('Failed to generate tickets for printing. Please try again.');
    }
  };

//Helper function để generate QR DataURL
const generateQRDataURL = async (ticketCode: string): Promise<string> => {
  try {
    // Sử dụng QR API online thay vì thư viện
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(ticketCode)}&bgcolor=FFFFFF&color=000000`;
    
    // Test API có hoạt động không
    const response = await fetch(qrApiUrl, { method: 'HEAD' });
    if (response.ok) {
      return qrApiUrl;
    } else {
      throw new Error('QR API not available');
    }
  } catch (error) {
    console.error('QR generation error:', error);
    return createFallbackQR(ticketCode);
  }
};

//Fallback QR creator
const createFallbackQR = (ticketCode: string): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 100;
  canvas.height = 100;
  
  if (ctx) {
    // Tạo background trắng
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 100, 100);
    
    // Tạo border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 100, 100);
    
    // Text fallback
    ctx.fillStyle = '#000000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QR CODE', 50, 30);
    ctx.font = '8px Arial';
    ctx.fillText(ticketCode, 50, 70);
  }
  
  return canvas.toDataURL();
};

//handleDownloadPDF với QR code thực
  const handleDownloadPDF = async () => {
    if (!paid) return;
    // Use browser print dialog as a simple export option without extra deps
    await handlePrint();
  };

  
  // Phân trang logic
  const totalPages = Math.ceil(issuedTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const endIndex = startIndex + ticketsPerPage;
  const currentTickets = issuedTickets.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                {/* ✅ Thêm checkbox policy */}
  <div className="form-check mb-3">
    <input
      type="checkbox"
      className="form-check-input"
      id="bd-policy"
      checked={agreePolicy}
      onChange={(e) => setAgreePolicy(e.target.checked)}
      required
    />
    <label htmlFor="bd-policy" className="form-check-label">
  By checking this box, I confirm that I have read and agree to the{" "}
  <a href="/policy" target="_blank" rel="noopener noreferrer" className="fw-semibold text-decoration-underline">
    Booking Policy
  </a>{" "}
  and accept the terms of my purchase.
</label>
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
                ) : !allItemsHaveVisitDate ? (
                  <>
                    Please ensure all cart items have valid visit dates before confirming payment.
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
                    <strong>Visit Dates:</strong> {(() => {
                      const visitDates = [...new Set(cartItems.map(item => item.visitDate).filter(date => date))];
                      if (visitDates.length === 0) return "—";
                      if (visitDates.length === 1) {
                        return new Date(visitDates[0]).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        });
                      }
                      return `${visitDates.length} different dates`;
                    })()}
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
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="h5 mb-0">Tickets ({issuedTickets.length} total)</h3>
                    {totalPages > 1 && (
                      <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted">
                          Page {currentPage} of {totalPages}
                        </span>
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="row g-3">
                    {currentTickets.map((t, idx) => (
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
                                Visit: {t.visitDate ? new Date(t.visitDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                }) : "—"}
                              </div>
                            </div>
                            <QRCodeComponent value={t.code} size={72} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                      <nav aria-label="Tickets pagination">
                        <ul className="pagination pagination-sm">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(1)}
                              disabled={currentPage === 1}
                            >
                              First
                            </button>
                          </li>
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                          </li>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                            if (pageNum > totalPages) return null;
                            return (
                              <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(pageNum)}
                                >
                                  {pageNum}
                                </button>
                              </li>
                            );
                          })}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </li>
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(totalPages)}
                              disabled={currentPage === totalPages}
                            >
                              Last
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
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
