"use client";
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as Yup from "yup";
import Link from "next/link";
import { handleLogin } from "@/api_config/auth/loginApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoginApiRes } from "@/api_config/auth/AuthTypes";
import { LoginApi } from "../../app/(auth)/login/action";
export type loginProps = {
  email: string;
  password: string;
};

const initialValues: loginProps = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export const Login = () => {
  const router = useRouter();
  const { setIsLoggedIn, setRole, setCartItemCount } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const res =   await LoginApi(values)

            console.log("login values",values)
                if (res.success && res.data) {
              setRole(res.data.user.role);
              console.log(res.data.user.role)
              setIsLoggedIn(true);
              toast.success(res.data.message);
              resetForm();
              if (res.data.user.role === "admin") {
                router.push("/admin/dashboard");
              } else {
                localStorage.setItem(
                  "quantity",
                  (res.data.user.totalItems || 0).toString(),
                );
                setCartItemCount(res.data.user.totalItems || 0)
                router.push('/')

              }
            
            } else {
              toast.error(res.error);
            }
           
          }}
        >
          {() => (
            <Form className="space-y-5 bg-white p-6 rounded-2xl shadow-lg">
              <h1 className="text-center text-xl font-semibold">
                Login to your account
              </h1>

              <FormikField
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-500"
              />

              <FormikField
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-sm text-red-500"
              />

              <Button type="submit" className="w-full h-10">
                Login
              </Button>
              <div className="flex justify-center items-center ">
                <p>
                  Don't have an account? <Link href="/signup">Sign Up</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
