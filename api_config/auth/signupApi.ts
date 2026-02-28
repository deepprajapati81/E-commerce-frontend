import { signupProps } from "@/components/auth/Signup";
import { apiConfig } from "../apiConfig";
import { SignupApiRes } from "./AuthTypes";

export const handleSignup = async (values: signupProps) => {
  try {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const res: SignupApiRes = await apiConfig({
      url: "auth/signup",
      method: "POST",
      body: values,
    });
    console.log("signup res", res);
    return res;
  } catch (error: any) {
    console.log("sigup errror", error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
};
