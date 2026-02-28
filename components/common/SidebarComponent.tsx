"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "../ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { logoutApi } from "@/api_config/auth/logoutApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { HomeIcon } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
const SidebarComponent = () => {
  const router = useRouter();
  const { role, isLoggedIn, setIsLoggedIn, setRole ,cartItemCount} = useAuth();
  const hadleLogout = async () => {
    const res = await logoutApi();
    console.log("logout data", res);
    if (res.success) {
      toast.success(res.data?.message);
      setIsLoggedIn(false);
      setRole(undefined);
      router.push("/");
    } else {
      toast.error(res.error);
    }
  };

  // console.log("sidebar " , isLoggedIn,role)
  return (
    <Sidebar className="relative" collapsible="offcanvas">
      <SidebarHeader className="text-xl font-semibold mt-4 px-4">
        E-Commerce
      </SidebarHeader>

      <SidebarContent>
        {role === "admin" ? (
          <div>
            <SidebarGroup>
              <Link href="/admin/dashboard" aria-disabled={isLoggedIn}>
                <SidebarGroupLabel className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-lg ">
                  <LayoutDashboard />
                  Dashboard
                </SidebarGroupLabel>
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link href="/admin/create-product" aria-disabled={isLoggedIn}>
                <SidebarGroupLabel className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-lg ">
                  <HomeIcon />
                  Create Product
                </SidebarGroupLabel>
              </Link>
            </SidebarGroup>
          </div>
        ) : (
          <div>
            <SidebarGroup>
              <Link href="/" aria-disabled={isLoggedIn}>
                <SidebarGroupLabel className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-lg ">
                  <HomeIcon />
                  Home
                </SidebarGroupLabel>
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link href="/customer/cart" aria-disabled={isLoggedIn}>
                <SidebarGroupLabel className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-lg ">
                <div className="relative">
  <ShoppingCartIcon className="w-6 h-6" />

  {cartItemCount> 0 && (
    <span className="absolute -top-1 -right-2 
                     bg-red-600 text-white 
                     text-xs font-semibold
                     min-w-[18px] h-[18px]
                     px-1
                     flex items-center justify-center
                     rounded-full">
      {cartItemCount}
    </span>
  )}
</div>
                  Cart
                </SidebarGroupLabel>
              </Link>
            </SidebarGroup>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="absolute bottom-8 w-full">
        {isLoggedIn ? (
          <Button className="w-full" onClick={() => hadleLogout()}>
            Logout
          </Button>
        ) : (
          <div className="flex flex-col gap-y-2">
            <Link href="/login">
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="w-full">Signup</Button>
            </Link>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
