// app/providers.tsx

"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <AuthUIProvider
      authClient={authClient}
      credentials={false}
      social={{
        providers: ["google", "github"],
      }}
      navigate={router.push}
      redirectTo="/"
    >
      {children}
    </AuthUIProvider>
  );
}
