// app/providers.tsx

"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth-client";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthUIProvider
      authClient={authClient}
      credentials={false}
      social={{
        providers: ["google", "github"],
      }}
    >
      {children}
    </AuthUIProvider>
  );
}