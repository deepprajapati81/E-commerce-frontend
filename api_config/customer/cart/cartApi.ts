import { apiConfig } from "@/api_config/apiConfig";
import { GetcartRes,UpdateQuantityApiRes,AddCartRes, deleteCartItemApiRes } from "./cartTypes";

export const GetCartInfoApi = async () =>{

   try {
        const res:GetcartRes=  await   apiConfig({
            url:"cart",
            method:"GET"
        })
        // console.log("cart api ",res)
         return res
   } catch (error:any) {
            console.log("get user cart error",error)
            return {
      success: false,
      error: error.message,
      status: 500,
    };
   } 
}


export const AddToCartApi = async ({productId}:{productId:string})=>{
    try{
        const formdata = new FormData;
        formdata.append("productId",productId)
        const res:AddCartRes = await apiConfig({
            url:"cart/add",
            method:"POST",
            body:{productId},
          
           
        })
        // console.log("add to cart api res",data)
        return res
    }catch(error:any){
        console.log("add to cart error",error)
        return {
      success: false,
      error: error.message,
      status: 500,
    };
    }
}

export const UpdateQuantityApi = async ({productId,action}:{productId:string,action:"inc"|"dec"})=>{
    try{
            const res:UpdateQuantityApiRes =await apiConfig({
                url:"cart/update",
                method:"POST",
                body:{productId,action}
            })
            console.log("update quantity res",res)
            return res
    }catch(error:any){
        console.log("update quantity",error)
        return {
      success: false,
      error: error.message,
      status: 500,
    };
    }
}

export const deleteCartItem = async ({productId}:{productId:string})=>{
    try{        
        console.log("productid: ",productId)
            const res:deleteCartItemApiRes =await apiConfig({
                url:"cart/delete-item",
                method:"DELETE",
                body:{productId}
            })
            console.log("delete cart item api res",res)
            return res
    }catch(error:any){
        console.log("delete cart items api",error)
        return {
      success: false,
      error: error.message,
      status: 500,
    };
    }
}