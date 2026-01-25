// Authentication utility functions and types

export interface AuthUser {
  userid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'admin' | 'shop_owner';
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

// Session management
export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_USER_KEY = 'auth_user';
export const AUTH_EXPIRES_KEY = 'auth_expires';

export function saveAuthSession(user: AuthUser, token: string = generateToken()): void {
  if (typeof window === 'undefined') return;
  
  const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days
  
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_EXPIRES_KEY, expiresAt.toString());
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  const expiresAtStr = localStorage.getItem(AUTH_EXPIRES_KEY);
  
  if (!token || !userStr || !expiresAtStr) return null;
  
  const expiresAt = parseInt(expiresAtStr);
  
  // Check if session expired
  if (Date.now() > expiresAt) {
    clearAuthSession();
    return null;
  }
  
  try {
    const user = JSON.parse(userStr) as AuthUser;
    return { user, token, expiresAt };
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_EXPIRES_KEY);
}

export function isAuthenticated(): boolean {
  return getAuthSession() !== null;
}

export function getCurrentUser(): AuthUser | null {
  const session = getAuthSession();
  return session?.user || null;
}

export function hasRole(role: 'user' | 'admin' | 'shop_owner'): boolean {
  const user = getCurrentUser();
  return user?.role === role;
}

export function isAdmin(): boolean {
  return hasRole('admin');
}

export function isShopOwner(): boolean {
  return hasRole('shop_owner');
}

// Generate a simple token (in production, use JWT)
function generateToken(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
}

// Redirect helpers
export function getRedirectPath(role: 'user' | 'admin' | 'shop_owner'): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'shop_owner':
      return '/owner/dashboard';
    default:
      return '/';
  }
}
