import { useState, useEffect, useCallback } from "react";
import {
  getStoredToken,
  storeToken,
  removeToken,
  isTokenExpired,
  getTokenExpirationTime,
  decodeToken,
  storeRefreshToken,
  getStoredRefreshToken,
  type DecodedToken,
  type AuthToken
} from "../utils/auth-utils";

export interface UseAuthOptions {
  /**
   * Callback function to refresh the token
   * @param refreshToken - The refresh token to use
   * @returns New access token or null if refresh failed
   */
  onRefresh?: (refreshToken: string) => Promise<string | null>;
  /**
   * Callback when token expires
   */
  onExpire?: () => void;
  /**
   * Auto-refresh token before expiration (in seconds before expiry)
   */
  autoRefreshBuffer?: number;
}

export interface UseAuthReturn {
  /**
   * Current authentication token
   */
  token: string | null;
  /**
   * Decoded token payload
   */
  decodedToken: DecodedToken | null;
  /**
   * Whether user is authenticated
   */
  isAuthenticated: boolean;
  /**
   * Whether token is expired
   */
  isExpired: boolean;
  /**
   * Time remaining until expiration (in milliseconds)
   */
  expirationTime: number;
  /**
   * Set a new authentication token
   */
  setToken: (token: string, refreshToken?: string) => void;
  /**
   * Clear authentication token
   */
  clearToken: () => void;
  /**
   * Manually refresh the token
   */
  refreshToken: () => Promise<boolean>;
  /**
   * Get the current refresh token
   */
  getRefreshToken: () => string | null;
}

/**
 * Custom hook for managing authentication state
 * @param options - Configuration options
 * @returns Authentication state and methods
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { onRefresh, onExpire, autoRefreshBuffer = 300 } = options; // 5 minutes default buffer

  const [token, setTokenState] = useState<string | null>(() => getStoredToken());
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(() => {
    const storedToken = getStoredToken();
    return storedToken ? decodeToken(storedToken) : null;
  });

  const [isExpired, setIsExpired] = useState<boolean>(() => {
    const storedToken = getStoredToken();
    return storedToken ? isTokenExpired(storedToken, 0) : false;
  });

  const [expirationTime, setExpirationTime] = useState<number>(() => {
    const storedToken = getStoredToken();
    return storedToken ? getTokenExpirationTime(storedToken) : 0;
  });

  // Update token and related state
  const setToken = useCallback((newToken: string, refreshToken?: string) => {
    storeToken(newToken);
    if (refreshToken) {
      storeRefreshToken(refreshToken);
    }
    setTokenState(newToken);
    setDecodedToken(decodeToken(newToken));
    setIsExpired(isTokenExpired(newToken, 0));
    setExpirationTime(getTokenExpirationTime(newToken));
  }, []);

  // Clear token and related state
  const clearToken = useCallback(() => {
    removeToken();
    setTokenState(null);
    setDecodedToken(null);
    setIsExpired(false);
    setExpirationTime(0);
  }, []);

  // Get refresh token
  const getRefreshToken = useCallback(() => {
    return getStoredRefreshToken();
  }, []);

  // Refresh token function
  const refreshTokenFn = useCallback(async (): Promise<boolean> => {
    if (!onRefresh) {
      return false;
    }

    const currentRefreshToken = getStoredRefreshToken();
    if (!currentRefreshToken) {
      return false;
    }

    try {
      const newToken = await onRefresh(currentRefreshToken);
      if (newToken) {
        setToken(newToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  }, [onRefresh, setToken]);

  // Monitor token expiration
  useEffect(() => {
    if (!token) {
      return;
    }

    // Check expiration periodically
    const checkExpiration = () => {
      const expired = isTokenExpired(token, 0);
      const timeRemaining = getTokenExpirationTime(token);

      setIsExpired(expired);
      setExpirationTime(timeRemaining);

      if (expired && onExpire) {
        onExpire();
      }
    };

    // Check immediately
    checkExpiration();

    // Set up interval to check every minute
    const intervalId = setInterval(checkExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [token, onExpire]);

  // Auto-refresh token before expiration
  useEffect(() => {
    if (!token || !onRefresh || !autoRefreshBuffer) {
      return;
    }

    const timeRemaining = getTokenExpirationTime(token);
    const bufferMs = autoRefreshBuffer * 1000;

    // If token will expire within buffer time, refresh now
    if (timeRemaining > 0 && timeRemaining <= bufferMs) {
      refreshTokenFn();
      return;
    }

    // Schedule refresh before expiration
    if (timeRemaining > bufferMs) {
      const refreshTime = timeRemaining - bufferMs;
      const timeoutId = setTimeout(() => {
        refreshTokenFn();
      }, refreshTime);

      return () => clearTimeout(timeoutId);
    }
  }, [token, onRefresh, autoRefreshBuffer, refreshTokenFn]);

  const isAuthenticated = !!token && !isExpired;

  return {
    token,
    decodedToken,
    isAuthenticated,
    isExpired,
    expirationTime,
    setToken,
    clearToken,
    refreshToken: refreshTokenFn,
    getRefreshToken
  };
}
