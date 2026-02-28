import { CreatePoduct } from '@/components/admin/CreatePoduct'
import React from 'react'
import { createProductApi } from '@/api_config/admin/adminApi'
const page =async () => {
  return (
    <div className='w-full'><CreatePoduct/></div>
  )
}

export default page