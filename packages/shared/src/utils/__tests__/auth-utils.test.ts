import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  decodeToken,
  isTokenExpired,
  getTokenExpirationTime,
  storeToken,
  getStoredToken,
  removeToken,
  storeRefreshToken,
  getStoredRefreshToken,
  isValidTokenFormat,
  createAuthHeader,
  extractTokenFromHeader,
  getUserIdFromToken,
  type DecodedToken
} from "../auth-utils";

describe("auth-utils", () => {
  // Helper function to create a mock JWT token
  const createMockToken = (payload: any): string => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payloadStr = btoa(JSON.stringify(payload));
    const signature = "mock-signature";
    return `${header}.${payloadStr}.${signature}`;
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear console error spy
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("decodeToken", () => {
    it("should decode a valid JWT token", () => {
      const payload = { sub: "user123", exp: 1234567890, iat: 1234567800 };
      const token = createMockToken(payload);

      const decoded = decodeToken(token);

      expect(decoded).toEqual(payload);
    });

    it("should return null for invalid token format", () => {
      const invalidToken = "not.a.valid.token.format";

      const decoded = decodeToken(invalidToken);

      expect(decoded).toBeNull();
    });

    it("should return null for malformed token", () => {
      const malformedToken = "invalid-token";

      const decoded = decodeToken(malformedToken);

      expect(decoded).toBeNull();
    });

    it("should return null for token with invalid JSON", () => {
      const invalidToken = "header.{invalid-json}.signature";

      const decoded = decodeToken(invalidToken);

      expect(decoded).toBeNull();
    });
  });

  describe("isTokenExpired", () => {
    it("should return false for non-expired token", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const token = createMockToken({ exp: futureTime });

      const expired = isTokenExpired(token);

      expect(expired).toBe(false);
    });

    it("should return true for expired token", () => {
      const pastTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      const token = createMockToken({ exp: pastTime });

      const expired = isTokenExpired(token);

      expect(expired).toBe(true);
    });

    it("should return true for token without exp claim", () => {
      const token = createMockToken({ sub: "user123" });

      const expired = isTokenExpired(token);

      expect(expired).toBe(true);
    });

    it("should respect buffer time", () => {
      const closeTime = Math.floor(Date.now() / 1000) + 20; // 20 seconds from now
      const token = createMockToken({ exp: closeTime });

      // With 30 second buffer (default), should be considered expired
      expect(isTokenExpired(token)).toBe(true);

      // With 10 second buffer, should not be expired
      expect(isTokenExpired(token, 10)).toBe(false);
    });

    it("should work with decoded token object", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const decoded: DecodedToken = { exp: futureTime };

      const expired = isTokenExpired(decoded);

      expect(expired).toBe(false);
    });

    it("should return true for invalid token string", () => {
      const expired = isTokenExpired("invalid-token");

      expect(expired).toBe(true);
    });
  });

  describe("getTokenExpirationTime", () => {
    it("should return correct time remaining for valid token", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const token = createMockToken({ exp: futureTime });

      const remaining = getTokenExpirationTime(token);

      // Should be close to 1 hour (3600000 ms), allowing for small timing differences
      expect(remaining).toBeGreaterThan(3599000);
      expect(remaining).toBeLessThanOrEqual(3600000);
    });

    it("should return 0 for expired token", () => {
      const pastTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      const token = createMockToken({ exp: pastTime });

      const remaining = getTokenExpirationTime(token);

      expect(remaining).toBe(0);
    });

    it("should return 0 for token without exp claim", () => {
      const token = createMockToken({ sub: "user123" });

      const remaining = getTokenExpirationTime(token);

      expect(remaining).toBe(0);
    });

    it("should work with decoded token object", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const decoded: DecodedToken = { exp: futureTime };

      const remaining = getTokenExpirationTime(decoded);

      expect(remaining).toBeGreaterThan(3599000);
      expect(remaining).toBeLessThanOrEqual(3600000);
    });

    it("should return 0 for invalid token string", () => {
      const remaining = getTokenExpirationTime("invalid-token");

      expect(remaining).toBe(0);
    });
  });

  describe("storeToken and getStoredToken", () => {
    it("should store and retrieve token", () => {
      const token = createMockToken({ sub: "user123" });

      storeToken(token);
      const retrieved = getStoredToken();

      expect(retrieved).toBe(token);
    });

    it("should return null when no token is stored", () => {
      const retrieved = getStoredToken();

      expect(retrieved).toBeNull();
    });

    it("should overwrite existing token", () => {
      const token1 = createMockToken({ sub: "user123" });
      const token2 = createMockToken({ sub: "user456" });

      storeToken(token1);
      storeToken(token2);
      const retrieved = getStoredToken();

      expect(retrieved).toBe(token2);
    });
  });

  describe("removeToken", () => {
    it("should remove stored tokens", () => {
      const token = createMockToken({ sub: "user123" });
      const refreshToken = "refresh-token-123";

      storeToken(token);
      storeRefreshToken(refreshToken);

      removeToken();

      expect(getStoredToken()).toBeNull();
      expect(getStoredRefreshToken()).toBeNull();
    });

    it("should not throw error when removing non-existent token", () => {
      expect(() => removeToken()).not.toThrow();
    });
  });

  describe("storeRefreshToken and getStoredRefreshToken", () => {
    it("should store and retrieve refresh token", () => {
      const refreshToken = "refresh-token-123";

      storeRefreshToken(refreshToken);
      const retrieved = getStoredRefreshToken();

      expect(retrieved).toBe(refreshToken);
    });

    it("should return null when no refresh token is stored", () => {
      const retrieved = getStoredRefreshToken();

      expect(retrieved).toBeNull();
    });
  });

  describe("isValidTokenFormat", () => {
    it("should return true for valid JWT format", () => {
      const token = createMockToken({ sub: "user123" });

      const valid = isValidTokenFormat(token);

      expect(valid).toBe(true);
    });

    it("should return false for invalid format", () => {
      expect(isValidTokenFormat("invalid-token")).toBe(false);
      expect(isValidTokenFormat("only.two")).toBe(false);
      expect(isValidTokenFormat("too.many.parts.here")).toBe(false);
    });

    it("should return false for empty or null input", () => {
      expect(isValidTokenFormat("")).toBe(false);
      // @ts-ignore - testing invalid input
      expect(isValidTokenFormat(null)).toBe(false);
      // @ts-ignore - testing invalid input
      expect(isValidTokenFormat(undefined)).toBe(false);
    });
  });

  describe("createAuthHeader", () => {
    it("should create Bearer auth header by default", () => {
      const token = "test-token-123";

      const header = createAuthHeader(token);

      expect(header).toBe("Bearer test-token-123");
    });

    it("should support custom token type", () => {
      const token = "test-token-123";

      const header = createAuthHeader(token, "Custom");

      expect(header).toBe("Custom test-token-123");
    });
  });

  describe("extractTokenFromHeader", () => {
    it("should extract token from Bearer header", () => {
      const header = "Bearer test-token-123";

      const token = extractTokenFromHeader(header);

      expect(token).toBe("test-token-123");
    });

    it("should be case-insensitive for bearer", () => {
      const header = "bearer test-token-123";

      const token = extractTokenFromHeader(header);

      expect(token).toBe("test-token-123");
    });

    it("should return null for invalid header format", () => {
      expect(extractTokenFromHeader("InvalidFormat")).toBeNull();
      expect(extractTokenFromHeader("")).toBeNull();
      // @ts-ignore - testing invalid input
      expect(extractTokenFromHeader(null)).toBeNull();
      // @ts-ignore - testing invalid input
      expect(extractTokenFromHeader(undefined)).toBeNull();
    });

    it("should return null for non-Bearer header", () => {
      const header = "Basic some-credentials";

      const token = extractTokenFromHeader(header);

      expect(token).toBeNull();
    });
  });

  describe("getUserIdFromToken", () => {
    it("should extract user ID from token", () => {
      const token = createMockToken({ sub: "user123", exp: 1234567890 });

      const userId = getUserIdFromToken(token);

      expect(userId).toBe("user123");
    });

    it("should return null when sub claim is missing", () => {
      const token = createMockToken({ exp: 1234567890 });

      const userId = getUserIdFromToken(token);

      expect(userId).toBeNull();
    });

    it("should work with decoded token object", () => {
      const decoded: DecodedToken = { sub: "user456" };

      const userId = getUserIdFromToken(decoded);

      expect(userId).toBe("user456");
    });

    it("should return null for invalid token", () => {
      const userId = getUserIdFromToken("invalid-token");

      expect(userId).toBeNull();
    });
  });

  describe("edge cases and error handling", () => {
    it("should handle localStorage being unavailable", () => {
      const originalLocalStorage = global.localStorage;
      // @ts-ignore
      delete global.localStorage;

      expect(() => storeToken("token")).not.toThrow();
      expect(() => getStoredToken()).not.toThrow();
      expect(() => removeToken()).not.toThrow();
      expect(getStoredToken()).toBeNull();

      global.localStorage = originalLocalStorage;
    });

    it("should handle base64 decoding errors gracefully", () => {
      // Token with invalid base64 in payload
      const invalidToken = "header.!!!invalid-base64!!!.signature";

      const decoded = decodeToken(invalidToken);

      expect(decoded).toBeNull();
    });

    it("should handle tokens with extra claims", () => {
      const payload = {
        sub: "user123",
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
        custom: "value",
        role: "admin",
        permissions: ["read", "write"]
      };
      const token = createMockToken(payload);

      const decoded = decodeToken(token);

      expect(decoded).toEqual(payload);
      expect(decoded?.custom).toBe("value");
      expect(decoded?.role).toBe("admin");
    });
  });
});
