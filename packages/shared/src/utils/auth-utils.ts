/**
 * Authentication utilities for token management and validation
 * @module auth-utils
 */

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  tokenType?: string;
}

export interface DecodedToken {
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

const TOKEN_STORAGE_KEY = "vibe_auth_token";
const REFRESH_TOKEN_STORAGE_KEY = "vibe_refresh_token";

/**
 * Decodes a JWT token without verification
 * @param token - JWT token string
 * @returns Decoded token payload or null if invalid
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

/**
 * Checks if a token is expired
 * @param token - JWT token string or decoded token
 * @param bufferSeconds - Buffer time in seconds before actual expiration (default: 30)
 * @returns True if token is expired or invalid
 */
export function isTokenExpired(token: string | DecodedToken, bufferSeconds = 30): boolean {
  try {
    const decoded = typeof token === "string" ? decodeToken(token) : token;

    if (!decoded || !decoded.exp) {
      return true;
    }

    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const bufferTime = bufferSeconds * 1000;

    return currentTime >= expirationTime - bufferTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
}

/**
 * Gets the time remaining until token expiration
 * @param token - JWT token string or decoded token
 * @returns Time remaining in milliseconds, or 0 if expired/invalid
 */
export function getTokenExpirationTime(token: string | DecodedToken): number {
  try {
    const decoded = typeof token === "string" ? decodeToken(token) : token;

    if (!decoded || !decoded.exp) {
      return 0;
    }

    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const remaining = expirationTime - currentTime;

    return remaining > 0 ? remaining : 0;
  } catch (error) {
    console.error("Error getting token expiration time:", error);
    return 0;
  }
}

/**
 * Stores authentication token in localStorage
 * @param token - Authentication token to store
 */
export function storeToken(token: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  } catch (error) {
    console.error("Error storing token:", error);
  }
}

/**
 * Retrieves authentication token from localStorage
 * @returns Stored token or null if not found
 */
export function getStoredToken(): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    }
    return null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

/**
 * Removes authentication token from localStorage
 */
export function removeToken(): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Error removing token:", error);
  }
}

/**
 * Stores refresh token in localStorage
 * @param refreshToken - Refresh token to store
 */
export function storeRefreshToken(refreshToken: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    }
  } catch (error) {
    console.error("Error storing refresh token:", error);
  }
}

/**
 * Retrieves refresh token from localStorage
 * @returns Stored refresh token or null if not found
 */
export function getStoredRefreshToken(): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    }
    return null;
  } catch (error) {
    console.error("Error retrieving refresh token:", error);
    return null;
  }
}

/**
 * Validates token format (basic JWT structure check)
 * @param token - Token string to validate
 * @returns True if token has valid JWT format
 */
export function isValidTokenFormat(token: string): boolean {
  if (!token || typeof token !== "string") {
    return false;
  }

  const parts = token.split(".");
  return parts.length === 3;
}

/**
 * Creates an authorization header value
 * @param token - Authentication token
 * @param tokenType - Token type (default: "Bearer")
 * @returns Authorization header value
 */
export function createAuthHeader(token: string, tokenType = "Bearer"): string {
  return `${tokenType} ${token}`;
}

/**
 * Extracts token from authorization header
 * @param authHeader - Authorization header value
 * @returns Extracted token or null
 */
export function extractTokenFromHeader(authHeader: string): string | null {
  if (!authHeader || typeof authHeader !== "string") {
    return null;
  }

  const parts = authHeader.split(" ");
  if (parts.length === 2 && (parts[0] === "Bearer" || parts[0] === "bearer")) {
    return parts[1];
  }

  return null;
}

/**
 * Gets user ID from token
 * @param token - JWT token string or decoded token
 * @returns User ID or null if not found
 */
export function getUserIdFromToken(token: string | DecodedToken): string | null {
  try {
    const decoded = typeof token === "string" ? decodeToken(token) : token;
    return decoded?.sub || null;
  } catch (error) {
    console.error("Error getting user ID from token:", error);
    return null;
  }
}
