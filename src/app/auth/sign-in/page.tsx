"use client";

import { AuthView } from "@daveyplate/better-auth-ui";
import { ArrowLeft, Check, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const trustPoints = [
  "Secure merchant authentication",
  "Real-time payment visibility",
  "Built for modern crypto businesses"
];

export default function SignInPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030604] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(184,255,60,0.13),transparent_26rem),radial-gradient(circle_at_88%_82%,rgba(63,116,255,0.08),transparent_28rem)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]]"
      />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1fr] lg:px-12 lg:py-12">
        <section className="mx-auto w-full max-w-lg lg:mx-0">
          <Link
            className="group mb-14 inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8ff3c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#030604]"
            href="/"
          >
            <span className="grid size-11 place-items-center rounded-xl border border-[#b8ff3c]/25 bg-[#b8ff3c]/10 text-[#b8ff3c] shadow-[0_10px_35px_rgba(184,255,60,0.1)] transition duration-300 group-hover:scale-105 group-hover:border-[#b8ff3c]/50 group-hover:bg-[#b8ff3c]/15">
              <Sparkles className="size-5" />
            </span>
            <span className="text-xl font-semibold tracking-tight">
              Payy<span className="text-[#b8ff3c]">OSS</span>
            </span>
          </Link>

          <div className="hidden lg:block">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-white/70">
              <ShieldCheck className="size-3.5 text-[#b8ff3c]" />
              Merchant workspace
            </span>

            <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-white xl:text-[58px]">
              Payments move fast.
              <span className="block text-white/45">Your dashboard should too.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-white/55">
              Sign in to manage your PayyOSS merchant account, monitor payments,
              and keep your integration moving.
            </p>

            <div className="mt-10 space-y-4">
              {trustPoints.map((point) => (
                <div className="flex items-center gap-3 text-sm text-white/70" key={point}>
                  <span className="grid size-6 place-items-center rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 text-[#b8ff3c]">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-125 lg:mx-0 lg:justify-self-end">
          <div className="mb-6 lg:hidden">
            <p className="text-sm font-medium text-[#b8ff3c]">Merchant workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Sign in to manage payments and your PayyOSS integration.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-px rounded-[28px] bg-linear-to-b from-white/15 via-white/5 to-transparent"
            />
            <AuthView
              pathname="sign-in"
              className="relative"
              classNames={{
                base: "w-full !max-w-none overflow-hidden rounded-[27px] !border-white/10 !bg-[#09100c]/95 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
                header: "space-y-2 px-6 pb-3 pt-7 sm:px-8 sm:pt-8",
                title: "!text-2xl !font-semibold !tracking-[-0.025em] !text-white sm:!text-[28px]",
                description: "!text-sm !leading-6 !text-white/50",
                content: "gap-5 px-6 pb-6 sm:px-8 sm:pb-7",
                continueWith: "text-white/35",
                separator: "!bg-white/10",
                footer: "border-t border-white/[0.07] bg-white/[0.015] px-6 py-5 !text-white/45 sm:px-8",
                footerLink: "!text-[#b8ff3c] decoration-[#b8ff3c]/30 underline-offset-4 transition-colors hover:!text-[#d1ff78] hover:decoration-[#d1ff78]",
                form: {
                  base: "gap-5",
                  label: "!text-sm !font-medium !text-white/75",
                  input: "h-12 rounded-xl !border-white/10 !bg-white/[0.045] px-4 !text-white shadow-none outline-none transition duration-200 placeholder:!text-white/25 hover:!border-white/20 focus-visible:!border-[#b8ff3c]/70 focus-visible:!ring-4 focus-visible:!ring-[#b8ff3c]/10",
                  button: "h-12 rounded-xl text-sm font-semibold transition duration-200",
                  primaryButton: "!bg-[#b8ff3c] !text-[#071006] shadow-[0_10px_30px_rgba(184,255,60,0.14)] hover:!-translate-y-0.5 hover:!bg-[#c8ff61] hover:shadow-[0_15px_35px_rgba(184,255,60,0.22)] active:!translate-y-0",
                  outlineButton: "!border-white/10 !bg-white/[0.035] !text-white/80 hover:!-translate-y-0.5 hover:!border-white/20 hover:!bg-white/[0.07] hover:!text-white active:!translate-y-0",
                  providerButton: "!border-white/10 !bg-white/[0.035] !text-white/80 [&_svg]:!size-[18px] hover:!-translate-y-0.5 hover:!border-white/20 hover:!bg-white/[0.07] hover:!text-white active:!translate-y-0",
                  icon: "!size-[18px] shrink-0",
                  secondaryButton: "!text-white/60 hover:!bg-white/[0.05] hover:!text-white",
                  forgotPasswordLink: "!text-white/50 underline-offset-4 transition-colors hover:!text-[#b8ff3c]",
                  checkbox: "!border-white/20 !bg-white/[0.04] data-[state=checked]:!border-[#b8ff3c] data-[state=checked]:!bg-[#b8ff3c] data-[state=checked]:!text-[#071006]",
                  error: "!text-red-300"
                }
              }}
            />
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-white/35 sm:flex-row">
            <Link
              className="group inline-flex items-center gap-2 rounded-md transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8ff3c]"
              href="/"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>
            <span className="inline-flex items-center gap-2">
              <LockKeyhole className="size-3.5 text-[#b8ff3c]/70" />
              Protected by secure authentication
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
