import { ApiResponse } from "../apiResponse"
import { Product } from "../customer/cart/cartTypes"

// dashbord data
export type adminData ={
    currentPage:number,
    product:Product[],
   
    totalCount:number,
    totalPages:number
}
// createproduct
 export type CreateProductData ={
            message:string,
            
 }

// update product
export type UpdateProductData= {
     message:string,
}
export type DeleteProductData= {
     message:string,
}


export type AdminDashbordResponse = ApiResponse<adminData>
export type createProductResponse = ApiResponse<CreateProductData>
export type UpdateProductRes = ApiResponse<UpdateProductData>
export type DeleteProductRes = ApiResponse<DeleteProductData>