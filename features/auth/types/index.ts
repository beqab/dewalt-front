export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  tokenExpiresAt: string;
  refreshToken: string;
}

export interface RegisterDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RequestPasswordResetDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenResponse {
  token: string;
  tokenExpiresAt: string;
}


