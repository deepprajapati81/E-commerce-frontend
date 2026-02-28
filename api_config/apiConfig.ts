'use server'
import { error } from "console";
import { NextResponse } from "next/server";

type HttpMehods = "GET" | "POST"| "DELETE"| "PUT"| "PATCH"
interface ApiConfigProps {
  url: string;
  method: HttpMehods;
  body?: any;
  isFormData?: boolean;
params?: Record<string, string | number | boolean | undefined>;
}

export const apiConfig = async ({
  method,
  url,
  body,
  isFormData = false,
  params
}: ApiConfigProps) => {
  try {
    let headers: Record<string, string> = {};
    let fetchOptions: RequestInit = {
      method,
      credentials: "include",
    };

    // serchparmas 
    let queryString ="";

    if(params){
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });

      queryString = `?${searchParams.toString()}`;
    }
    //  Detect if running on server
    if (typeof window === "undefined") {
      // SERVER SIDE
      const { cookies } = await import("next/headers");
      const cookieStore = cookies();
      const token = (await cookieStore).get("token")?.value;
      console.log("token in server api ",token)
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    //  If NOT FormData → send JSON
    if (!isFormData && body) {
      headers["Content-Type"] = "application/json";
      fetchOptions.body = JSON.stringify(body);
    }

    //  If FormData → send directly (no content-type)
    if (isFormData && body) {
      fetchOptions.body = body;
    }

    fetchOptions.headers = headers;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}${queryString}`,
      fetchOptions
    );
      // console.log("api config res",res)
    const data = await res.json();
        // console.log("api config data",data)
    if (!res.ok) {
        return {
          success:false,
          error:data.message,
          status:res.status
        }
    }
      if (data.success === false) {
      return {
        success: false,
        error: data.message || "Operation failed",
        status: res.status,
      };
    }

    return {
      success: true,
      data: data,
      status: res.status,
    };
  } catch (error:any) {
    console.log("apiConfig error:", error.message);
 return {
      success: false,
      error: error.message || "Network error",
      status: 500,
    };
  }
};