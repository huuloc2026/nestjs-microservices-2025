export interface UserPayload {
  sub: number;
  email: string;
}

export interface LoginResponse {
  access_token: string;
}
