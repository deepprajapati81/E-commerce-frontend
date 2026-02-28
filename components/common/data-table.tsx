"use client";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../ui/select";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Input } from "../ui/input";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: { pageIndex: number; pageSize: number };
  currentPage: number;
  totalCount: number;
  totalPages: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  currentPage,
  totalCount,
  totalPages,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [limit, setLimit] = useState<number>(5);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePagination = (action: "prev" | "next") => {
    const params = new URLSearchParams(searchParams.toString());

    if (action === "prev" && currentPage > 1) {
      params.set("page", (currentPage - 1).toString());
    }
    if (action === "next" && currentPage < totalPages) {
      params.set("page", (currentPage + 1).toString());
    }
    params.set("limit", limit.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const handlePageButton = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());
    params.set("limit", limit.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSelectPagination = (values: number) => {
    setLimit(values);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (1).toString());
    params.set("limit", values.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    autoResetPageIndex: false,
    pageCount: totalPages,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border bg-white shadow-sm">
        <Table>
          {/* Header */}
          <TableHeader className="bg-gray-100 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold text-gray-700 py-3"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 transition odd:bg-white even:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-between">
        <div className="flex gap-x-3 justify-start items-center">
          <Select
            defaultValue="5"
            onValueChange={(values) => handleSelectPagination(Number(values))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, totalCount)} of {""}
            {totalCount} Products
          </div>
        </div>
        
      </div>
	  
	  <div className="flex gap-x-3 items-center">
          {" "}
          <Button
            onClick={() => handlePagination("prev")}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            <ArrowLeftToLine />
            {/* Previous */}
          </Button>
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <Button
                size="sm"
                key={p}
                variant="ghost"
                className={isActive ? "bg-gray-500 text-white" : ""}
                onClick={() => handlePageButton(p)}
              >
                {p}
              </Button>
            );
          })}
          <Button
            onClick={() => handlePagination("next")}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            {/* Next */}
            <ArrowRightToLine />
          </Button>
        </div>
    </div>
  );
}
