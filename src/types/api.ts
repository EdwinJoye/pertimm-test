export interface RegisterRequest {
  email: string;
  password1: string;
  password2: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  uid: string;
  email: string;
  url: string;
  token: string;
  first_name: string;
  last_name: string;
  level: string;
  is_verified?: boolean;
  groups?: string[];
  external_auth?: boolean;
}

export interface JobApplicationRequest {
  email: string;
  first_name: string;
  last_name: string;
}

export interface JobApplicationResponse {
  url: string;
  status: string;
  confirmation_url?: string;
}

export interface ConfirmApplicationRequest {
  confirmed: boolean;
}
