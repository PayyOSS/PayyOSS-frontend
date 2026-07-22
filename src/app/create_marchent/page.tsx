import React from 'react'
import CreateMerchantForm from '@/components/common/CreateMerchant'

const page = () => {
  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden px-3 py-3 sm:px-5 sm:py-4">
      <div className="pointer-events-none absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-[#b8ff3c]/6 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[8%] right-[8%] h-64 w-64 rounded-full bg-emerald-400/5 blur-[100px]" />
      <CreateMerchantForm />
    </main>
  )
}

export default page
