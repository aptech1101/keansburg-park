import axios from "axios";

// Resolve backend origin from env so Vite dev can talk to PHP backend
const RAW_BACKEND_ORIGIN = ((import.meta as any)?.env?.VITE_API_BASE_URL as string) || "";
export const backendOrigin = RAW_BACKEND_ORIGIN ? RAW_BACKEND_ORIGIN.replace(/\/$/, "") : "";

// Inline apiConfig & auth headers so admin can import from services/api
export const apiConfig = {
 
  baseURL: backendOrigin ? `${backendOrigin}/api` : "/api",

  timeout: parseInt(((import.meta as any)?.env?.VITE_API_TIMEOUT as string) || "10000", 10),
  headers: { "Content-Type": "application/json" },
};

// Convert a possibly relative backend path (e.g. "/uploads/...") into absolute URL
export const toBackendUrl = (path: string): string => {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  // Prefer explicit backendOrigin
  if (backendOrigin) {
    return backendOrigin + (path.startsWith("/") ? path : `/${path}`);
  }
  // Fallback: try to extract origin from apiConfig.baseURL if it's absolute
  try {
    const url = new URL(apiConfig.baseURL, window.location.origin);
    if (url.origin && url.origin !== window.location.origin) {
      return url.origin + (path.startsWith("/") ? path : `/${path}`);
    }
  } catch {}
  // Last resort: return as-is (may 404 on Vite origin)
  return path;
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token") || localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const http = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
});
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

// ------------------- FILE UPLOAD -------------------
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await http.post<{ status: string; url?: string; message?: string }>(
    "/upload.php",
    formData,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data.status !== "success" || !res.data.url) {
    throw new Error(res.data.message || "Upload failed");
  }
  return res.data.url; // URL này bạn lưu vào DB (restaurants, attractions, gallery, ...)
}

// ------------------- LOGIN -------------------
export async function login(
  email: string,
  password: string,
  remember: boolean = false
): Promise<AuthResponse> {
  try {
    const { data } = await http.post<AuthResponse>("/auth/login", { email, password, remember });
    return data;
  } catch (err: any) {
    // Nếu server trả về JSON lỗi (401, 400, ...)
    if (err.response?.data) return err.response.data;
    return { status: "error", message: "Server error" }; 
  }
}

export async function forgotPassword(email: string) {
  try {
    const res = await http.post<{ status: string; message?: string }>("/auth/forgot-password", { email });
    return res.data;
  } catch (err: any) {
    if (err.response?.data) return err.response.data;
    return { status: "error", message: "Server error" };
  }
}


// ------------------- SIGNUP -------------------
export async function signup(data: {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<AuthResponse> {
  try{
    const res = await http.post<AuthResponse>("/auth/signup", data);
  return res.data;
  }catch(err : any){
    if(err.response?.data) return err.response.data;
    return { status : "error", message: "Server error"};
  }
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
  const res = await http.post<UpdateProfileResponse>(
    "/account/updateprofile",
    data,
    { headers: { ...getAuthHeaders(), Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// ------------------- ORDERS -------------------
export interface OrderItem {
  id: number;
  ticket_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  ticket_code?: string;
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

  const url = `/account/orders${params.toString() ? '?' + params.toString() : ''}`;
  const res = await http.get<OrdersListResponse>(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

export async function getOrderDetails(token: string, orderId: number): Promise<OrderDetailsResponse> {
  const res = await http.get<OrderDetailsResponse>(`/account/order-details?order_id=${orderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// ------------------- FEEDBACK -------------------
export async function getPendingFeedbackCount(): Promise<number> {
  const res = await http.get<{ status: string; total?: number }>("/admin/feedback", {
    headers: { ...getAuthHeaders() },
    params: { status: "pending", limit: 1, page: 1 }, // chỉ cần count, ko cần list dài
  });
  if (res.data.status === "success" && typeof res.data.total === "number") {
    return res.data.total;
  }
  return 0;
}
