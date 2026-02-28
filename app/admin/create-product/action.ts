'use server'
import { createProductApi } from "@/api_config/admin/adminApi"
import { createProductResponse } from "@/api_config/admin/Admin"
import { createProductProps } from "@/api_config/admin/adminApi"
export const createProductAction = async(values:createProductProps)=>{
        const res =     await createProductApi(values)
        return res
}