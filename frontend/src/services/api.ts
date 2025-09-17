interface AuthResponse {
  status: string;
  token?: string;
  user?: {
    user_id: number;
    username: string;
    email: string;
    role?: string;
  };
  message?: string;
}

// login
export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch("/api/auth/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// signup
interface SignupData {
  fullName: string;
  dob: string;
  gender: string;
  email: string;
  phone?: string;
  password: string;
}

export async function signup(data: SignupData): Promise<AuthResponse> {
  const res = await fetch("/api/auth/signup.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
