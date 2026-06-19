"use client";

import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export function UserMenu({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="size-9 rounded-full overflow-hidden border border-white/10"
      >
        <img
          src={image || "/default-avatar.png"}
          alt={name || "User"}
          className="h-full w-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-40 rounded-xl border border-white/10 bg-[#111] p-2 shadow-lg">
          <button
            onClick={async () => {
              await authClient.signOut();
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}