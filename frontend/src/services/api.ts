// src/services/api.ts

export interface AuthResponse {
  status: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    phone: string;
    email: string;
    role?: string;
  };
  message?: string;
}

// ------------------- LOGIN -------------------
export async function login(
  email: string,
  password: string,
  remember: boolean = false
): Promise<AuthResponse> {
  const res = await fetch("/api/auth/login.php", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify({ email, password, remember }),
  });

  const data: AuthResponse = await res.json();
  return data;
}

// ------------------- SIGNUP -------------------
export async function signup(data: {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch("/api/auth/signup.php", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify(data),
  });

  const result: AuthResponse = await res.json(); 
  return result;
}

// ------------------- UPDATE PROFILE -------------------
export interface UpdateProfileData {
  username?: string;
  email?: string;
  phone?: string;
  password?: string; 
}

export interface UpdateProfileResponse {
  status: string;
  message: string;
  logoutRequired?: boolean;
  user?: {              
    username: string;
    email?: string;
    phone?: string;
    last_profile_update?: string;
  };
}

export async function updateProfile(
  data: UpdateProfileData,
  token: string
): Promise<UpdateProfileResponse> {
  console.log("Token before update:", token);
  const res = await fetch("/api/account/updateprofile.php", {
    method: "POST", // backend đang dùng POST
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  const raw = await res.text();
  if (!res.ok) {
    try {
      const parsed = JSON.parse(raw);
      throw new Error(parsed?.message || `HTTP error! status: ${res.status}`);
    } catch {
      // fallback: dùng raw text nếu không phải JSON
      throw new Error(raw || `HTTP error! status: ${res.status}`);
    }
  }
  // thành công: raw chắc chắn là JSON
  return JSON.parse(raw);
}

// ------------------- ORDERS -------------------
export interface OrderItem {
  id: number;
  ticket_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface OrderPayment {
  amount: number;
  provider: string | null;
  paid_at: string | null;
  status: string;
}

export interface OrderDto {
  id: number;
  order_date: string;
  total_amount: number;
  status: string;
  item_count: number;
  ticket_names: string;
  items?: OrderItem[];
  payments?: OrderPayment[];
}

export interface OrdersResponse {
  status: string;
  orders: OrderDto[];
}

export interface OrdersListResponse {
  status: string;
  orders: OrderDto[];
  pagination: {
    current_page: number;
    per_page: number;
    total_orders: number;
    total_pages: number;
  };
  filters: {
    start_date?: string;
    end_date?: string;
    status?: string;
  };
}

export interface OrderDetailsResponse {
  status: string;
  order: {
    id: number;
    order_date: string;
    total_amount: number;
    status: string;
    customer: {
      full_name: string;
      email: string;
      phone: string;
    };
    items: OrderItem[];
    payments: OrderPayment[];
  };
}

export async function getOrders(
  token: string, 
  filters?: {
    start_date?: string;
    end_date?: string;
    status?: string;
    page?: number;
    limit?: number;
  }
): Promise<OrdersListResponse> {
  const params = new URLSearchParams();
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const url = `/api/account/orders.php${params.toString() ? '?' + params.toString() : ''}`;
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const raw = await res.text();
  if (!res.ok) {
    try {
      const parsed = JSON.parse(raw);
      throw new Error(parsed?.message || `HTTP error! status: ${res.status}`);
    } catch {
      throw new Error(raw || `HTTP error! status: ${res.status}`);
    }
  }
  return JSON.parse(raw);
}

export async function getOrderDetails(token: string, orderId: number): Promise<OrderDetailsResponse> {
  const res = await fetch(`/api/account/order-details.php?order_id=${orderId}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const raw = await res.text();
  if (!res.ok) {
    try {
      const parsed = JSON.parse(raw);
      throw new Error(parsed?.message || `HTTP error! status: ${res.status}`);
    } catch {
      throw new Error(raw || `HTTP error! status: ${res.status}`);
    }
  }
  return JSON.parse(raw);
}
