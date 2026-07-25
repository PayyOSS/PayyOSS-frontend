"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function CallToAction() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-cta]", {
        y: 45,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 78%" }
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="px-4 pb-24 sm:px-7 sm:pb-32">
      <div
        data-cta
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-[#b8ff3c]/20 bg-[#b8ff3c] px-6 py-16 text-center text-[#0b0f03] shadow-[0_30px_90px_rgba(184,255,60,0.12)] sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.65),transparent_25rem),linear-gradient(115deg,transparent_55%,rgba(0,0,0,0.08))]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/55">Ready to launch?</p>
          <h2 className="mt-4 text-balance text-4xl font-[850] tracking-[-0.05em] sm:text-6xl">
            Make crypto payments feel like a normal part of your business.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
            Create your PayyOSS workspace, test the integration, and give your customers a borderless way to pay.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/auth/sign-in" className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-bold text-white transition hover:-translate-y-0.5">
              Start building
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="/Documentation" className="inline-flex h-13 items-center justify-center rounded-xl border border-black/15 bg-white/30 px-6 text-sm font-bold text-black transition hover:bg-white/45">
              View documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
