"use client";

import { Navbar } from "@/components/common/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const dashboardTabs = ["Dashboard", "Transaction", "Merchant", "Wallet", "Assets"];
const sidebarItems = ["C", "O", "A", "M", "P", "F", "D", "S"];

const statusItems = [
  { label: "Confirmed", value: "118", percent: "94%", color: "bg-[#b8ff3c]", text: "text-[#b8ff3c]" },
  { label: "Processing", value: "5", percent: "4%", color: "bg-amber-300", text: "text-amber-300" },
  { label: "Failed", value: "2", percent: "2%", color: "bg-red-400", text: "text-red-300" }
];

const panel =
  "min-h-[210px] min-w-0 rounded-[18px] border border-white/10 bg-white/[0.035] p-4.5 max-md:min-h-[180px] max-md:rounded-[14px] max-md:p-3.5 max-sm:min-h-[160px] max-sm:rounded-[12px] max-sm:p-3";

export function Hero() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const dashboardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-hero-dashboard]",
            start: "top 100%",
            end: "top 28%",
            scrub: 0.7,
            invalidateOnRefresh: true
          }
        });

        dashboardTimeline
          .fromTo(
            "[data-hero-dashboard]",
            {
              scale: 0.56,
              y: 230,
              z: -850,
              rotateX: 20,
              opacity: 0.08,
              transformOrigin: "center top"
            },
            {
              scale: 0.92,
              y: 44,
              z: -90,
              rotateX: 4,
              opacity: 0.88,
              duration: 0.72,
              ease: "power2.out",
              force3D: true
            }
          )
          .to("[data-hero-dashboard]", {
            scale: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.28,
            ease: "power1.out",
            force3D: true
          });
      });

      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-dashboard]",
          {
            scale: 0.72,
            y: 120,
            z: -420,
            rotateX: 13,
            opacity: 0.18,
            transformOrigin: "center top"
          },
          {
            scale: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            opacity: 1,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: "[data-hero-dashboard]",
              start: "top 98%",
              end: "top 52%",
              scrub: 0.55,
              invalidateOnRefresh: true
            }
          }
        );
      });

      return () => media.revert();
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      className="relative isolate min-h-svh w-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_10rem),#030403] px-5 pt-6 sm:px-[clamp(20px,5vw,96px)] max-sm:px-3 max-sm:pt-4"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-size-[96px_96px] [mask-image:radial-gradient(circle_at_50%_18%,black,transparent_65%)]" />
      <div className="pointer-events-none absolute -left-40 top-5 -z-10 size-88 rounded-full bg-white/30 opacity-35 blur-[72px]" />
      <div className="pointer-events-none absolute -right-44 bottom-36 -z-10 size-88 rounded-full bg-[#b8ff3c]/20 opacity-35 blur-[72px]" />

      <Navbar />

      <div className="mx-auto mt-[clamp(58px,11vh,118px)] grid w-full max-w-212.5 justify-items-center text-center max-md:mt-[clamp(40px,8vh,80px)] max-sm:mt-[clamp(32px,6vh,56px)]">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b8ff3c]/15 bg-[#b8ff3c]/[0.05] px-3 py-1.5 text-xs font-semibold text-[#dfff9e]">
          <span className="size-1.5 rounded-full bg-[#b8ff3c] shadow-[0_0_9px_#b8ff3c]" />
          Borderless payments for modern businesses
        </p>

        <h1
          id="hero-title"
          className="max-w-225 px-6 text-balance text-[clamp(38px,5.8vw,74px)] font-[850] leading-[1.3] text-[#fbfbf6] md:leading-[1.1] max-md:text-[clamp(32px,6.5vw,52px)] max-sm:max-w-[95vw] max-sm:px-2 max-sm:text-[clamp(40px,8vw,46px)]"
        >
          Grow your business by accepting{" "}
          <b className="mt-2 inline-block rounded-xl bg-[#b8ff3c]/80 px-3 pb-2 leading-none text-black md:pb-4">
            Crypto
          </b>{" "}
          payments
        </h1>

        <p className="mt-7 w-full max-w-165 text-balance text-[clamp(14px,1.4vw,17px)] font-medium leading-[1.65] text-white/55 max-sm:max-w-[88vw]">
          One clean API for stablecoin checkout, real-time payment visibility, merchant settlement, and signed webhook events.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="/auth/sign-in"
            className="grid min-h-11 min-w-40 place-items-center rounded-full bg-[#b8ff3c] px-5 text-sm font-extrabold text-[#121d03] shadow-[0_16px_40px_rgba(184,255,60,0.2)] transition hover:-translate-y-0.5"
          >
            Start building
          </a>
          <a
            href="/Documentation"
            className="grid min-h-11 min-w-40 place-items-center rounded-full border border-white/10 bg-white/[0.05] px-5 text-sm font-bold text-white/75 transition hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-white"
          >
            Read the docs
          </a>
        </div>
      </div>

      <div className="[perspective:1200px] [perspective-origin:50%_15%]">
        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div
      data-hero-dashboard
      className="relative mb-10 mt-[clamp(48px,8vh,72px)] max-w-100 transform-gpu overflow-hidden rounded-t-[28px] border border-white/[0.07] bg-[#090c0a] shadow-[0_32px_120px_rgba(0,0,0,0.56)] will-change-transform after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[38%] after:bg-[linear-gradient(180deg,transparent,#030403_94%)] md:mx-auto md:max-w-290 max-md:rounded-t-[22px] max-sm:left-1/2 max-sm:w-full max-sm:-translate-x-1/2 max-sm:rounded-t-[18px]"
      aria-label="PayyOSS dashboard preview"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 max-lg:grid-cols-[1fr_auto] max-md:px-4 max-md:py-3 max-sm:px-3 max-sm:py-2.5">
        <a className="inline-flex w-fit items-center" href="/" aria-label="PayyOSS overview">
          <Image src="/logobig.png" alt="PayyOSS" width={1284} height={430} className="h-auto w-18 max-sm:w-15" />
        </a>

        <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 max-md:hidden" aria-hidden="true">
          {dashboardTabs.map((tab, index) => (
            <span
              className={`grid min-h-6.5 min-w-17 place-items-center text-[10px] font-bold text-white/60 ${
                index === 0 ? "rounded-full bg-white/10 text-white" : ""
              }`}
              key={tab}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-2.5" aria-hidden="true">
          <span className="size-6.5 rounded-full border border-white/10 bg-white/[0.03]" />
          <span className="size-6.5 rounded-full border border-white/10 bg-white/[0.03]" />
          <b className="grid size-7.5 place-items-center rounded-full border-2 border-[#b8ff3c]/50 bg-blue-500 text-[10px] text-white">
            AK
          </b>
        </div>
      </div>

      <div className="grid min-h-100 grid-cols-[58px_1fr] max-md:min-h-80 max-md:grid-cols-[50px_1fr] max-sm:min-h-60 max-sm:grid-cols-[40px_1fr]">
        <aside className="grid content-start justify-items-center gap-3.5 py-5.5 text-white/40 max-sm:gap-2.5 max-sm:py-3" aria-hidden="true">
          {sidebarItems.map((icon, index) => (
            <span
              className={`grid size-7 place-items-center rounded-full text-[13px] max-sm:size-5.5 max-sm:text-[11px] ${
                index === 2 ? "bg-white/10 text-white" : ""
              }`}
              key={`${icon}-${index}`}
            >
              {icon}
            </span>
          ))}
        </aside>

        <div className="pb-12 pr-5 pt-4.5 max-md:pr-4 max-sm:pb-8 max-sm:pr-2.5 max-sm:pt-3">
          <div className="mb-5.5 flex items-center justify-between gap-6 max-sm:mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[clamp(24px,2.4vw,34px)] font-[820] text-[#f4f4ef] max-sm:text-[clamp(18px,5vw,22px)]">
                  Dashboard
                </p>
                <span className="rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 px-2 py-1 text-[9px] font-bold text-[#b8ff3c]">
                  TEST
                </span>
              </div>
              <span className="text-xs font-semibold text-white/40 max-sm:text-[10px]">
                PayyOSS Store
              </span>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              {["24h", "7d", "1m"].map((range) => (
                <span
                  key={range}
                  className={`grid h-8 min-w-11 place-items-center rounded-full border text-[10px] font-bold ${
                    range === "7d"
                      ? "border-[#b8ff3c]/30 bg-[#b8ff3c] text-black"
                      : "border-white/10 bg-white/[0.04] text-white/45"
                  }`}
                >
                  {range}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4.5 max-sm:grid-cols-1 max-sm:gap-2.5">
            <article className={panel}>
              <PanelHeader title="Payment volume" />
              <div className="mt-2.5 flex items-end gap-2">
                <strong className="block text-[28px] leading-none text-[#f6f6f0] max-sm:text-[20px]">48,290.80</strong>
                <span className="text-xs font-bold text-[#b8ff3c]">USDC</span>
              </div>
              <div className="mt-5 flex h-20 items-end gap-1.5 border-b border-white/[0.06]">
                {[30, 46, 38, 64, 52, 78, 68, 94, 81, 100].map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-t bg-gradient-to-t from-[#b8ff3c]/10 to-[#b8ff3c]"
                    style={{ height: `${height}%`, opacity: 0.28 + index * 0.065 }}
                  />
                ))}
              </div>
            </article>

            <article className={panel}>
              <PanelHeader title="Payment status" />
              <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-white/[0.05]">
                {statusItems.map((item) => (
                  <span key={item.label} className={item.color} style={{ width: item.percent }} />
                ))}
              </div>
              <div className="mt-5 grid gap-3">
                {statusItems.map((item) => (
                  <div className="flex items-center justify-between gap-3" key={item.label}>
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${item.color}`} />
                      <span className="text-xs text-white/50">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <b className={`block text-xs ${item.text}`}>{item.value}</b>
                      <span className="text-[9px] text-white/25">{item.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-4 hidden grid-cols-4 gap-3 md:grid">
            {[
              ["Confirmed volume", "46.8k"],
              ["Total payments", "125"],
              ["Other payments", "7"],
              ["Conversion rate", "94.4%"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/[0.07] bg-[#05080a]/70 p-3.5">
                <p className="text-[9px] text-white/35">{label}</p>
                <p className="mt-2 text-base font-bold text-white">{value}</p>
                <span className="mt-2 inline-block rounded-full bg-white/[0.05] px-2 py-0.5 text-[8px] text-white/35">
                  All time
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-bold text-[#f8f8f2]">{title}</h2>
      <span className="grid size-5.5 place-items-center rounded-full border border-white/10 text-[11px] text-white/40">i</span>
    </div>
  );
}
