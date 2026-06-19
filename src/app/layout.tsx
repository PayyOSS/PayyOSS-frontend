import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "PayyOSS",
  description: "A production-ready financial dashboard hero section built with Next.js."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-w-80 bg-[radial-gradient(circle_at_8%_18%,rgba(255,255,255,0.11),transparent_22rem),radial-gradient(circle_at_88%_16%,rgba(184,255,60,0.07),transparent_18rem),#030403] font-sans text-[#f5f5f0]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
