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
      navigate={router.push} // tells AuthUIProvider how to navigate (Next.js router)
      redirectTo="http://localhost:3000/" // where to send users after successful login
    >
      {children}
    </AuthUIProvider>
  );
}
