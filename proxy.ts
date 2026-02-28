import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
export const proxy = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  console.log("tokemn ", token);

  const pathname = request.nextUrl.pathname;

  if (!token) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/customer")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded: any = jwtDecode(token);
    const role = decoded.role;
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/customer") && role !== "customer") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/login", "/signup"],
};
