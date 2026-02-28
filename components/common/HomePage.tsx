import { Product } from "@/api_config/customer/cart/cartTypes";
import ProductCard from "./ProductCard";

const HomePage = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full ">
     
      <div className="flex flex-wrap gap-x-4 gap-y-4 mt-10 w-full justify-center  ">
        {products.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
