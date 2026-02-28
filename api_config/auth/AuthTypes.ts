import { ApiResponse } from "../apiResponse";

export type loginData = {
  success: boolean;
  message: string;
  user: {
    email: string;
    id: string;
    role: "customer" | "admin" | undefined;
    totalItems?: number;
  },
  token:string
};
export type singupData = {
  success: boolean;
  message: string;
};
export type logoutData = {
  success: boolean;
  message: string;
};
export type LoginApiRes = ApiResponse<loginData>;
export type SignupApiRes = ApiResponse<singupData>;
export type LogoutApiRes = ApiResponse<logoutData>;
