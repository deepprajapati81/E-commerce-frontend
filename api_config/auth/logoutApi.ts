import { toast } from "react-toastify";
import { apiConfig } from "../apiConfig";
import { LogoutApiRes } from "./AuthTypes";

export const  logoutApi =async ()=>{
    try {
    const data:LogoutApiRes=     await apiConfig({
                url:"auth/logout",
            method:"POST",
        })
        return data
    } catch (error:any) {
            console.log("logout api error",error)
            return {
      success: false,
      error: error.message,
      status: 500,
    };
    }
}