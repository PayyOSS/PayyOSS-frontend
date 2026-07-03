import {
  ArrowLeftRightIcon,
  KeyRound,
  Layers,
  LayoutDashboardIcon,
  Store,
  Wallet,
  Webhook,
  Workflow,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import { useMerchantStore } from "@/stores/useMerchantStore";

interface prop {
  sidebar: boolean;
  setSidebar: (open: boolean) => void;
}

const Sidebar = ({ sidebar, setSidebar }: prop) => {
  const pathname = usePathname();
  const router = useRouter();
  const merchant = useMerchantStore((state) => state.merchant);

  const navItems = [
    { to: `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/dashboard`, label: "Dashboard", Icon: LayoutDashboardIcon },
    { to: `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/transaction`, label: "Transaction", Icon: ArrowLeftRightIcon },
    { to: `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/merchant`, label: "Merchant", Icon: Store },
  ];

  const manageNavitem = [
    { to: `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/wallet`, label: "Wallet", Icon: Wallet },
    { to: `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/assets`, label: "Assets", Icon: Layers },
    { to: `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/api-key`, label: "Api-key", Icon: KeyRound },
    { to: `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/webhook`, label: "Webhook", Icon: Workflow },

  ]

  useEffect(() => {
  if (!merchant?.id) return;
  navItems.forEach(({ to }) => {
    router.prefetch(to); // ✅ just `to`, not `basePath/to`
  });
}, []);

  return (
    <div
      className={`w-55 bg-black z-50 flex flex-col justify-between items-center max-sm:absolute top-14
      bottom-0 ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full flex flex-col gap-10">
        <div>
        <h1 className="text-gray-500 pl-3 font-medium text-[14px]">DETAILS</h1>
        <div className="text-sm text-[#b8ff3c]/20 font-medium mx-3 mt-3">
          {navItems.map(({ to, label, Icon }) => {
            const isActive = pathname === to;
            return (
              <Link
                href={to}
                key={to}
                prefetch={true}
                onClick={() => setSidebar(false)}
                className={
                  isActive
                    ? "bg-linear-to-r from-[#8ecd20] via-[#c8ff62e3] to-[#8ecd20] text-black rounded-xl font-semibold w-full px-5 py-2 flex items-center gap-3 mt-2 active:scale-95 transition-transform duration-150"
                    : "text-[#b8ff3c]/40 font-medium w-full px-6 py-2 flex items-center gap-3 rounded-xl hover:bg-[#b8ff3c]/10 hover:border-2 hover:border-[#b8ff3c]/30 hover:text-[#b8ff3c] mt-2.5 active:scale-95 active:bg-[#b8ff3c]/20 border-2 border-[#b8ff3c]/20 bg-[#b8ff3c]/5 transition-transform duration-150"
                }
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
        </div>
         
         {/* Manage NavItems */}
         <div>
        <h1 className="text-gray-500 pl-3 font-medium text-[14px]">MANAGE</h1>
        <div className="text-sm text-[#b8ff3c]/20 font-medium mx-3 mt-3">
          {manageNavitem.map(({ to, label, Icon }) => {
            const isActive = pathname === to;
            return (
              <Link
                href={to}
                key={to}
                prefetch={true}
                onClick={() => setSidebar(false)}
                className={
                  isActive
                    ? "bg-linear-to-r from-[#8ecd20] via-[#c8ff62e3] to-[#8ecd20] text-black rounded-xl font-semibold w-full px-5 py-2 flex items-center gap-3 mt-2 active:scale-95 transition-transform duration-150"
                    : "text-[#b8ff3c]/40 font-medium w-full px-6 py-2 flex items-center gap-3 rounded-xl hover:bg-[#b8ff3c]/10 hover:border-2 hover:border-[#b8ff3c]/30 hover:text-[#b8ff3c] mt-2.5 active:scale-95 active:bg-[#b8ff3c]/20 border-2 border-[#b8ff3c]/20 transition-transform duration-150"
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
    </div>
  );
};

export default Sidebar;