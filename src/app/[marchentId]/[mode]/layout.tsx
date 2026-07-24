"use client"
import { AuthGuard } from "@/components/common/AuthGuard";
import Sidebar from "@/components/marchentData/Sidebar";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMerchantStore } from "@/stores/useMerchantStore";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { merchantWallet } = useMerchantWalletStore();
  const merchant = useMerchantStore((state) => state.merchant);
  const basePath = `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/wallet`;

  const [sidebar, setSidebar] = useState(false);

  const label = merchantWallet?.walletAddress ? merchantWallet.walletAddress.slice(0, 6) + "..." + merchantWallet.walletAddress.slice(-4) : "Connect wallet";

  return (
    <AuthGuard>
      <div className="fixed inset-0 flex h-screen flex-col items-start justify-start overflow-hidden">
      {/* ALWAYS visible */}

    <nav className='w-full py-3 px-3 md:px-8 max-h-17 sticky top-0 flex items-center justify-between bg-black'>
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

          <div className='flex justify-center items-center gap-3 sm:gap-4'>
            {
              sidebar ? <X className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=>setSidebar(false)}/>
               : <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=>setSidebar(true)}/>
            }
  
          <div>
             <button
               type="button"
               onClick={() => {router.push(`${basePath}`)}}
               className="h-9 max-w-37.5 truncate rounded-full cursor-pointer bg-[#b8ff3c] px-4 text-sm font-semibold text-black shadow-[0_0_24px_rgba(184,255,60,0.18)] transition hover:bg-[#a8ef2b] active:scale-95 sm:max-w-none"
             >
              {label}
            </button>
          </div>
          </div>
      </nav>

      <div className='flex min-h-0 w-full flex-1'>
       <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>

      {/* ONLY this changes with URL */}
      <div className="min-h-0 flex-1  overflow-y-auto rounded-tl-0 bg-[#0b0d0f] sm:rounded-tl-3xl">
        {children}
      </div>
      </div>
      </div>
    </AuthGuard>
  );
}
