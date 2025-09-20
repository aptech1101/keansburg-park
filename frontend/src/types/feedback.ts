// Feedback types for the updated database structure

export interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  created_by?: number;
  created_at: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
  rating: number;
  user_id?: number;
}

export interface FeedbackResponse {
  status: 'success' | 'error';
  message?: string;
  data?: Feedback[];
  id?: number;
}

export interface AdminFeedbackUpdate {
  id: number;
  status: 'pending' | 'approved' | 'rejected';
}

// API response types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

// Review display type (for public display)
export interface ReviewDisplay {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  created_at: string;
}
