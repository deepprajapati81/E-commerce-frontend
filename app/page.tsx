import { productApi } from "@/api_config/customer/product/productApi";
import HomePage from "@/components/common/HomePage";
import { SidebarInset } from "@/components/ui/sidebar";
import Link from "next/link";
export type product = {
  _id: string;
  name: string;
  discription: string;
  price: number;
  image: string;
};
const page = async ({
  searchParams,
}: {
  searchParams: { search?: string; sort?: string };
}) => {
  const { search, sort } = await searchParams;
  const res = await productApi({ search, sort });

  if (!res?.success) {
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

  const products = res.data?.products || [];

  if (products.length === 0) {
    return (
      <div className="min-w-full mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-4xl/[3rem] font-bold">No Products Found !</h1>
          <h6 className="text-[1rem]/[2rem]">
            {" "}
            We couldn't find anything matching your search.
          </h6>
          <p className="text-[0.8rem]/[1.5rem]">
            You can retrun to our{" "}
            <Link href="/" className="text-blue-500">
              home page
            </Link>{" "}
            if you can't find what you are looking for
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <SidebarInset className="flex-1">
        {products ? (
          <HomePage products={products} />
        ) : (
          <div>No Products Found {res?.error}</div>
        )}
      </SidebarInset>
    </div>
  );
};

export default page;
