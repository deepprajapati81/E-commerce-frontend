// add to cart 
import { ApiResponse } from "@/api_config/apiResponse"

export interface item {
        productId:string,
        quantity:number,
        _id:string
}
export interface AddToCartData {
    cart:{
        items:item[]
        userId:string
        _id:string
    },
    message:string,
    success:boolean,
    totalItems:number
}
// add to cart api interface 
export type  AddCartRes =ApiResponse<AddToCartData>


// get cart 
export interface Product  {
        _id:string,
        discription:string,
        image:string,
        price:number,
        isDeleted:boolean
        name:string
}
export interface cartItem {
     productId:Product
        quantity:number,
        _id:string
}
export interface GetCartApiData  {
    items: cartItem[] | []
     total:number   ;
}


export type  GetcartRes=ApiResponse<GetCartApiData>


// update cart 

export interface UpdateCartData {
        items:cartItem[] | []
        message:string
        total:number
        totalItems:number
}   


export type  UpdateQuantityApiRes  = ApiResponse<UpdateCartData>


// delete cart itm


export type deleteCartItemData= {
                message:string,
                totalItems:number,
                total:number,
                items:cartItem[]
}
export type  deleteCartItemApiRes  = ApiResponse<deleteCartItemData>
