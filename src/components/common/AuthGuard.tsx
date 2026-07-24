"use client";

import { authClient } from "@/lib/auth-client";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      const redirectTo = encodeURIComponent(pathname);
      router.replace(`/auth/sign-in?redirectTo=${redirectTo}`);
    }
  }, [isPending, pathname, router, session?.user]);

  if (isPending || !session?.user) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#030604] text-white">
        <div className="flex items-center gap-3 text-sm text-white/60">
          <LoaderCircle className="size-5 animate-spin text-[#b8ff3c]" />
          Checking your session...
        </div>
      </main>
    );
  }

  return children;
}
