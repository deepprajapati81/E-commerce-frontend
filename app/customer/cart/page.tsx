import React from 'react'
import { GetCartInfoApi } from '@/api_config/customer/cart/cartApi'
import CartComponent from '@/components/customer/cart/CartComponent'

const page = async ({searchParams}:{searchParams:{search?:string}}) => {
  


  
  
  const res = await GetCartInfoApi()
let cart ;
let total;
if(res?.success){
  cart =  res.data?.items
  total= res.data?.total
}
if (!res?.success) {
    return <div className="min-w-full mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-3xl/[3rem] font-bold"> Oops! Something went wrong.</h1>
          <h6 className="text-[1rem]/[2rem]">
            {" "}
          Brace yourself till we get the error fixed.
          </h6>
          <p className="text-[1rem]/[1.5rem]">
           You may also refresh the page  or try again later.
          </p>
        </div>
      </div>
  }
    // console.log("cart page res",res)
  return (
    <div className="w-full
     mx-auto mt-10">
   {cart &&    <CartComponent items={cart} total={total || 0} />}
    </div>
  )
}
export default page