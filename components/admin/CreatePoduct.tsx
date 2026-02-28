"use client";
import { createProductProps } from "@/api_config/admin/adminApi";
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createProductApi } from "@/api_config/admin/adminApi";
import { createProductResponse } from "@/api_config/admin/Admin";
const initialValues: createProductProps = {
  name: "",
  discription: "",
  image: null,
  price: 0,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Product  name is required"),
  discription: Yup.string().required("Product discription is required"),
  image: Yup.mixed()
    .required("Product image is required")
    .test("fileType", "Only image files are allowed", (value: any) => {
      if (!value) return false;
      return value && value.type.startsWith("image/");
    })
    .test("fileSize", "Image must be less than 2MB", (value: any) => {
      if (!value) return false;
      return value && value.size <= 2 * 1024 * 1024; // 2MB
    }),
  price: Yup.number().required("Product price is required"),
});

export const CreatePoduct = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const res:createProductResponse = await createProductApi(values);
            if (res.success) {
              toast.success(res.data?.message);
              resetForm();
              router.push("/admin/dashboard");
            } else {
              toast.error(res.data?.message);
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-5 bg-white p-6 rounded-2xl shadow-lg">
              <h1 className="text-center text-xl font-semibold">
                Create a Product
              </h1>

              <FormikField
                name="name"
                type="text"
                placeholder="Enter Product name"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-red-500"
              />

              <FormikField
                name="discription"
                type="text"
                placeholder="Enter discription"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="discription"
                component="p"
                className="text-sm text-red-500"
              />

              <Input
                name="image"
                type="file"
                accept="image/*"
                onChange={(event: any) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
                className="h-10 w-full border rounded px-2"
              />

              <ErrorMessage
                name="image"
                component="p"
                className="text-sm text-red-500"
              />

              <FormikField
                name="price"
                type="number"
                placeholder="Enter your password"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-sm text-red-500"
              />

              <Button type="submit" className="w-full h-10">
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
