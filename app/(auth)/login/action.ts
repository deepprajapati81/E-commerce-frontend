'use server'
import { LoginApiRes } from "@/api_config/auth/AuthTypes";
import { handleLogin } from "@/api_config/auth/loginApi";
import { loginProps } from "@/components/auth/Login";
import { cookies } from "next/headers";
 export const  LoginApi = async (values:loginProps)=>{
      console.log("login api values",values)
      const res: LoginApiRes = await handleLogin(values);
            console.log("token in action ts",res.data?.token)
      console.log(res)
console.log("login info ", res);
if (res.success && res.data){
         let token = res.data.token;
        ( await cookies()).set("token",token)

}

return res

        
}