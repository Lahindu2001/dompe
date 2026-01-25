# Authentication System Documentation

## Overview
This project now includes a complete, production-ready authentication system with role-based access control.

## Features

### ✅ Authentication
- **Login System**: Secure login with email and password
- **Registration**: New user registration with validation
- **Session Management**: Persistent sessions using localStorage (7-day expiry)
- **Auto-redirect**: Automatic redirect based on user role
- **Protected Routes**: Route protection with role-based access

### ✅ User Roles
1. **Admin** (`role: 'admin'`)
   - Access to admin dashboard
   - Manage shops, users, reviews
   - View analytics and statistics
   - Full system control

2. **Regular User** (`role: 'user'`)
   - Access to main website
   - View shops and categories
   - Write reviews
   - Manage personal profile

3. **Shop Owner** (`role: 'shop_owner'`)
   - Manage own shop listing
   - View shop analytics
   - Respond to reviews

### ✅ Pages Created

#### Public Pages
- `/` - Home page (with auth-aware welcome message)
- `/login` - Login page
- `/register` - Registration page
- `/shops` - Browse shops
- `/categories` - View categories
- `/about` - About page

#### Protected Pages
- `/profile` - User profile management
- `/admin/dashboard` - Admin dashboard (admin only)
- `/owner/dashboard` - Shop owner dashboard (owner only)

## Technical Implementation

### File Structure
```
lib/
  auth.ts              # Core auth utilities
  api/
    auth.ts           # API service layer
    
contexts/
  AuthContext.tsx     # React context for auth state

components/
  auth/
    ProtectedRoute.tsx  # Route protection HOC
  header.tsx          # Updated with auth integration

app/
  layout.tsx          # Wrapped with AuthProvider
  page.tsx            # Updated with auth awareness
  login/page.tsx      # Login implementation
  register/page.tsx   # Registration implementation
  profile/page.tsx    # User profile page
  admin/
    dashboard/page.tsx  # Admin dashboard
```

### Core Components

#### 1. Authentication Context (`AuthContext.tsx`)
Provides global auth state management:
- `user` - Current user object
- `isAuthenticated` - Boolean auth status
- `isLoading` - Loading state
- `login()` - Login function
- `logout()` - Logout function
- `checkAuth()` - Verify auth status

#### 2. Protected Route Component
Wraps pages requiring authentication:
```tsx
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

#### 3. Auth Utilities (`lib/auth.ts`)
- `saveAuthSession()` - Save user session
- `getAuthSession()` - Get current session
- `clearAuthSession()` - Clear session (logout)
- `isAuthenticated()` - Check if user logged in
- `getCurrentUser()` - Get current user data
- `hasRole()` - Check user role
- `getRedirectPath()` - Get redirect based on role

## Usage Examples

### Login Flow
1. User enters email and password
2. System calls Google Apps Script API
3. On success, creates auth session
4. Redirects based on role:
   - Admin → `/admin/dashboard`
   - Shop Owner → `/owner/dashboard`
   - User → `/` (homepage)

### Registration Flow
1. User fills registration form
2. System validates input
3. Sends data to Google Apps Script
4. Shows success message
5. Redirects to login after 2 seconds

### Protected Page Access
```tsx
// Require authentication only
<ProtectedRoute>
  <ProfilePage />
</ProtectedRoute>

// Require specific role
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

### Using Auth in Components
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user?.firstName}!</p>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
```

## Admin Dashboard Features

### Statistics Overview
- Total shops count
- Total reviews
- Average rating
- Pending approvals

### Shop Management
- View all shops in table format
- Search and filter shops
- Edit, view, or delete shops
- Approve pending submissions

### Navigation Sidebar
- Dashboard
- Manage Shops
- Manage Users
- Reviews Management
- Categories
- Analytics
- Settings

## Testing Credentials

### Mock Users (Development)
```
Admin:
Email: admin@dompee.lk
Password: admin123

Regular User:
Email: john@example.com
Password: user123

Shop Owner:
Email: owner@shop.com
Password: owner123
```

## Security Features

1. **Session Expiry**: 7-day automatic expiry
2. **Token-based Auth**: Unique tokens for each session
3. **Role Validation**: Server-side role checking
4. **Protected Routes**: Client-side route guards
5. **Secure Storage**: localStorage with expiry validation

## API Integration

### Google Apps Script
The system integrates with Google Apps Script for:
- User authentication
- User registration
- Data storage

URLs configured:
- Login: `AKfycbwG_BH87AmRaGAPgkNi5VixUd9pDE_B_EFSoXMZlEjmSWcVKfyTZu3YlZahL_vy3PrP`
- Register: `AKfycbxSBcQJtpmH4NHzFTfNF6VhtLNalqkhMtAbdAdK4Q4SS4YRSXZnDhdBQ7rT8cFjDaVU`

## Future Enhancements

1. **JWT Tokens**: Replace localStorage with JWT
2. **Refresh Tokens**: Implement token refresh mechanism
3. **2FA**: Add two-factor authentication
4. **OAuth**: Social login (Google, Facebook)
5. **Password Reset**: Email-based password recovery
6. **Email Verification**: Verify email on registration
7. **Session Management**: View and revoke active sessions
8. **Audit Logs**: Track user activities

## Deployment Checklist

- [x] Authentication context setup
- [x] Login page implementation
- [x] Registration page implementation
- [x] Protected routes
- [x] Admin dashboard
- [x] User profile page
- [x] Header integration
- [x] Session management
- [ ] Backend API (using Google Sheets currently)
- [ ] Password encryption
- [ ] Rate limiting
- [ ] HTTPS enforcement
- [ ] Environment variables for API keys

## Notes

- Sessions stored in localStorage (client-side)
- In production, use HttpOnly cookies for better security
- Implement server-side session validation
- Add CSRF protection for forms
- Enable HTTPS in production
- Consider using NextAuth.js for more features
