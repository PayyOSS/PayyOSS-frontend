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
      redirectTo={process.env.CLIENT_URL} // where to send users after successful login
    >
      {children}
    </AuthUIProvider>
  );
}
