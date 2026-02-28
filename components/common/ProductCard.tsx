"use client";
import { AddToCartApi } from "@/api_config/customer/cart/cartApi";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/card";
import { Product } from "@/api_config/customer/cart/cartTypes";
import { toast } from "react-toastify";
const ProductCard = ({ product }: { product: Product }) => {
  
  const { isLoggedIn,setCartItemCount,cartItemCount } = useAuth();
  const AddToCart = async ({ id }: { id: string }) => {
    const res = await AddToCartApi({ productId: id });
    console.log("add to cart", res);
    if (res.success) {
      setCartItemCount(res.data?.totalItems ?? 0)
      localStorage.setItem("quantity",(res.data?.totalItems || 0).toString() )
      toast.success(res.data?.message);
    } else {
      toast.error(res.data?.message);
    }
  };
  return (
    <Card className="w-70 py-0 rounded-md gap-y-3 h-90 ">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`}
        className="rounded-t-md h-[55%] object-cover"
      ></img>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="line-clamp-1">
          {product.discription}
        </CardDescription>
      </CardHeader>
      <CardContent>&#8377; {product.price}</CardContent>
      <CardFooter className="" >
        <Button
          className="w-full cursor-pointer"
          onClick={() => AddToCart({ id: product._id })}
          disabled={!isLoggedIn || product.isDeleted}
        >
          {product.isDeleted ? <span>Not available</span>:<span>Add to cart</span> }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
