"use client"
import Sidebar from "@/components/marchentData/Sidebar";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

    const [sidebar, setSidebar] = useState(false);

  return (
    <div className=" className='flex flex-col items-start justify-start h-screen fixed top-0 left-0 right-0 bottom-0'">
      {/* ALWAYS visible */}

    <nav className='w-full py-5 px-3 md:px-8 max-h-17 sticky top-0 flex items-center justify-between border-b bg-black border-gray-700'>
        <a href="/" className="flex items-center gap-2">
            <div className="relative">
              <span className="grid size-8.5 place-items-center rounded-full bg-[#b8ff3c] text-2xl font-black leading-none text-[#111804]">
                P
              </span>
            </div>
            <span className="text-[15px] md:text-[20px] font-semibold tracking-tight">
              <span className="text-foreground">Payy</span>
              <span className="gradient-text-blue">OSS</span>
            </span>
          </a>

          <div className='flex justify-center items-center gap-4'>
            {
              sidebar ? <X className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=>setSidebar(false)}/>
               : <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=>setSidebar(true)}/>
            }
  

          <span className="grid size-8.5 place-items-center rounded-full bg-blue-400 text-xl font-black leading-none text-[#111804]">
            A
          </span>
          </div>
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
       <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>

      {/* ONLY this changes with URL */}
      <div className="flex-1 bg-gray-800">
        {children}
      </div>
      </div>
    </div>
  );
}