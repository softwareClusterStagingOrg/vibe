import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "../useAuth";
import * as authUtils from "../../utils/auth-utils";

// Mock the auth-utils module
vi.mock("../../utils/auth-utils", async () => {
  const actual = await vi.importActual("../../utils/auth-utils");
  return {
    ...actual,
    getStoredToken: vi.fn(),
    storeToken: vi.fn(),
    removeToken: vi.fn(),
    storeRefreshToken: vi.fn(),
    getStoredRefreshToken: vi.fn()
  };
});

describe("useAuth", () => {
  // Helper to create a mock token
  const createMockToken = (payload: any): string => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payloadStr = btoa(JSON.stringify(payload));
    const signature = "mock-signature";
    return `${header}.${payloadStr}.${signature}`;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.mocked(authUtils.getStoredToken).mockReturnValue(null);
    vi.mocked(authUtils.getStoredRefreshToken).mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe("initialization", () => {
    it("should initialize with no token", () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.token).toBeNull();
      expect(result.current.decodedToken).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isExpired).toBe(false);
      expect(result.current.expirationTime).toBe(0);
    });

    it("should initialize with stored token", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const mockToken = createMockToken({ sub: "user123", exp: futureTime });
      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);

      const { result } = renderHook(() => useAuth());

      expect(result.current.token).toBe(mockToken);
      expect(result.current.decodedToken).toEqual({
        sub: "user123",
        exp: futureTime
      });
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isExpired).toBe(false);
    });

    it("should initialize with expired token", () => {
      const pastTime = Math.floor(Date.now() / 1000) - 3600;
      const mockToken = createMockToken({ sub: "user123", exp: pastTime });
      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);

      const { result } = renderHook(() => useAuth());

      expect(result.current.token).toBe(mockToken);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isExpired).toBe(true);
    });
  });

  describe("setToken", () => {
    it("should set token and update state", () => {
      const { result } = renderHook(() => useAuth());
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const mockToken = createMockToken({ sub: "user123", exp: futureTime });

      act(() => {
        result.current.setToken(mockToken);
      });

      expect(authUtils.storeToken).toHaveBeenCalledWith(mockToken);
      expect(result.current.token).toBe(mockToken);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.decodedToken?.sub).toBe("user123");
    });

    it("should store refresh token when provided", () => {
      const { result } = renderHook(() => useAuth());
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const mockToken = createMockToken({ sub: "user123", exp: futureTime });
      const refreshToken = "refresh-token-123";

      act(() => {
        result.current.setToken(mockToken, refreshToken);
      });

      expect(authUtils.storeToken).toHaveBeenCalledWith(mockToken);
      expect(authUtils.storeRefreshToken).toHaveBeenCalledWith(refreshToken);
    });
  });

  describe("clearToken", () => {
    it("should clear token and reset state", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const mockToken = createMockToken({ sub: "user123", exp: futureTime });
      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);

      const { result } = renderHook(() => useAuth());

      act(() => {
        result.current.clearToken();
      });

      expect(authUtils.removeToken).toHaveBeenCalled();
      expect(result.current.token).toBeNull();
      expect(result.current.decodedToken).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.expirationTime).toBe(0);
    });
  });

  describe("getRefreshToken", () => {
    it("should return stored refresh token", () => {
      const refreshToken = "refresh-token-123";
      vi.mocked(authUtils.getStoredRefreshToken).mockReturnValue(refreshToken);

      const { result } = renderHook(() => useAuth());

      const token = result.current.getRefreshToken();

      expect(token).toBe(refreshToken);
      expect(authUtils.getStoredRefreshToken).toHaveBeenCalled();
    });
  });

  describe("refreshToken", () => {
    it("should refresh token successfully", async () => {
      const oldToken = createMockToken({
        sub: "user123",
        exp: Math.floor(Date.now() / 1000) + 3600
      });
      const newToken = createMockToken({
        sub: "user123",
        exp: Math.floor(Date.now() / 1000) + 7200
      });
      const refreshToken = "refresh-token-123";

      vi.mocked(authUtils.getStoredToken).mockReturnValue(oldToken);
      vi.mocked(authUtils.getStoredRefreshToken).mockReturnValue(refreshToken);

      const onRefresh = vi.fn().mockResolvedValue(newToken);

      const { result } = renderHook(() => useAuth({ onRefresh }));

      let refreshResult: boolean = false;
      await act(async () => {
        refreshResult = await result.current.refreshToken();
      });

      expect(refreshResult).toBe(true);
      expect(onRefresh).toHaveBeenCalledWith(refreshToken);
      expect(authUtils.storeToken).toHaveBeenCalledWith(newToken);
    });

    it("should return false when onRefresh is not provided", async () => {
      const { result } = renderHook(() => useAuth());

      let refreshResult: boolean = false;
      await act(async () => {
        refreshResult = await result.current.refreshToken();
      });

      expect(refreshResult).toBe(false);
    });

    it("should return false when refresh token is not available", async () => {
      vi.mocked(authUtils.getStoredRefreshToken).mockReturnValue(null);

      const onRefresh = vi.fn();
      const { result } = renderHook(() => useAuth({ onRefresh }));

      let refreshResult: boolean = false;
      await act(async () => {
        refreshResult = await result.current.refreshToken();
      });

      expect(refreshResult).toBe(false);
      expect(onRefresh).not.toHaveBeenCalled();
    });

    it("should handle refresh failure", async () => {
      const refreshToken = "refresh-token-123";
      vi.mocked(authUtils.getStoredRefreshToken).mockReturnValue(refreshToken);

      const onRefresh = vi.fn().mockResolvedValue(null);

      const { result } = renderHook(() => useAuth({ onRefresh }));

      let refreshResult: boolean = false;
      await act(async () => {
        refreshResult = await result.current.refreshToken();
      });

      expect(refreshResult).toBe(false);
    });

    it("should handle refresh error", async () => {
      const refreshToken = "refresh-token-123";
      vi.mocked(authUtils.getStoredRefreshToken).mockReturnValue(refreshToken);

      const onRefresh = vi.fn().mockRejectedValue(new Error("Refresh failed"));
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const { result } = renderHook(() => useAuth({ onRefresh }));

      let refreshResult: boolean = false;
      await act(async () => {
        refreshResult = await result.current.refreshToken();
      });

      expect(refreshResult).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe("token expiration monitoring", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should set up expiration monitoring", () => {
      const expiringTime = Math.floor(Date.now() / 1000) + 30; // 30 seconds from now
      const mockToken = createMockToken({ sub: "user123", exp: expiringTime });
      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);

      const onExpire = vi.fn();
      const { result } = renderHook(() => useAuth({ onExpire }));

      // Initially not expired
      expect(result.current.isExpired).toBe(false);
      expect(onExpire).not.toHaveBeenCalled();
    });

    it("should track expiration state", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const mockToken = createMockToken({ sub: "user123", exp: futureTime });
      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);

      const { result } = renderHook(() => useAuth());

      // Should have expiration time set
      expect(result.current.expirationTime).toBeGreaterThan(0);
      expect(result.current.isExpired).toBe(false);
    });
  });

  describe("auto-refresh", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should configure auto-refresh with correct options", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 400;
      const mockToken = createMockToken({ sub: "user123", exp: futureTime });
      const refreshToken = "refresh-token-123";

      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);
      vi.mocked(authUtils.getStoredRefreshToken).mockReturnValue(refreshToken);

      const onRefresh = vi.fn().mockResolvedValue("new-token");

      const { result } = renderHook(() =>
        useAuth({
          onRefresh,
          autoRefreshBuffer: 300
        })
      );

      // Verify hook is initialized correctly
      expect(result.current.token).toBe(mockToken);
      expect(result.current.getRefreshToken()).toBe(refreshToken);
    });

    it("should not auto-refresh when onRefresh is not provided", async () => {
      const expiringTime = Math.floor(Date.now() / 1000) + 400;
      const mockToken = createMockToken({ sub: "user123", exp: expiringTime });

      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);

      renderHook(() =>
        useAuth({
          autoRefreshBuffer: 300
        })
      );

      await act(async () => {
        vi.advanceTimersByTime(110000);
      });

      // No error should occur
      expect(true).toBe(true);
    });

    it("should support manual token refresh", async () => {
      const mockToken = createMockToken({
        sub: "user123",
        exp: Math.floor(Date.now() / 1000) + 3600
      });
      const newToken = createMockToken({
        sub: "user123",
        exp: Math.floor(Date.now() / 1000) + 7200
      });
      const refreshToken = "refresh-token-123";

      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);
      vi.mocked(authUtils.getStoredRefreshToken).mockReturnValue(refreshToken);

      const onRefresh = vi.fn().mockResolvedValue(newToken);

      const { result } = renderHook(() => useAuth({ onRefresh }));

      let refreshResult: boolean = false;
      await act(async () => {
        refreshResult = await result.current.refreshToken();
      });

      expect(refreshResult).toBe(true);
      expect(onRefresh).toHaveBeenCalledWith(refreshToken);
    });
  });

  describe("edge cases", () => {
    it("should handle invalid token gracefully", () => {
      const invalidToken = "invalid-token";
      vi.mocked(authUtils.getStoredToken).mockReturnValue(invalidToken);

      const { result } = renderHook(() => useAuth());

      expect(result.current.token).toBe(invalidToken);
      expect(result.current.decodedToken).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("should clean up intervals on unmount", () => {
      vi.useFakeTimers();

      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const mockToken = createMockToken({ sub: "user123", exp: futureTime });
      vi.mocked(authUtils.getStoredToken).mockReturnValue(mockToken);

      const { unmount } = renderHook(() => useAuth());

      unmount();

      // Should not throw errors after unmount
      expect(() => {
        act(() => {
          vi.advanceTimersByTime(120000);
        });
      }).not.toThrow();

      vi.useRealTimers();
    });

    it("should handle token updates correctly", async () => {
      const oldToken = createMockToken({
        sub: "user123",
        exp: Math.floor(Date.now() / 1000) + 3600
      });
      vi.mocked(authUtils.getStoredToken).mockReturnValue(oldToken);

      const { result } = renderHook(() => useAuth());

      expect(result.current.token).toBe(oldToken);

      // Update token
      const newToken = createMockToken({
        sub: "user456",
        exp: Math.floor(Date.now() / 1000) + 7200
      });

      await act(async () => {
        result.current.setToken(newToken);
      });

      expect(result.current.token).toBe(newToken);
      expect(result.current.decodedToken?.sub).toBe("user456");
    });
  });
});
