// frontend/src/api/client.ts

// API base URL from environment variable with fallback
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Custom error class for API errors with status and data
 */
class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data: any = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Core API function that handles fetch requests with proper configuration
 * @param path - API endpoint path (will be appended to API_BASE)
 * @param init - Fetch init options (method, body, etc.)
 * @returns Promise<any> - Parsed JSON response
 * @throws ApiError - For HTTP errors with status and response data
 */
async function api(path: string, init: RequestInit = {}): Promise<any> {
  const url = API_BASE + path;
  
  // Default configuration
  const defaultInit: RequestInit = {
    credentials: 'include', // Include cookies for session management
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Merge with provided init options
  const config: RequestInit = {
    ...defaultInit,
    ...init,
    headers: {
      ...defaultInit.headers,
      ...init.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle HTTP errors
    if (!response.ok) {
      let errorData = null;
      
      // Try to parse error response as JSON
      try {
        const text = await response.text();
        if (text) {
          errorData = JSON.parse(text);
        }
      } catch {
        // If parsing fails, use response text as error message
        errorData = { message: response.statusText };
      }

      throw new ApiError(
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Handle successful response
    const text = await response.text();
    
    // Return null for empty responses
    if (!text.trim()) {
      return null;
    }

    // Parse JSON response
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new ApiError(
        'Invalid JSON response from server',
        response.status,
        { rawResponse: text }
      );
    }

  } catch (error) {
    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0,
      null
    );
  }
}

/**
 * GET request helper
 * @param path - API endpoint path
 * @returns Promise<any> - Parsed JSON response
 */
export function get(path: string): Promise<any> {
  return api(path, { method: 'GET' });
}

/**
 * POST request helper
 * @param path - API endpoint path
 * @param body - Request body (will be JSON stringified)
 * @returns Promise<any> - Parsed JSON response
 */
export function post(path: string, body: any): Promise<any> {
  return api(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT request helper
 * @param path - API endpoint path
 * @param body - Request body (will be JSON stringified)
 * @returns Promise<any> - Parsed JSON response
 */
export function put(path: string, body: any): Promise<any> {
  return api(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request helper
 * @param path - API endpoint path
 * @returns Promise<any> - Parsed JSON response
 */
export function del(path: string): Promise<any> {
  return api(path, { method: 'DELETE' });
}

// Export the core api function and ApiError class for advanced usage
export { api, ApiError };
