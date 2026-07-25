"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-pricing-copy]", {
        x: -40,
        opacity: 0,
        duration: 0.85,
        scrollTrigger: { trigger: section.current, start: "top 72%" }
      });
      gsap.from("[data-pricing-card]", {
        x: 45,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 72%" }
      });
    },
    { scope: section }
  );

  return (
    <section id="pricing" ref={section} className="border-y border-white/[0.06] bg-[#070907] py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-7 lg:grid-cols-2 lg:px-10">
        <div data-pricing-copy>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">Transparent pricing</p>
          <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Start simple. Scale when your volume grows.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-white/50">
            Build and test your integration without setup complexity. Talk to our team for production rates tailored to your payment volume.
          </p>
          <div className="mt-9 grid max-w-lg grid-cols-3 gap-2">
            {[
              { step: "01", label: "Create workspace" },
              { step: "02", label: "Test checkout" },
              { step: "03", label: "Agree live rate" }
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                <p className="text-[10px] font-bold tracking-[0.16em] text-[#b8ff3c]">{item.step}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/65">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-pricing-card className="rounded-[30px] border border-[#b8ff3c]/20 bg-[linear-gradient(145deg,rgba(184,255,60,0.09),rgba(255,255,255,0.02))] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#b8ff3c]">Pay as you grow</p>
              <p className="mt-4 text-4xl font-bold tracking-tight">Custom rate</p>
            </div>
            <span className="rounded-full border border-[#b8ff3c]/15 bg-[#b8ff3c]/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#dfff9e]">
              For businesses
            </span>
          </div>
          <div className="my-7 h-px bg-white/[0.08]" />
          <div className="space-y-4">
            {["No setup fee", "Test and live environments", "Dashboard and API access", "Volume-based production pricing"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                <span className="grid size-6 place-items-center rounded-full bg-[#b8ff3c]/10 text-[#b8ff3c]">
                  <Check className="size-3.5" />
                </span>
                {item}
              </div>
            ))}
          </div>
          <a href="/auth/sign-in" className="group mt-8 flex h-13 items-center justify-center gap-2 rounded-xl bg-[#b8ff3c] text-sm font-bold text-black transition hover:bg-[#c5ff61]">
            Create your workspace
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
