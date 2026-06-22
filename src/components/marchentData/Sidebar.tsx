// import { useClerk, useUser, Protect } from '@clerk/clerk-react';
import {
  ArrowLeftRightIcon,
  LayoutDashboardIcon,
  Wallet,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import Dashboard from "./Dashboard";
import { useMerchantStore } from "@/stores/useMerchantStore";



interface prop {
  sidebar: boolean;
  setSidebar: (open: boolean) => void;
}

const Sidebar = ({ sidebar, setSidebar }: prop) => {
  
  
  const params = useParams();
  const pathname = usePathname();
  const merchant = useMerchantStore((state) => state.merchant);
  const basePath = `/${merchant?.id}/${merchant?.environment?.toLowerCase()}`;
  
  const navItems = [
    { to: `${basePath}/dashboard`, label: "Dashboard", Icon: LayoutDashboardIcon },
    { to: `${basePath}/transaction`, label: "Transaction", Icon: ArrowLeftRightIcon },
    { to: `${basePath}/wallet`, label: "Wallet", Icon: Wallet },
  ];

  

  return (
    <div
      className={`w-55 bg-black border-r border-gray-700 flex flex-col justify-between items-center max-sm:absolute top-14
      bottom-0 ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        {/* <img src={user ? user.imageUrl : "/favicon.svg"} alt="User avatar" className='w-13 rounded-full mx-auto'/>
       <h1 className='mt-1 text-center'>{user ? user.fullName : "Guest"}</h1> */}
        <div className="text-sm text-gray-600 font-medium mx-3 mt-3">
          {navItems.map(({ to, label, Icon }) => {
            const isActive = pathname.endsWith(to);
            return (
              <Link
                href={to} ///{marchetId}/{mode}/{to}
                key={to}
                onClick={() => setSidebar(false)}
                className={isActive
                      ? "bg-linear-to-r from-[#8ecd20] via-[#c8ff62e3] to-[#8ecd20] text-black rounded-xl font-semibold w-full px-5 py-2 flex items-center gap-3 mt-2"
                      :"text-gray-500 font-medium w-full px-6 py-2 flex items-center gap-3 rounded-xl hover:bg-[#b8ff3c]/10 hover:text-[#b8ff3c] mt-2"
                }
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
