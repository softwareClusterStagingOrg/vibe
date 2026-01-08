# Authentication Module

Comprehensive authentication utilities and React hooks for managing JWT tokens and authentication state in Vibe applications.

## Features

- 🔐 JWT token encoding/decoding
- ⏰ Token expiration checking and monitoring
- 💾 Token persistence (localStorage)
- 🔄 Automatic token refresh
- 🪝 React hooks for authentication state management
- 📝 Full TypeScript support
- ✅ Comprehensive test coverage

## Installation

The authentication module is part of `@vibe/shared`. If you're using other Vibe packages, you likely already have it installed.

```bash
npm install @vibe/shared
# or
yarn add @vibe/shared
```

## Usage

### Basic Authentication Hook

```typescript
import { useAuth } from "@vibe/shared";

function MyComponent() {
  const { 
    token, 
    isAuthenticated, 
    setToken, 
    clearToken 
  } = useAuth();

  const handleLogin = async () => {
    const response = await loginAPI();
    setToken(response.accessToken, response.refreshToken);
  };

  const handleLogout = () => {
    clearToken();
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
```

### Auto-Refresh Token

```typescript
import { useAuth } from "@vibe/shared";

function App() {
  const { isAuthenticated } = useAuth({
    // Auto-refresh token 5 minutes before expiration
    autoRefreshBuffer: 300,
    
    // Callback to refresh token
    onRefresh: async (refreshToken) => {
      const response = await fetch("/api/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.accessToken;
      }
      
      return null;
    },
    
    // Callback when token expires
    onExpire: () => {
      console.log("Token expired, redirecting to login...");
      window.location.href = "/login";
    },
  });

  return <YourApp />;
}
```

### Token Utilities

```typescript
import {
  decodeToken,
  isTokenExpired,
  getTokenExpirationTime,
  storeToken,
  getStoredToken,
  removeToken,
  createAuthHeader,
  getUserIdFromToken,
} from "@vibe/shared";

// Decode a JWT token
const decoded = decodeToken(token);
console.log(decoded.sub); // User ID

// Check if token is expired
if (isTokenExpired(token)) {
  console.log("Token is expired");
}

// Get remaining time
const remaining = getTokenExpirationTime(token);
console.log(`Token expires in ${remaining}ms`);

// Store token
storeToken(accessToken);
storeRefreshToken(refreshToken);

// Retrieve token
const storedToken = getStoredToken();

// Create authorization header
const authHeader = createAuthHeader(token); // "Bearer <token>"

// Extract user ID
const userId = getUserIdFromToken(token);

// Clear tokens
removeToken();
```

### Advanced Usage - Making Authenticated API Calls

```typescript
import { useAuth, createAuthHeader } from "@vibe/shared";

function useAuthenticatedAPI() {
  const { token, isAuthenticated } = useAuth();

  const fetchAPI = async (url: string, options: RequestInit = {}) => {
    if (!isAuthenticated || !token) {
      throw new Error("Not authenticated");
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: createAuthHeader(token),
      },
    });
  };

  return { fetchAPI, isAuthenticated };
}

// Usage in component
function UserProfile() {
  const { fetchAPI } = useAuthenticatedAPI();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchAPI("/api/user/profile")
      .then(res => res.json())
      .then(setUser);
  }, []);

  return <div>{user?.name}</div>;
}
```

## API Reference

### `useAuth(options?)`

React hook for managing authentication state.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `onRefresh` | `(refreshToken: string) => Promise<string \| null>` | `undefined` | Callback to refresh expired token |
| `onExpire` | `() => void` | `undefined` | Callback when token expires |
| `autoRefreshBuffer` | `number` | `300` | Seconds before expiration to auto-refresh |

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `token` | `string \| null` | Current authentication token |
| `decodedToken` | `DecodedToken \| null` | Decoded token payload |
| `isAuthenticated` | `boolean` | Whether user is authenticated |
| `isExpired` | `boolean` | Whether token is expired |
| `expirationTime` | `number` | Time remaining until expiration (ms) |
| `setToken` | `(token: string, refreshToken?: string) => void` | Set authentication token |
| `clearToken` | `() => void` | Clear authentication token |
| `refreshToken` | `() => Promise<boolean>` | Manually refresh token |
| `getRefreshToken` | `() => string \| null` | Get stored refresh token |

### Token Utilities

#### `decodeToken(token: string): DecodedToken | null`

Decodes a JWT token without verification.

#### `isTokenExpired(token: string | DecodedToken, bufferSeconds?: number): boolean`

Checks if a token is expired. Default buffer: 30 seconds.

#### `getTokenExpirationTime(token: string | DecodedToken): number`

Returns time remaining until expiration in milliseconds.

#### `storeToken(token: string): void`

Stores authentication token in localStorage.

#### `getStoredToken(): string | null`

Retrieves stored authentication token.

#### `removeToken(): void`

Removes authentication tokens from storage.

#### `storeRefreshToken(refreshToken: string): void`

Stores refresh token in localStorage.

#### `getStoredRefreshToken(): string | null`

Retrieves stored refresh token.

#### `isValidTokenFormat(token: string): boolean`

Validates JWT token format (basic structure check).

#### `createAuthHeader(token: string, tokenType?: string): string`

Creates authorization header value (default: "Bearer").

#### `extractTokenFromHeader(authHeader: string): string | null`

Extracts token from authorization header.

#### `getUserIdFromToken(token: string | DecodedToken): string | null`

Extracts user ID from token's `sub` claim.

## Types

```typescript
interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  tokenType?: string;
}

interface DecodedToken {
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

interface UseAuthOptions {
  onRefresh?: (refreshToken: string) => Promise<string | null>;
  onExpire?: () => void;
  autoRefreshBuffer?: number;
}

interface UseAuthReturn {
  token: string | null;
  decodedToken: DecodedToken | null;
  isAuthenticated: boolean;
  isExpired: boolean;
  expirationTime: number;
  setToken: (token: string, refreshToken?: string) => void;
  clearToken: () => void;
  refreshToken: () => Promise<boolean>;
  getRefreshToken: () => string | null;
}
```

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage. For highly sensitive applications, consider using httpOnly cookies or sessionStorage.

2. **Token Validation**: This module performs basic JWT structure validation but does NOT verify token signatures. Always verify tokens on the server side.

3. **HTTPS**: Always use HTTPS in production to prevent token interception.

4. **Token Expiration**: Set appropriate token expiration times on your authentication server.

5. **Refresh Tokens**: Keep refresh tokens secure and rotate them regularly.

## Testing

The authentication module includes comprehensive test coverage. To run tests:

```bash
# In the monorepo root
yarn test packages/shared

# Or in the shared package
cd packages/shared
yarn test
```

## Examples

### Login Flow

```typescript
function LoginPage() {
  const { setToken } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        setToken(accessToken, refreshToken);
        // Redirect to dashboard
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

### Protected Route

```typescript
import { useAuth } from "@vibe/shared";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isExpired } = useAuth();

  if (!isAuthenticated || isExpired) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
```

### Token Refresh Interceptor

```typescript
import { useAuth, createAuthHeader } from "@vibe/shared";

function useAuthenticatedFetch() {
  const { token, refreshToken, setToken } = useAuth();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: createAuthHeader(token!),
      },
    });

    // If unauthorized, try to refresh token
    if (response.status === 401) {
      const refreshed = await refreshToken();
      
      if (refreshed) {
        // Retry request with new token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: createAuthHeader(token!),
          },
        });
      }
    }

    return response;
  };

  return fetchWithAuth;
}
```

## Troubleshooting

### Token not persisting

Ensure localStorage is available and not blocked by browser settings or extensions.

### Auto-refresh not working

1. Verify `onRefresh` callback is provided
2. Check that refresh token is stored
3. Ensure `autoRefreshBuffer` is set appropriately

### Token appears expired immediately

Check that token expiration time (`exp` claim) is in Unix timestamp format (seconds since epoch, not milliseconds).

## Contributing

This module is part of the Vibe Design System. For contribution guidelines, see the [main repository](https://github.com/mondaycom/vibe).

## License

MIT © monday.com
