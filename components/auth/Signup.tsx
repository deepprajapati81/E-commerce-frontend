"use client";
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import Link from "next/link";
import { handleSignup } from "@/api_config/auth/signupApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SignupApiRes } from "@/api_config/auth/AuthTypes";
export type signupProps = {
    name:string,
    email: string;
  password: string;
};

const initialValues: signupProps = {
name:"",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
    name:Yup.string().required("Name is Required "),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export const Signup = () => {
 const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const res:SignupApiRes = await handleSignup(values);
            if (res.success) {
              toast.success(res.data?.message);
              resetForm();
              router.push('/login')
            } else {
              toast.error(res.error);
            }
          }}
        >
          {() => (
            <Form className="space-y-5 bg-white p-6 rounded-2xl shadow-lg">
              <h1 className="text-center text-xl font-semibold">
                  Create an account
              </h1>
            <FormikField
                name="name"
                type="text"
                placeholder="Enter your name"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-red-500"
              />

              <FormikField
                name="email"
                type="email"
                placeholder="Enter your email"
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
                autoComplete="new-password"
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
                   Already have an account? <Link href="/login">Login</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
