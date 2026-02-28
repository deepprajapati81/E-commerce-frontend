"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/api_config/admin/adminApi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { DeleteProductRes } from "@/api_config/admin/Admin";
const DeleteProduct = ({
  ProductId,
  onClose,
  currentPageCount,
}: {
  ProductId: string | null;
  onClose: () => void;
  currentPageCount: number;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const handleClick = async ({ ProductId }: { ProductId: string | null }) => {
    const res: DeleteProductRes = await deleteProduct({ productId: ProductId });
    console.log("delete button", res.data?.message);
    if (res.success && res.data) {
      let newPage = page;
      setIsLoading(false);
      onClose();
      toast.success(res.data?.message);

      if (currentPageCount === 1 && page > 1) {
        newPage = page - 1;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    } else {
      toast.error(res.data?.message);
    }
  };
  return (
    <Dialog open={ProductId !== null} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm to delete the product</DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              handleClick({ ProductId });
            }}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;
