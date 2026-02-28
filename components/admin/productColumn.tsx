"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/api_config/customer/product/productApi";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
export const productColumn = (
  onDeleteButton: (productId: string) => void,
  onUpdateButton: (productId: string) => void,
): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 hover:bg-transparent"
      >
        Product name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",

    cell: ({ row }) => {
      const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${row.original.image}`;
      console.log("IMAGE URL:", imageUrl);

      return (
        <img src={imageUrl} width={50} height={50} alt={row.original.image} />
      );
    },
  },
  {
    accessorKey: "discription",
    header: "Discription",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => {
      return (
        <Button
          className=""
          variant="ghost"
          size="sm"
          onClick={() => onDeleteButton(row.original._id)}
        >
          Delete
        </Button>
      );
    },
  },
  {
    id: "update",
    header: "Update",
    cell: ({ row }) => {
      return (
        <Button
          className=""
          variant="ghost"
          size="sm"
          onClick={() => onUpdateButton(row.original._id)}
        >
          update
        </Button>
      );
    },
  },
];
