"use client";

import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import api from "@/config/axios";
import { useMerchantStore } from "@/stores/useMerchantStore";

export function UserMenu({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setMerchant = useMerchantStore((state) => state.setMerchant);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

   const handleClick = async () => {
  try {
    setIsLoading(true);
    const { data } = await api.get("merchant/userId");

    // no merchant found → go to create page
    if (!data.merchant || !data.merchant.id) {
      router.push("/create_marchent");
      return; // ← stop here, don't run the rest
    }

    // merchant exists → store it and go to dashboard
    setMerchant({
      id: data.merchant.id,
      name: data.merchant.name,
      imageUrl: data.merchant.imageUrl,
      email: data.merchant.email,
      environment: data.merchant.environment,
      status: data.merchant.status,
      businessType: data.merchant.businessType,
    });

    router.push(`/${data.merchant.id}/${data.merchant.environment.toLowerCase()}/dashboard`);
  } catch (error) {
    console.log("error", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={() => setOpen((prev) => !prev)} className="size-9 rounded-full hover:scale-110 transition-all cursor-pointer overflow-hidden border border-white/10">
        <img
          src={image || "/default-avatar.png"}
          alt={name || "User"}
          className="h-full w-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute flex flex-col gap-2 right-5 top-12 w-40 rounded-xl border border-white/10 bg-[#111] p-2 shadow-lg">
          <button onClick={handleClick} className="w-full flex justify-center items-center gap-1.5 cursor-pointer rounded-lg px-3 py-2 text-center text-sm text-[#b8ff3c]/80 bg-white/5 hover:bg-white/10 active:scale-95 transition-transform duration-150">
           {isLoading && (
             <LoaderCircle className="h-5 w-5 animate-spin text-[#b8ff3c]" />
           )}
           <span>
             {isLoading ? "Redirecting..." : "Dashboard"}
           </span>
          </button>

          <button onClick={async () => {await authClient.signOut();}} className="w-full text-center cursor-pointer rounded-lg px-3 py-2 text-sm text-red-400 bg-white/5 hover:bg-white/10 active:scale-95 transition-transform duration-150">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
