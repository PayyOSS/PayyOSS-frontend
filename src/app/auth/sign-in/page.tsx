"use client";

import { AuthView } from "@daveyplate/better-auth-ui";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,255,60,0.15),transparent_40%)]" />

  <div className="relative z-10 w-full max-w-md">
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-white">
        Welcome to <span className="text-[#85cb0d]">PayyOSS</span>
      </h1>
      <p className="mt-2 text-[#85cb0d]">
        Secure crypto payments for modern businesses
      </p>
    </div>

    <AuthView
  pathname="sign-in"
  classNames={{
    base: `
      bg-[#85cb0d]/10
      backdrop-blur-xl
      border border-[#9fe51f]/10
      rounded-3xl
      shadow-[0_0_50px_rgba(184,255,60,0.35)]/30
      p-6
    `,
    content: `
      [&_button]:h-10
      [&_button]:text-sm
      [&_svg]:w-4
      [&_svg]:h-4
    `,
  }}
/>
  </div>
</main>
  );
}