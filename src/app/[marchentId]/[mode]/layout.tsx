"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UserMenu } from "@/components/common/UserMenu";
import Sidebar from "@/components/marchentData/Sidebar";
import { authClient } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMerchantStore } from "@/stores/useMerchantStore";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const merchant = useMerchantStore((state) => state.merchant);
  const basePath = `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/wallet`;

  const [sidebar, setSidebar] = useState(false);

  return (
    <div className=" className='flex flex-col items-start justify-start h-screen fixed top-0 left-0 right-0 bottom-0'">
      {/* ALWAYS visible */}

    <nav className='w-full py-5 px-3 md:px-8 max-h-17 sticky top-0 flex items-center justify-between bg-black'>
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
            <ConnectButton.Custom>
              {({
                account,
                chain,
                mounted,
                openAccountModal,
                openConnectModal,
              }) => {
                const connected = mounted && account && chain;
                const label = connected ? account.displayName : "Connect Wallet";

                return (
                  <button
                    type="button"
                    onClick={connected ? () => router.push(`${basePath}`) : () => {router.push(`${basePath}`); }}
                    className="h-9 max-w-37.5 truncate rounded-full cursor-pointer bg-[#b8ff3c] px-4 text-sm font-semibold text-black shadow-[0_0_24px_rgba(184,255,60,0.18)] transition hover:bg-[#a8ef2b] active:scale-95 sm:max-w-none"
                  >
                  {label}
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </div>
          </div>
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
       <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>

      {/* ONLY this changes with URL */}
      <div className="flex-1 rounded-tl-0  sm:rounded-tl-3xl bg-[#111111]">
        {children}
      </div>
      </div>
    </div>
  );
}
