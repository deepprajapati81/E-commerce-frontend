import { loginProps } from "@/components/auth/Login";
import { apiConfig } from "../apiConfig";
import { LoginApiRes } from "./AuthTypes";
export const handleLogin = async (values: loginProps) => {
  try {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const res: LoginApiRes = await apiConfig({
      url: "auth/login",
      method: "POST",
      body: values,
    });
    console.log("login res", res);
    return res;
  } catch (error: any) {
    console.log("login errror", error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
};
