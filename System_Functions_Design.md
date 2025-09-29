# System Functions Design

## Function 1: User Authentication (Signup, Login, Logout)

### Objective
Enable secure user registration, login, and logout functionality with JWT-based authentication and role-based access control.

### Scope
**In-scope:**
- User registration with email validation
- User login with password verification
- JWT token generation and validation
- Remember me functionality (30-day vs 7-day token expiry)
- Role-based redirection (admin/member)
- Logout functionality
- Navbar user menu integration

**Out-of-scope:**
- Password reset with email
- Email verification
- Social media login integration
- Two-factor authentication
- Password complexity requirements

### Key Files
**Front-end:**
- `frontend/src/pages/auth/Signup.tsx`
- `frontend/src/pages/auth/Login.tsx`
- `frontend/src/components/NavbarUserMenu.tsx`
- `frontend/src/contexts/AuthContext.tsx`
- `frontend/src/services/api.ts`

**Back-end:**
- `backend/public/api/auth/signup.php`
- `backend/public/api/auth/login.php`
- `backend/public/api/auth/logout.php`
- `backend/middleware/auth.php`
- `backend/utils/jwt.php`

### Inputs
- **Signup:** full_name, email (unique), password
- **Login:** email, password
- **Logout:** cookie/session/JWT

### Processing
1. **Signup Process:**
   - Validate required fields (full_name, email, password)
   - Check email uniqueness in database
   - Hash password using bcrypt
   - Insert user record with role 'user'
   - Generate JWT token (7-day expiry)
   - Return success/failure (do not expose uniqueness reason)

2. **Login Process:**
   - Validate email and password presence
   - Query user by email
   - Verify password hash
   - Issue session/JWT (prefer HTTP-only cookie)
   - Return minimal profile

3. **Logout Process:**
   - Remove session/token
   - Clear authentication state
   - Redirect to login page

4. **Authentication Middleware:**
   - Extract Bearer token from Authorization header
   - Verify JWT signature and expiry
   - Extract user_id and role from payload
   - Attach user context to request

### Outputs
**Success Payloads:**
```json
// Signup Success
{
  "status": "success",
  "message": "Signup successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}

// Login Success
{
  "status": "success",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

**Failure Payloads:**
```json
// Signup Failure
{
  "status": "error",
  "message": "Registration failed"
}

// Login Failure
{
  "status": "error",
  "message": "Incorrect username or password"
}
```

### Error Handling & Messages
- "Missing required fields" (400)
- "Registration failed" (400) - for duplicate email (reason not exposed)
- "Incorrect username or password" (401)
- "Email and password required" (400)
- "Rate limit exceeded" (429) - placeholder for future implementation
- "Server error" (500)

### FE ⇄ BE Synchronization Notes
- Navbar label changes to user name when logged in
- FE state synchronized with BE auth via AuthContext
- JWT token stored in localStorage/sessionStorage
- Token included in Authorization header for authenticated requests
- Automatic redirection based on user role after login
- Logout clears all authentication state and redirects to login

---

## Function 2: Ticket Browsing & Pricing Calendar

### Objective
Display ticket options with dynamic pricing based on visit dates and provide calendar-based booking interface with zone selection.

### Scope
**In-scope:**
- Calendar view with daily pricing display
- Zone selection (Amusement Park, Water Park)
- Dynamic pricing calculation (weekday $10, weekend $12)
- Group discount rule explanation (10% for ≥11 tickets total)
- Real-time price updates
- Add to cart functionality
- Monthly calendar rendering

**Out-of-scope:**
- Ticket inventory management
- Booking date restrictions (>30 days)
- Seasonal pricing variations
- Special event pricing
- Group discount application (only display rule)

### Key Files
**Front-end:**
- `frontend/src/pages/tickets.tsx`
- `frontend/src/components/CalendarPrice.tsx`
- `frontend/src/components/TicketCard.tsx`
- `frontend/src/lib/pricing.ts`

**Back-end:**
- `backend/public/api/tickets/index.php`
- `backend/public/api/pricing/quote.php`

### Inputs
- Query date (YYYY-MM-DD) or month range for calendar rendering
- Ticket type (amusement park, water park) — or keep 2 fixed types
- Selected visit date from calendar
- Quantity selection

### Processing
1. **Calendar Price Calculation:**
   - Get list of dates for the month
   - Calculate price per day (weekend surcharge)
   - Apply base price: $10 weekday, $12 weekend (20% surcharge)
   - Render calendar with daily pricing

2. **Ticket Card Rendering:**
   - Render 3 cards: General (show rule & book now), Zone 1 (amusement), Zone 2 (water)
   - Include short descriptions + Book Now buttons
   - Display group discount rule explanation (10% for ≥11 tickets total)

3. **Date Selection:**
   - Select date → prefill price according to date
   - Add to Cart with selected date and pricing

4. **Pricing Rules (MUST apply):**
   - Base price weekday = $10 USD
   - Weekend (Sat/Sun) = $12 USD (20% surcharge)
   - Group discount: 10% when total quantity ≥11 (only applied in Cart/Checkout, but display rule in tickets)

### Outputs
**Frontend Rendering:**
- Calendar with price for each day
- Ticket cards with descriptions
- Event handling when selecting date
- Group discount rule display

**Backend JSON Response:**
```json
{
  "date": "2024-01-15",
  "base_price": 10,
  "weekend": false,
  "price_of_day": 10
}
```

**Success Payload:**
```json
{
  "status": "success",
  "data": [
    {
      "date": "2024-01-15",
      "base_price": 10,
      "weekend": false,
      "price_of_day": 10
    },
    {
      "date": "2024-01-16",
      "base_price": 10,
      "weekend": true,
      "price_of_day": 12
    }
  ]
}
```

### Error Handling & Messages
- "Invalid date format" (400) - show toast
- "Date not available" (400) - show toast
- "Backend error" (500) - fallback to static rule display + reload instruction
- "Please select a valid date" (validation error)
- "Failed to load pricing data" (API error)

### FE ⇄ BE Synchronization Notes
- Frontend does not calculate "inventory"
- Only display/explain group discount rule; do not apply discount here (apply in Cart/Checkout)
- Calendar data fetched from backend for accurate pricing
- Real-time price updates based on selected date
- Cart integration stores selected date and pricing
- Fallback to static pricing rules if backend unavailable

---

## Function 3: Cart Management (Add/Update/Remove)

### Objective
Manage shopping cart with item modification, quantity updates, and real-time price calculation with group discount logic.

### Scope
**In-scope:**
- Add items to cart with merge logic (ticket_type + visit_date)
- Update quantities with validation
- Remove individual items
- Clear entire cart
- Real-time price recalculation with group discount
- Cart persistence (localStorage for guest, optional API sync for logged-in)
- Cart state normalization

**Out-of-scope:**
- Cart sharing between users
- Cart expiration timers
- Inventory validation
- Cross-device cart sync
- Server-side cart storage (optional only)

### Key Files
**Front-end:**
- `frontend/src/pages/cart.tsx`
- `frontend/src/store/cartStore.ts` (or context)
- `frontend/src/components/CartSummary.tsx`
- `frontend/src/lib/pricing.ts`

**Back-end:**
- `backend/public/api/cart/*.php` (if sync server when logged-in, otherwise guest stores localStorage)

### Inputs
- **CartItem:** {ticket_type, visit_date, unit_price, quantity}
- **Full Cart:** Array of CartItem objects
- **User Actions:** Add, update quantity, remove, clear cart

### Processing
1. **Add Item Logic:**
   - Merge by key (ticket_type + visit_date) → accumulate quantity
   - Validate item data structure
   - Update cart state and storage

2. **Update Item Logic:**
   - Change quantity, if 0 then remove
   - Validate quantity bounds (1-99)
   - Recalculate totals

3. **Remove Item Logic:**
   - Remove item from cart array
   - Recalculate totals
   - Update storage

4. **Price Calculation:**
   - Subtotal = Σ(unit_price × quantity)
   - Group discount = 10% if Σquantity ≥ 11, else 0
   - Total = subtotal - group_discount

5. **Synchronization:**
   - Guest: Store in localStorage
   - Logged-in: Optional sync API /cart (if available), but not mandatory

### Outputs
**Cart State Normalization:**
```json
{
  "items": [
    {
      "ticket_type": "amusement_park",
      "visit_date": "2024-01-15",
      "unit_price": 10,
      "quantity": 2
    }
  ],
  "subtotal": 20,
  "discount": 0,
  "total": 20
}
```

**UI Components:**
- Item table with edit/remove actions
- Quantity modification controls
- Remove item functionality
- Discount rule note when condition is met (≥11 tickets)

**Success Payload:**
```json
{
  "status": "success",
  "cart": {
    "items": [...],
    "subtotal": 100,
    "discount": 10,
    "total": 90
  }
}
```

### Error Handling & Messages
- "Invalid quantity (must be 1-99)" (400) - block and show toast
- "Invalid date format" (400) - block and show toast
- "Negative quantity not allowed" (400) - block and show toast
- "Item removed successfully" (success toast)
- "Cart updated" (success toast)
- "Failed to update cart" (500) - API error

### FE ⇄ BE Synchronization Notes
- Source of truth for daily pricing can be fixed from Tickets/Quote BE; Cart still uses selected unit_price
- Guest users: Cart stored entirely in localStorage
- Logged-in users: Optional server sync via /cart API
- Cart state managed by store/context for real-time updates
- Automatic recalculation on any changes
- Group discount calculation happens in real-time
- Cart data validated before checkout submission

---

## Function 4: Checkout & Order Creation (Mock payment)

### Objective
Process cart items into confirmed orders with mock payment processing, ticket generation, and order confirmation display.

### Scope
**In-scope:**
- Customer information collection and validation
- Order validation (client & server)
- Server-side price recalculation with group discount
- Mock payment processing
- Order creation with unique order codes
- Ticket code generation (simple string format)
- Order confirmation display
- Success page with order details

**Out-of-scope:**
- Refund processing
- Real payment gateway integration
- Inventory management
- Email notifications
- SMS confirmations

### Key Files
**Front-end:**
- `frontend/src/pages/checkout.tsx`
- `frontend/src/components/CheckoutForm.tsx`
- `frontend/src/pages/success.tsx`

**Back-end:**
- `backend/public/api/orders/create.php`
- `backend/public/api/payments/mock.php`
- `backend/public/api/orders/details.php`

### Inputs
- **Customer:** full_name, email, phone
- **Cart:** List of items {ticket_type, visit_date, unit_price, quantity}
- **Payment method:** "Mock" | "Pay at Gate" (demo)

### Processing
1. **Form Validation:**
   - Validate form client & server
   - Check required fields (full_name, email, phone)
   - Validate email format
   - Ensure cart is not empty

2. **Price Recalculation:**
   - Re-calculate prices on server to ensure accuracy
   - Apply group discount 10% if Σquantity ≥ 11
   - Validate pricing consistency

3. **Order Creation:**
   - Create order (status=PAID for mock)
   - Generate order_code (example ORD-YYYYMMDD-XXXX)
   - Store customer information
   - Calculate final totals

4. **Ticket Generation:**
   - Generate "QR code"/ticket code (simple string description, no image needed)
   - Create individual ticket records
   - Link tickets to order

5. **Payment Processing:**
   - Process mock payment
   - Update order status to PAID
   - Clear cart from localStorage
   - Return order payload + items

6. **Success Flow:**
   - FE redirects to success page
   - Display order details + codes

### Outputs
**Backend Response:**
```json
{
  "order_id": 12345,
  "order_code": "ORD-20240115-0001",
  "totals": {
    "subtotal": 100,
    "discount": 10,
    "total": 90
  },
  "items": [
    {
      "ticket_code": "240115-0001-001",
      "ticket_type": "amusement_park",
      "visit_date": "2024-01-15",
      "quantity": 1,
      "unit_price": 10
    }
  ],
  "customer": {
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

**Frontend Success Page:**
- Order summary with details
- Ticket codes display
- Customer information
- Payment confirmation

### Error Handling & Messages
- "Missing required information" (400) - report specific field errors
- "Invalid email format" (400)
- "Empty cart" (422)
- "Backend fail" (500) - display toast and keep cart intact
- "Payment processing failed" (500)
- "Order creation failed" (500)

**Field-specific validation errors:**
- "Full name is required" (400)
- "Email is required" (400)
- "Phone is required" (400)
- "Invalid email format" (400)

### FE ⇄ BE Synchronization Notes
- Client-side validation before submission
- Server-side validation as final check
- Price recalculation on server ensures accuracy
- Cart cleared only on successful payment
- Order codes generated server-side
- Mock payment always returns PAID status
- Success page displays complete order information
- Error handling preserves cart state for retry

---

## Function 5: Order History (Member area)

### Objective
Allow authenticated users to view their order history with filtering, pagination, and detailed order information in a dedicated member area.

### Scope
**In-scope:**
- Order listing with pagination
- Order filtering by date range and status
- Detailed order view with ticket information
- Order status tracking
- Expandable row view for order items
- Authentication required access

**Out-of-scope:**
- Order modification after creation
- Cancellation functionality
- Refund processing
- Order sharing
- Order editing/canceling features

### Key Files
**Front-end:**
- `frontend/src/pages/account/Orders.tsx`
- `frontend/src/components/OrderRow.tsx`
- `frontend/src/services/api.ts`

**Back-end:**
- `backend/public/api/account/orders.php`
- `backend/public/api/account/order-details.php`

### Inputs
- **Filter:** date_from/date_to (optional), status (optional)
- **Pagination:** page, page_size (if needed)
- **Authentication:** JWT token (required)

### Processing
1. **Authentication Check:**
   - Auth required
   - Verify JWT token validity
   - Extract user_id from token

2. **Order Query:**
   - Query orders by user_id
   - Apply date range filters (date_from/date_to)
   - Apply status filters
   - Pagination (page, page_size) if needed

3. **Order Data Structure:**
   - Each order includes: order_code, placed_at, subtotal, discount, total
   - Items: ticket_type, visit_date, quantity, unit_price, ticket_code
   - Include order status and payment information

4. **Data Processing:**
   - Sort orders by placed_at (newest first)
   - Calculate pagination metadata
   - Format dates for display
   - Prepare expandable row data

### Outputs
**Frontend Display:**
- Order history table with pagination
- Expandable row to view items
- Filter controls (date range, status)
- Order summary cards

**Backend JSON Response:**
```json
{
  "status": "success",
  "data": {
    "orders": [
      {
        "order_id": 12345,
        "order_code": "ORD-20240115-0001",
        "placed_at": "2024-01-15T10:30:00Z",
        "subtotal": 100,
        "discount": 10,
        "total": 90,
        "status": "PAID",
        "items": [
          {
            "ticket_type": "amusement_park",
            "visit_date": "2024-01-20",
            "quantity": 2,
            "unit_price": 10,
            "ticket_code": "240120-0001-001"
          }
        ]
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_orders": 25,
      "total_pages": 3
    }
  }
}
```

**Success Payload:**
```json
{
  "status": "success",
  "orders": [...],
  "pagination": {...},
  "filters": {
    "date_from": "2024-01-01",
    "date_to": "2024-01-31",
    "status": "PAID"
  }
}
```

### Error Handling & Messages
- "Authentication required" (401) - redirect to login
- "Not logged in → redirect/login" (401)
- "No data found → empty state" (404)
- "No orders found" (empty result)
- "Failed to fetch orders" (500)
- "Invalid date range" (400)
- "Invalid status filter" (400)

**Empty State Messages:**
- "You don't have any orders yet"
- "No orders found for the selected period"
- "Start booking tickets to see your order history"

### FE ⇄ BE Synchronization Notes
- JWT authentication required for all requests
- Pagination handled server-side with client-side controls
- Real-time filter updates trigger new API calls
- Order details fetched on-demand via expandable rows
- No order modification capabilities (read-only)
- Filter state preserved in URL parameters
- Automatic redirect to login if not authenticated

---

## Function 6: Reviews & Moderation

### Objective
Enable members to submit attraction reviews and allow admin moderation with approval/rejection workflow.

### Scope
**In-scope:**
- Member review submission for attractions
- Admin review moderation (approve/reject)
- Public review listing (approved only)
- Rating system (1-5 stars)
- No limit on reviews per user (admin approval workflow handles quality control)
- Status management (pending, approved, rejected)

**Out-of-scope:**
- Upload review images (if not available in FE/BE)
- Review editing after submission
- Review responses from admin
- Review analytics
- Email notifications for status changes

### Key Files
**Front-end:**
- `frontend/src/pages/reviews.tsx` (member)
- `frontend/src/pages/admin/reviews.tsx`
- `frontend/src/components/ReviewForm.tsx`

**Back-end:**
- `backend/public/api/reviews/create.php`
- `backend/public/api/reviews/list.php`
- `backend/public/api/admin/reviews/update-status.php`

### Inputs
- **Submit:** {attraction_id, rating 1..5, title?, content}
- **List (public):** {attraction_id, page}
- **Moderation:** {review_id, action: approve|reject}

### Processing
1. **Member Submit:**
   - Validate required fields (attraction_id, rating, content)
   - Check user authentication
   - Validate rating (1-5 stars)
   - No review limit (admin approval workflow ensures quality)
   - Save with status=pending
   - Return success message

2. **Public List:**
   - Return only approved reviews
   - Filter by attraction_id
   - Apply pagination
   - Sort by creation date (newest first)

3. **Admin Moderation:**
   - List all reviews with status filter
   - Approve or reject reviews
   - Update review status
   - Track moderation actions

4. **Review Quality Control:**
   - No limit on reviews per user
   - Admin approval workflow ensures quality control
   - Check existing reviews before submission (for reference only)

### Outputs
**Submit Success:**
```json
{
  "status": "success",
  "message": "Review submitted, pending approval.",
  "review_id": 12345
}
```

**Public List Response:**
```json
{
  "status": "success",
  "data": {
    "reviews": [
      {
        "review_id": 12345,
        "attraction_id": 1,
        "user_name": "John Doe",
        "rating": 5,
        "title": "Great experience!",
        "content": "Had an amazing time at the amusement park...",
        "created_at": "2024-01-15T10:30:00Z",
        "status": "approved"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_reviews": 25,
      "total_pages": 3
    }
  }
}
```

**Admin List Response:**
```json
{
  "status": "success",
  "data": {
    "reviews": [...],
    "pagination": {...},
    "filters": {
      "status": "pending",
      "attraction_id": 1
    }
  }
}
```

**Frontend Display:**
- Submit OK: "Review submitted, pending approval."
- Admin list: review table with status filter
- Public reviews: approved reviews only
- Rating display with stars

### Error Handling & Messages
- "Authentication required" (401) - Not logged in when submit → require login
- "Invalid rating (must be 1-5)" (400)
- "Missing required fields" (400)
- "Attraction not found" (404)
- "Review not found" (404)
- "Failed to submit review" (500)
- "Failed to update review status" (500)

**Specific Error Messages:**
- "Please log in to submit a review"
- "Rating must be between 1 and 5 stars"
- "Review content is required"

### FE ⇄ BE Synchronization Notes
- Authentication required for review submission
- No review limit enforced (admin approval workflow handles quality)
- Public API only returns approved reviews
- Admin API includes all reviews with status filtering
- Real-time status updates in admin panel
- Pagination handled server-side
- Review status changes immediately refresh display
- Member reviews stored with pending status by default

---

## Function 7: Information & Contact Management

### Objective
Provide comprehensive park information, contact functionality, and FAQ system through an integrated Info page with tabbed navigation.

### Scope
**In-scope:**
- Park information display with historical timeline
- Contact form with backend integration
- FAQ system with expandable accordion interface
- Tabbed navigation (About, Contact, FAQ)
- Contact information display with interactive cards
- Google Maps integration
- Responsive design with animations

**Out-of-scope:**
- Real-time chat functionality
- Contact form email notifications
- Advanced search in FAQ
- Multi-language support
- Contact form file uploads

### Key Files
**Front-end:**
- `frontend/src/pages/Info.tsx`
- `frontend/src/components/ScrollAnimation.tsx`

**Back-end:**
- `backend/public/api/messages.php`

### Inputs
- **Contact Form:** name, email, phone, project, subject, message
- **URL Parameters:** ?tab=faq for direct FAQ navigation
- **User Interactions:** Tab switching, FAQ accordion toggles

### Processing
1. **Tab Navigation:**
   - Three main tabs: About, Contact, FAQ
   - URL parameter handling for direct FAQ access
   - Smooth scrolling and animations

2. **About Section:**
   - Park introduction with key statistics
   - Historical timeline with images and dates
   - Interactive hover effects on statistics cards
   - Timeline from 1904 to 2015 with major milestones

3. **Contact Section:**
   - Contact information cards with icons
   - Interactive contact form with validation
   - Google Maps embed for location
   - Form submission to backend API

4. **FAQ Section:**
   - Expandable accordion interface
   - Categories: Amusement Park, Runaway Rapids, Group Outings, Birthday Parties, Parking
   - Detailed safety and policy information
   - Smooth animations and transitions

5. **Contact Form Processing:**
   - Client-side form validation
   - POST request to `/api/messages`
   - Success/error message display
   - Form reset on successful submission

### Outputs
**Frontend Display:**
- Hero section with park banner and breadcrumb
- Tabbed interface with smooth transitions
- About section with statistics and timeline
- Contact section with info cards and form
- FAQ section with expandable content
- Google Maps integration

**Contact Form Success Response:**
```json
{
  "status": "success",
  "message": "Your message has been sent to admin. Thank you!"
}
```

**Contact Form Error Response:**
```json
{
  "status": "error",
  "message": "Failed to send, please try again later."
}
```

### Error Handling & Messages
- "Your message has been sent to admin. Thank you!" (success)
- "Failed to send, please try again later." (API error)
- "Network error, please try again later." (network error)
- Form validation for required fields
- Loading state during form submission

### FE ⇄ BE Synchronization Notes
- Contact form integrates with backend `/api/messages` endpoint
- Form data sent as JSON POST request
- Success/error states managed in frontend
- FAQ content is static (no backend integration needed)
- About content is static with historical data
- Google Maps embedded directly in frontend
- Tab state managed locally with URL parameter support

---

## Function 8: Admin – Basic Management (minimum for demo)

### Objective
Provide basic administrative functionality for managing core system entities with minimal CRUD operations for demo purposes.

### Scope
**In-scope:**
- Ticket management (view, add, edit, delete)
- Zone management (view, add, edit, delete)
- Attraction management (view, add, edit, delete)
- Gallery management (view, add, edit, delete)
- Dashboard with simple count metrics
- Basic CRUD forms and operations
- Admin authentication (role=admin)

**Out-of-scope:**
- Detailed revenue statistics, export, multi-role permissions
- Advanced analytics and charts
- Bulk operations
- Data export functionality
- User management
- System configuration
- Complex reporting

### Key Files
**Front-end:**
- `frontend/src/pages/admin/tickets.tsx`
- `frontend/src/pages/admin/zones.tsx`
- `frontend/src/pages/admin/attractions.tsx`
- `frontend/src/pages/admin/gallery.tsx`
- `frontend/src/pages/admin/dashboard.tsx`

**Back-end:**
- `backend/public/api/admin/tickets/*.php`
- `backend/public/api/admin/zones/*.php`
- `backend/public/api/admin/attractions/*.php`
- `backend/public/api/admin/gallery/*.php`
- `backend/public/api/admin/dashboard/summary.php`

### Inputs
- **CRUD form minimum:** Basic form data for tickets/zones/attractions/gallery
- **Dashboard:** No real charts needed, only total record counts for demo
- **Authentication:** Admin role verification (role=admin)

### Processing
1. **Admin Authentication:**
   - Admin auth required (role=admin)
   - Verify JWT token with admin role
   - Block access for non-admin users

2. **CRUD Operations:**
   - Simple validation; return JSON success/fail
   - Create: Insert new records with basic validation
   - Read: List all records with pagination
   - Update: Modify existing records
   - Delete: Remove records with confirmation

3. **Dashboard Summary:**
   - Dashboard summary: count users, orders, tickets, reviews (approved/pending)
   - Simple count queries for demo purposes
   - No complex analytics or charts

4. **Data Management:**
   - Basic form validation
   - Simple error handling
   - JSON response format
   - Pagination for large datasets

### Outputs
**CRUD Interface:**
- List: Table view with all records
- Add/Edit form: Basic forms for create/edit operations
- Delete button: Delete buttons with confirmation

**Dashboard Display:**
```json
{
  "status": "success",
  "data": {
    "total_users": 150,
    "total_orders": 89,
    "total_tickets": 234,
    "approved_reviews": 45,
    "pending_reviews": 12
  }
}
```

**CRUD Success Response:**
```json
{
  "status": "success",
  "message": "Record created successfully",
  "data": {
    "id": 123,
    "name": "Amusement Park Ticket",
    "price": 10,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**List Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Amusement Park",
      "description": "Main amusement park area",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total_records": 25,
    "total_pages": 3
  }
}
```

### Error Handling & Messages
- "Admin access required" (403) - Admin auth required
- "Invalid form data" (400) - Simple validation
- "Record not found" (404)
- "Failed to create record" (500)
- "Failed to update record" (500)
- "Failed to delete record" (500)
- "Are you sure you want to delete this record?" (confirmation)

**Specific Error Messages:**
- "You must be an admin to access this page"
- "Please fill in all required fields"
- "Record deleted successfully"
- "Failed to load dashboard data"

### FE ⇄ BE Synchronization Notes
- Admin authentication required for all operations
- Simple CRUD operations with basic validation
- Dashboard shows simple count metrics (no complex charts)
- Real-time updates after CRUD operations
- Basic form validation on both client and server
- JSON responses for all operations
- Pagination handled server-side
- Delete operations require confirmation
- No advanced analytics or reporting features