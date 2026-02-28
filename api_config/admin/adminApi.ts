export interface createProductProps {
  name: string;
  price: number;
  discription: string;
  image: File | null;
}
import { apiConfig } from "../apiConfig";
import { AdminDashbordResponse, createProductResponse, UpdateProductRes } from "./Admin";

export const createProductApi = async (values: createProductProps) => {
  try {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("discription", values.discription);
    formData.append("price", values.price.toString());

    if (values.image) {
      formData.append("image", values.image);
    }

   const res:createProductResponse = await apiConfig({
    url:"admin/add",
    isFormData:true,
    body:formData,
    method:"POST"
   })

    
    console.log("create product api",res)
    return res;
  } catch (error:any) {
    console.log("createProductApi error:", error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
};

export const GetProductsApi = async ( page?: number,limit?:number ) => {
  try {
    const res:AdminDashbordResponse = await apiConfig({
      url: "admin/product",
      method: "GET",
      params:{
        page,limit
      }
    });
    // console.log("GetProductsApi res", res);
    return res;
  } catch (error:any) {
    console.log(error);
     return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
};


export const deleteProduct =async  ({productId}:{productId:string | null})=>{
      try {
      const data =   await apiConfig({
          url:"admin/remove",
          method:"DELETE",
          body:{productId} })
          console.log("delete product api data", data)
           return data
      } catch (error:any) {
          console.log("delete product api ",error)
           return {
      success: false,
      error: error.message,
      status: 500,
    };
      }
}

export  const updateProduct = async({productId,  formData,}:{productId:string | null, formData: FormData;})=>{
 try {
      const res:UpdateProductRes =   await apiConfig({
          url:"admin/update",
          method:"PATCH",
          body:formData,
          isFormData:true
         })
          console.log("update product api data", res)
           return res
      } catch (error:any) {
          console.log("update product api ",error)
           return {
      success: false,
      error: error.message,
      status: 500,
    };
      }
}