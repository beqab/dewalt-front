/**
 * Token management utilities
 */

export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  },

  getTokenExpiresAt: (): Date | null => {
    if (typeof window === "undefined") return null;
    const expiresAt = localStorage.getItem("tokenExpiresAt");
    return expiresAt ? new Date(expiresAt) : null;
  },

  setTokens: (accessToken: string, refreshToken: string, expiresAt: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("tokenExpiresAt", expiresAt);
  },

  clearTokens: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiresAt");
    localStorage.removeItem("user");
  },

  isTokenExpired: (): boolean => {
    const expiresAt = tokenManager.getTokenExpiresAt();
    if (!expiresAt) return true;
    return new Date() >= expiresAt;
  },

  shouldRefreshToken: (): boolean => {
    const expiresAt = tokenManager.getTokenExpiresAt();
    if (!expiresAt) return false;
    // Refresh if token expires in less than 5 minutes
    const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000);
    return expiresAt <= fiveMinutesFromNow;
  },
};


