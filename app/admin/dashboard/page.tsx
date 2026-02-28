import { GetProductsApi } from "@/api_config/admin/adminApi";
import AdminDashboard from "@/components/admin/AdminDashboard";
import React from "react";
import { AdminDashbordResponse } from "@/api_config/admin/Admin";
const page = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) => {
  const SearchParams = await searchParams;
  const pageNumber = Number(SearchParams?.page) || 1;
  const limit = Number(SearchParams?.limit) || 5;
  const res: AdminDashbordResponse = await GetProductsApi(pageNumber, limit);
  console.log("admin dashboard", res);

  if (!res.success || !res.data) {
    return <div className="min-w-full mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-3xl/[3rem] font-bold"> Oops! Something went wrong.</h1>
          <h6 className="text-[1rem]/[2rem]">
            {" "}
          Brace yourself till we get the error fixed.
          </h6>
          <p className="text-[1rem]/[1.5rem]">
           You may also refresh the page  or try again later.
          </p>
        </div>
      </div>
  }
  return (
    <div className="w-full p-7">
      <AdminDashboard
        products={res.data.product}
        totalCount={res.data?.totalCount}
        totalPages={res.data?.totalPages}
        currentPage={res.data?.currentPage}
      />
    </div>
  );
};

export default page;
