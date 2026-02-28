"use client";

import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { cartItem } from "@/api_config/customer/cart/cartTypes";
import {
  deleteCartItem,
  UpdateQuantityApi,
} from "@/api_config/customer/cart/cartApi";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { UpdateQuantityApiRes } from "@/api_config/customer/cart/cartTypes";
import { useRouter } from "next/navigation";
import { deleteCartItemApiRes } from "@/api_config/customer/cart/cartTypes";
import { useSearchParams } from "next/navigation";

interface Props {
  items: cartItem[];
  total: number;
}

const CartComponent = ({ items, total }: Props) => {
  const { setCartItemCount } = useAuth();
  const [Items, setItems] = useState<cartItem[]>(items || []);
  const [Total, setTotal] = useState<number>(total || 0);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")
  console.log("cart page search",search)
  useEffect(() => {
  if (search) {
    router.replace(`/?search=${search}`);
  }
}, [search, router]); 
  const handleQuantity = async ({
    id,
    action,
  }: {
    id: string;
    action: "inc" | "dec";
  }) => {
    const res: UpdateQuantityApiRes = await UpdateQuantityApi({
      productId: id,
      action: action,
    });
    if (res.success && res.data) {
      setItems(res.data?.items);
      setTotal(res.data?.total);
      setCartItemCount(res.data?.items.length);
      localStorage.setItem("quantity", (res.data?.items.length).toString());
    }
    if (res.error) {
      toast.error(res.error);
      setError(res.error);
    }
  };
  if (!Items || Items.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">Your cart is empty</p>
    );
  }

  const handleRemove = async (productId: string) => {
   
    const removeResponse: deleteCartItemApiRes = await deleteCartItem({
      productId,
    });
    console.log("handle remove", removeResponse);

    if (!removeResponse.success) {
      console.log("dsajkdhkasdsa");

      toast.error(removeResponse.error);
    } else {
      toast.success(removeResponse.data?.message);
      localStorage.setItem("quantity",(removeResponse.data?.totalItems || 0).toString())
      setCartItemCount(removeResponse.data?.totalItems || 0)
      setItems(removeResponse.data?.items || []);
      setTotal(removeResponse.data?.total || 0);
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 space-y-4">
      {Items.map((item) => (
        <Card
          key={item._id}
          className="w-full md:flex-row flex-col flex items-center justify-between p-4  "
        >
          <div className="flex flex-row gap-x-4">
            {/* image */}
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.productId.image}`}
              alt={item.productId.name}
              className="w-28 h-28 object-cover rounded-md"
            />

            {/* details */}
            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-semibold">{item.productId.name}</h2>

              <p className="text-gray-600"> &#8377; {item.productId.price}</p>

              {/* + -  */}
              <div className="flex items-center gap-3 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuantity({ id: item.productId._id, action: "dec" })
                  }
                >
                  -
                </Button>

                <span className="text-base font-medium">{item.quantity}</span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={item.productId.isDeleted}
                  onClick={() =>
                    handleQuantity({ id: item.productId._id, action: "inc" })
                  }
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* total */}
          <div className="text-right mt-2">
            <p className="text-lg font-bold">
              &#8377; {item.productId.price * item.quantity}
            </p>
            {item.productId.isDeleted && (
              <p className="text-gray-600 text-sm"> Item not available </p>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(item.productId._id)}
            >
              remove
            </Button>
          </div>
        </Card>
      ))}

      {/* Cart Total Section */}

      <div className="flex justify-end border-t pt-4">
        <h2 className="text-2xl font-bold">Total: &#8377; {Total}</h2>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CartComponent;
