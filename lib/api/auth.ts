// Mock API service for authentication
// In production, this would call actual backend APIs

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role?: 'user' | 'admin' | 'shop_owner';
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

// Mock users database (for development/testing only)
const MOCK_USERS = [
  {
    userid: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@dompee.lk',
    phone: '+94771234567',
    address: 'Dompe, Sri Lanka',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    userid: '2',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+94771234568',
    address: 'Colombo, Sri Lanka',
    password: 'user123',
    role: 'user' as const,
  },
  {
    userid: '3',
    firstName: 'Shop',
    lastName: 'Owner',
    email: 'owner@shop.com',
    phone: '+94771234569',
    address: 'Dompe, Sri Lanka',
    password: 'owner123',
    role: 'shop_owner' as const,
  },
];

/**
 * Login with email and password
 * Uses Google Apps Script in production, falls back to mock data in development
 */
export async function loginUser(credentials: LoginCredentials): Promise<ApiResponse<any>> {
  try {
    // Try Google Apps Script first
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwG_BH87AmRaGAPgkNi5VixUd9pDE_B_EFSoXMZlEjmSWcVKfyTZu3YlZahL_vy3PrP/exec";
    
    const response = await fetch(
      `${APPS_SCRIPT_URL}?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`
    );
    
    const result = await response.json();
    
    if (result.status === "success") {
      return {
        status: 'success',
        data: {
          userid: result.userid || result.email,
          firstName: result.firstName,
          lastName: result.lastName || '',
          email: result.email,
          phone: result.phone || '',
          address: result.address || '',
          role: result.role,
        }
      };
    }
    
    // If Google Script fails, try mock users
    throw new Error('Google Script authentication failed');
    
  } catch (error) {
    console.warn('Using mock authentication:', error);
    
    // Fallback to mock users for development
    const user = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const { password, ...userData } = user;
      return {
        status: 'success',
        data: userData,
      };
    }
    
    return {
      status: 'error',
      message: 'Invalid email or password',
    };
  }
}

/**
 * Register a new user
 */
export async function registerUser(data: RegisterData): Promise<ApiResponse<any>> {
  try {
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxSBcQJtpmH4NHzFTfNF6VhtLNalqkhMtAbdAdK4Q4SS4YRSXZnDhdBQ7rT8cFjDaVU/exec";
    
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, role: data.role || 'user' }),
    });
    
    return {
      status: 'success',
      message: 'Registration successful',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      status: 'error',
      message: 'Registration failed. Please try again.',
    };
  }
}
