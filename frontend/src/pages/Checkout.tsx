import { FC, useEffect, useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CheckoutPage: FC = () => {
  type CartItem = {
    id?: string;
    name?: string;
    zone?: string;
    visitDate?: string;
    unitPrice?: number;
    quantity?: number;
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart") || "[]";
      const parsed = JSON.parse(raw);
      setCartItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCartItems([]);
    }
  }, []);

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, it) => sum + Math.max(0, it.quantity || 0), 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + (Math.max(0, it.unitPrice || 0) * Math.max(0, it.quantity || 0)), 0),
    [cartItems]
  );

  const discount = useMemo(
    () => (totalQuantity > 10 ? subtotal * 0.10 : 0),
    [subtotal, totalQuantity]
  );

  const total = useMemo(() => subtotal - discount, [subtotal, discount]);

  const formatMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  // Booking details form state
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [visitDate, setVisitDate] = useState<string>("");

  const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value);

  const canConfirm = cartItems.length > 0
    && fullName.trim().length > 0
    && phone.trim().length > 0
    && visitDate.trim().length > 0
    && isEmailValid(email.trim());

  type IssuedTicket = { code: string; zone?: string; name: string; visitDate: string };
  const [paid, setPaid] = useState<boolean>(false);
  const [orderCode, setOrderCode] = useState<string>("");
  const [issuedTickets, setIssuedTickets] = useState<IssuedTicket[]>([]);
  const ticketsRef = useRef<HTMLDivElement | null>(null);

  const formatDateParts = (d: Date) => {
    const pad = (n: number, w = 2) => n.toString().padStart(w, '0');
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
    const rand = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `ORD-${yyyy}${mm}${dd}-${HH}${MM}${SS}-${rand}`;
  };

  const toYyMmDd = (dateIso?: string) => {
    const d = dateIso ? new Date(dateIso) : new Date();
    if (Number.isNaN(d.getTime())) {
      return toYyMmDd(undefined);
    }
    const yy = (d.getFullYear() % 100).toString().padStart(2, '0');
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    return `${yy}${mm}${dd}`;
  };

  const onConfirm = () => {
    if (!canConfirm) return;

    // Build order code
    const oc = buildOrderCode();

    // Build tickets with sequence per zone
    let parkSeq = 1000;
    let waterSeq = 2000;
    let otherSeq = 1000;
    const tickets: IssuedTicket[] = [];

    cartItems.forEach((item) => {
      const quantity = Math.max(0, item.quantity || 0);
      if (quantity <= 0) return;
      const zone = String(item.zone || '').toUpperCase();
      const baseDate = item.visitDate || visitDate || '';
      const yymmdd = toYyMmDd(baseDate);

      for (let i = 0; i < quantity; i += 1) {
        let seq: number;
        if (zone === 'PARK') {
          seq = parkSeq++;
        } else if (zone === 'WATER') {
          seq = waterSeq++;
        } else {
          seq = otherSeq++;
        }
        const code = `${yymmdd}-${seq}`;
        tickets.push({
          code,
          zone: zone || undefined,
          name: fullName.trim(),
          visitDate: baseDate || new Date().toISOString().slice(0, 10),
        });
      }
    });

    setOrderCode(oc);
    setIssuedTickets(tickets);
    setPaid(true);

    const payload = {
      orderCode: oc,
      customer: {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        visitDate: visitDate.trim(),
      },
      cart: cartItems,
      amounts: { subtotal, discount, total },
      tickets,
      paid: true,
    };
    // eslint-disable-next-line no-console
    console.log("Checkout success payload:", payload);
  };

  const handleDownloadPDF = async () => {
    if (!paid || !ticketsRef.current) return;
    const container = ticketsRef.current;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".ticket-card"));
    if (cards.length === 0) return;

    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; // mm
    const targetWidth = pageWidth - margin * 2;
    const targetHeight = pageHeight - margin * 2;

    for (let idx = 0; idx < cards.length; idx += 1) {
      const card = cards[idx];
      const canvas = await html2canvas(card, { backgroundColor: '#ffffff', scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      // Convert pixels to mm based on 96 DPI: 1px ≈ 0.264583 mm
      const pxToMm = 0.264583;
      const imgWidthMm = imgWidthPx * pxToMm;
      const imgHeightMm = imgHeightPx * pxToMm;
      const ratio = Math.min(targetWidth / imgWidthMm, targetHeight / imgHeightMm);
      const renderWidth = imgWidthMm * ratio;
      const renderHeight = imgHeightMm * ratio;
      const x = margin + (targetWidth - renderWidth) / 2;
      const y = margin + (targetHeight - renderHeight) / 2;

      if (idx > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', x, y, renderWidth, renderHeight);
    }
    pdf.save(`${orderCode || 'tickets'}.pdf`);
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
              <h2 id="booking-details-title" className="h4 mb-3">Booking Details</h2>
              <form aria-describedby="booking-details-help" noValidate>
                <p id="booking-details-help" className="text-muted small mb-4">
                  Please provide the details for the ticket holder. Fields marked with * are required.
                </p>
                <div className="mb-3">
                  <label htmlFor="bd-name" className="form-label">Full Name *</label>
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
                  <label htmlFor="bd-email" className="form-label">Email *</label>
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
                    <div className="form-text text-danger">Please enter a valid email address.</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="bd-phone" className="form-label">Phone *</label>
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
                  <label htmlFor="bd-date" className="form-label">Visit Date *</label>
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
                <div aria-live="polite" aria-atomic="true" className="small text-danger" />
              </form>
            </section>
          </div>

          {/* Right column: Payment Summary */}
          <div className="col-12 col-lg-5">
            <section
              aria-labelledby="payment-summary-title"
              className="bg-white rounded p-4 shadow-sm"
            >
              <h2 id="payment-summary-title" className="h4 mb-3">Payment Summary</h2>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <strong>{formatMoney(subtotal)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  <strong>{discount > 0 ? <span className="text-success">- {formatMoney(discount)}</span> : "—"}</strong>
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
                  <>Your cart is empty. Please add tickets before confirming payment.</>
                ) : (
                  <>You can confirm payment once booking details are complete.</>
                )}
              </p>
            </section>

            {paid && (
              <section className="bg-white rounded p-4 shadow-sm mt-4" aria-live="polite">
                <h2 className="h4 mb-3 text-success">Payment Successful</h2>
                <div className="mb-3">
                  <h3 className="h5 mb-2">Order Summary</h3>
                  <div className="mb-1"><strong>Order Code:</strong> {orderCode}</div>
                  <div className="mb-1"><strong>Name:</strong> {fullName}</div>
                  <div className="mb-1"><strong>Email:</strong> {email}</div>
                  <div className="mb-1"><strong>Phone:</strong> {phone}</div>
                  <div className="mb-1"><strong>Visit Date:</strong> {visitDate || "—"}</div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal</span>
                      <strong>{formatMoney(subtotal)}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Discount</span>
                      <strong>{discount > 0 ? <span className="text-success">- {formatMoney(discount)}</span> : "—"}</strong>
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
                      <div className="col-12 col-md-6" key={t.code + '-' + idx}>
                        <div className="border rounded p-3 h-100 ticket-card" style={{ background: '#fff' }}>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <div className="fw-semibold">{t.code}</div>
                              <div className="text-muted small">Zone: {t.zone || 'General'}</div>
                              <div className="text-muted small">Visit: {t.visitDate}</div>
                            </div>
                            <QRCodeCanvas value={t.code} size={72} includeMargin aria-label={`QR for ${t.code}`} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button type="button" className="btn btn-outline-secondary" onClick={handlePrint}>
                    Print
                  </button>
                  <button type="button" className="btn btn-outline-primary" onClick={handleDownloadPDF}>
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


