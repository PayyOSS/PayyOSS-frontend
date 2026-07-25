"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const assets = [
  { name: "Polygon", mark: "P", note: "Fast settlement", color: "from-violet-500 to-violet-300" },
  { name: "Celo", mark: "C", note: "Mobile first", color: "from-yellow-400 to-emerald-400" },
  { name: "USDC", mark: "$", note: "Stablecoin", color: "from-blue-500 to-cyan-300" },
  { name: "USDT", mark: "₮", note: "Stablecoin", color: "from-emerald-500 to-teal-300" }
];

const capabilities = [
  { value: "Test + Live", label: "Separated environments" },
  { value: "Real time", label: "Payment status events" },
  { value: "One API", label: "Unified integration flow" }
];

export function Networks() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-network]", {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 78%" }
      });

      gsap.from("[data-capability]", {
        x: (index: number) => (index % 2 === 0 ? -55 : 55),
        opacity: 0,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-capability-list]",
          start: "top 92%",
          end: "top 62%",
          scrub: 0.5
        }
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="border-b border-white/[0.06] py-16 sm:py-20" aria-label="Supported networks and assets">
      <div className="mx-auto max-w-7xl px-4 sm:px-7 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div data-network className="max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">Built for stable value</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Payments your customers recognize.</h2>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3 lg:max-w-3xl lg:grid-cols-4">
            {assets.map((asset) => (
              <div
                data-network
                key={asset.name}
                className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.045]"
              >
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${asset.color} text-sm font-black text-black`}>
                  {asset.mark}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{asset.name}</p>
                  <p className="mt-0.5 text-[11px] text-white/35">{asset.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          data-capability-list
          className="mt-10 grid overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] sm:grid-cols-3"
        >
          {capabilities.map((item, index) => (
            <div
              data-capability
              key={item.value}
              className={`px-6 py-7 text-center ${
                index > 0 ? "border-t border-white/[0.07] sm:border-l sm:border-t-0" : ""
              }`}
            >
              <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{item.value}</p>
              <p className="mt-2 text-sm text-white/45">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
