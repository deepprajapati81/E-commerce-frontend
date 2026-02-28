import { apiConfig } from "@/api_config/apiConfig"
import { ApiResponse } from "@/api_config/apiResponse";
 export type Product ={
        _id: string,
      name: string,
      price: number,
      discription: string,
      image:string,
      isDeleted: boolean,
 }
type ProductApiData = {
        products: Product[] | []
}

 export type ProductApiProps = ApiResponse<ProductApiData>

export const productApi = async ({search,sort}:{search?:string,sort?:string})=>{
        try{
             const res:ProductApiProps=   await apiConfig({
                    url:`products`,
                    method:"GET",
                    params:{
                        search:search,
                        sort:sort
                    }
                })

                // console.log("product api",res)
                 return res
                 
        }catch(error:any){
                console.log("customr product error", error)
                return {
      success: false,
      error: error.message,
      status: 500,
    };
        }
}