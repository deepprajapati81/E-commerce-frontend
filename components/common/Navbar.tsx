"use client";

import profile from "@/public/profile.jpg";
import { ShoppingCartIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import { logoutApi } from "@/api_config/auth/logoutApi";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { LogoutApiRes } from "@/api_config/auth/AuthTypes";
import {hadleLogoutApi} from '@/app/(auth)/login/action'
const Navbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const {
    cartItemCount,
    isLoggedIn,
    setIsLoggedIn,
    setRole,
    role,
    setCartItemCount,
  } = useAuth();
  const hadleLogout = async () => {
    const res:LogoutApiRes = await hadleLogoutApi();
    console.log("logout data", res);
    if (res.success) {
      toast.success(res.data?.message);
      setIsLoggedIn(false);
      setRole(undefined);
      setCartItemCount(0);
      localStorage.removeItem("quantity")
      router.push("/");
    } else {
      toast.error("Unable to logout please try again later");
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim() !== "") {
      params.set("search", search);
      
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  };


  return (
    <div className="w-full h-14 flex justify-end p-4 items-center space-x-4 mr-7 fixed z-50 bg-gray-50 ">
      

      {/* cart */}
      {role !== "admin" && (
        <div className="flex items-center justify-center space-x-3">
          {/* search */}
      <div className="flex gap-x-4">
        <Input
        placeholder="search.."
          onChange={(
            e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
          ) => setSearch(e.target.value)}
        />
        <Button type="submit" onClick={handleSearch} className="cursor-pointer">
          Search
        </Button>
      </div>
      {/* filter  */}
      <div >
        <DropdownMenu >
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <FilterIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-50">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Price</DropdownMenuLabel>

              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={(value) => {
                  setSort(value);

                  const params = new URLSearchParams(searchParams.toString());

                  if (value) {
                    params.set("sort", value);
                  } else {
                    params.delete("sort");
                  }

                  router.replace(`?${params.toString()}`, {
                    scroll: false,
                  });
                }}
              >
                <DropdownMenuRadioItem value="" className="cursor-pointer">
                  clear
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="highToLow" className="cursor-pointer">
                  High To Low
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="lowToHigh" className="cursor-pointer">
                  Low To High
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

        <div className="relative">
          <Link href="/customer/cart">
            <ShoppingCartIcon className="w-6 h-6" />

            {cartItemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 
              bg-red-600 text-white 
              text-xs font-semibold
              min-w-4.5 h-4.5
              px-1
              flex items-center justify-center
              rounded-full"
              >
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
        </div>
      )}
      {/* profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={profile}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full cursor-pointer"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-50">
          {isLoggedIn ? (
            <>
              {role === "admin" ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/admin/create-product" className="cursor-pointer">
                      Create product
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/" className="cursor-pointer">Home</Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => hadleLogout()}
                className="text-red-600 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href="/login" className="cursor-pointer">Login</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/signup" className="cursor-pointer">Signup</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
