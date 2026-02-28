"use client";
import { Product } from "@/api_config/customer/product/productApi";

type AdminDashboardProps = {
  products: Product[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
};
import { DataTable } from "../common/data-table";
import { productColumn } from "./productColumn";
import UpdateProduct from "./UpdateProduct";
import { useState } from "react";
import DeleteProduct from "./DeleteProduct";

const AdminDashboard = ({
  products,
  totalPages,
  totalCount,
  currentPage,
}: AdminDashboardProps) => {
  const [dPoductId, setDProductId] = useState<string | null>(null);
  const [updatePoductId, setUpdateProductId] = useState<string | null>(null);
  const [updateProduct, setUpdateProduct] = useState<Product>();

  const column = productColumn(
    (productId: string) => {
      setDProductId(productId);
    },
    (productId: string) => {
      const product = products.find((p) => p._id === productId);
      console.log(product);
      setUpdateProduct(product);

      setUpdateProductId(productId);
    },
  );
  return (
    <div>
      <DataTable
        columns={column}
        data={products}
        pagination={{ pageIndex: currentPage, pageSize: 5 }}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      <DeleteProduct
        ProductId={dPoductId}
        currentPageCount = {products.length}
        onClose={() => {
          setDProductId(null);
        }}
      />
      <UpdateProduct
        ProductId={updatePoductId}
        onClose={() => {
          setUpdateProductId(null);
        }}
        product={updateProduct}
      />
    </div>
  );
};

export default AdminDashboard;
