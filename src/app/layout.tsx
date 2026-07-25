import type { Metadata } from "next";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Providers } from "./provider";
import WalletProviders from "@/components/common/walletProviders";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PayyOSS | Crypto Payment Infrastructure",
  description: "Accept stablecoin payments with a clean API, real-time transaction visibility, and secure webhook events.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-w-80 bg-[radial-gradient(circle_at_8%_18%,rgba(255,255,255,0.11),transparent_22rem),radial-gradient(circle_at_88%_16%,rgba(184,255,60,0.07),transparent_18rem),#030403] font-sans text-[#f5f5f0]">
        <Providers>
          <WalletProviders>
          {children}
          <Toaster position="top-right" />
          </WalletProviders>
        </Providers>
      </body>
    </html>
  );
}
