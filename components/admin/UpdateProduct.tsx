"use client";

import { useState} from "react";
import { Button } from "../ui/button";
import { updateProduct } from "@/api_config/admin/adminApi";
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Product } from "@/api_config/customer/cart/cartTypes";

import { UpdateProductRes } from "@/api_config/admin/Admin";

const UpdateProduct = ({
  ProductId,
  onClose,
  product,
}: {
  ProductId: string | null;
  onClose: () => void;
  product: Product | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);
const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1)

  const validationSchema = Yup.object({
    name: Yup.string().required("Product title is required"),
    discription: Yup.string().required("Product description is required"),
    price: Yup.number().required("Product price is required"),
    image: Yup.mixed()
      .nullable()
      .test("fileType", "Only image files are allowed", (value: any) => {
        if (!value) return true;
        return value.type?.startsWith("image/");
      })
      .test("fileSize", "Image must be less than 2MB", (value: any) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      }),
  });

  return (
    <Dialog open={ProductId !== null} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>

        <Formik
          enableReinitialize
          initialValues={{
            name: product?.name || "",
            discription: product?.discription || "",
            price: product?.price || 0,
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!ProductId) return;
            console.log("uopdate form", values);
            try {
              setIsLoading(true);

              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("discription", values.discription);
              formData.append("price", values.price.toString());

              if (values.image) {
                formData.append("image", values.image);
              }
              formData.append("productId", ProductId);

              const res : UpdateProductRes = await updateProduct({
                productId: ProductId,
                formData,
              });

              if (res.success) {
                toast.success(res.data?.message);
                onClose();
                setIsLoading(false);
                 const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
                
              } else {
                toast.error("Failed to update product");
              }
            } catch (error) {
              toast.error("Something went wrong");
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-5 bg-white p-6 rounded-2xl shadow-lg">
              {/* Title */}
              <FormikField
                name="name"
                type="text"
                placeholder="Enter Product Title"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-red-500"
              />

              {/* Description */}
              <FormikField
                name="discription"
                type="text"
                placeholder="Enter Description"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="discription"
                component="p"
                className="text-sm text-red-500"
              />

              {/* Image */}
              <p>Previous image</p>
          <div className="flex justify-center">
  {preview ? (
    <img
      src={preview}
      alt="New Preview"
      className="h-24 w-24 object-cover rounded-md"
    />
  ) : product?.image ? (
    <img
      src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`}
      alt="Previous Product"
      className="h-24 w-24 object-cover rounded-md"
    />
  ) : null}
</div>
              <Input
                type="file"
                accept="image/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.currentTarget.files?.[0];
  if (!file) return;

  setFieldValue("image", file);

  const previewUrl = URL.createObjectURL(file);
  setPreview(previewUrl);
}}
                className="h-10 w-full"
              />

              {/* Price */}
              <FormikField
                name="price"
                type="number"
                placeholder="Enter Price"
                as={Input}
                className="h-10 w-full"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-sm text-red-500"
              />

              <DialogFooter>
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>

                <Button disabled={isLoading} type="submit">
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
  
}

export default UpdateProduct;
