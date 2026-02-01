import { createApiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import {
  RegisterDto,
  LoginDto,
  AuthResponse,
  RequestPasswordResetDto,
  ResetPasswordDto,
  ChangePasswordDto,
  RefreshTokenResponse,
  User,
} from "../types";

const registerClient = createApiClient<AuthResponse>(API_ROUTES.AUTH_REGISTER);
const loginClient = createApiClient<AuthResponse>(API_ROUTES.AUTH_LOGIN);
const logoutClient = createApiClient<{ message: string }>(
  API_ROUTES.AUTH_LOGOUT
);
const refreshClient = createApiClient<RefreshTokenResponse>(
  API_ROUTES.AUTH_REFRESH
);
const meClient = createApiClient<User>(API_ROUTES.AUTH_ME);
const requestPasswordResetClient = createApiClient<{ message: string }>(
  API_ROUTES.AUTH_REQUEST_PASSWORD_RESET
);
const resetPasswordClient = createApiClient<{ message: string }>(
  API_ROUTES.AUTH_RESET_PASSWORD
);
const changePasswordClient = createApiClient<{ message: string }>(
  API_ROUTES.AUTH_CHANGE_PASSWORD
);
const verifyEmailClient = createApiClient<{ message: string }>(
  API_ROUTES.AUTH_VERIFY_EMAIL
);

export const authService = {
  register: {
    post: (data: RegisterDto) =>
      registerClient.post<RegisterDto, AuthResponse>(data),
  },
  login: {
    post: (data: LoginDto) => loginClient.post<LoginDto, AuthResponse>(data),
  },
  logout: {
    post: () =>
      logoutClient.post<Record<string, never>, { message: string }>({}),
  },
  refresh: {
    post: () =>
      refreshClient.post<Record<string, never>, RefreshTokenResponse>({}),
  },
  getCurrentUser: {
    post: () => meClient.post<Record<string, never>, User>({}),
  },
  requestPasswordReset: {
    post: (data: RequestPasswordResetDto) =>
      requestPasswordResetClient.post<
        RequestPasswordResetDto,
        { message: string }
      >(data),
  },
  resetPassword: {
    post: (data: ResetPasswordDto) =>
      resetPasswordClient.post<ResetPasswordDto, { message: string }>(data),
  },
  changePassword: {
    patch: (data: ChangePasswordDto) =>
      changePasswordClient.patch<ChangePasswordDto, { message: string }>(data),
  },
  verifyEmail: {
    get: (token: string) =>
      verifyEmailClient.get<{ message: string }>({ token }),
  },
};
