"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Braces, Boxes, Gauge, KeyRound, RadioTower, Wallet } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { title: "Simple payment API", body: "Create and track crypto payment sessions through a focused integration surface.", Icon: Braces },
  { title: "Test and live modes", body: "Develop safely in test mode, then move to production with a clearly separated environment.", Icon: Boxes },
  { title: "Real-time visibility", body: "Monitor payment status, volume, and transaction details from one merchant dashboard.", Icon: Gauge },
  { title: "Signed webhooks", body: "Verify event authenticity and keep internal order state synchronized as payments progress.", Icon: RadioTower },
  { title: "Secure API keys", body: "Create and manage environment-specific credentials without exposing sensitive values to clients.", Icon: KeyRound },
  { title: "Wallet settlement", body: "Configure where your supported assets settle and keep control of your payment flow.", Icon: Wallet }
];

export function Features() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-feature-heading]", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: section.current, start: "top 77%" }
      });
      gsap.from('[data-feature-row="top"]', {
        x: -90,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-feature-grid]",
          start: "top 92%",
          end: "top 52%",
          scrub: 0.5
        }
      });
      gsap.from('[data-feature-row="bottom"]', {
        x: 90,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-feature-grid]",
          start: "top 78%",
          end: "top 38%",
          scrub: 0.5
        }
      });
    },
    { scope: section }
  );

  return (
    <section id="features" ref={section} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-7 lg:px-10">
        <div data-feature-heading className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">Payment infrastructure</p>
          <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Everything you need to operate crypto payments professionally.
          </h2>
        </div>

        <div data-feature-grid className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, body, Icon }, index) => (
            <article
              data-feature
              data-feature-row={index < 3 ? "top" : "bottom"}
              key={title}
              className="group rounded-3xl border border-white/[0.07] bg-white/[0.022] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#b8ff3c]/20 hover:bg-[#b8ff3c]/[0.025]"
            >
              <span className="grid size-11 place-items-center rounded-2xl border border-white/[0.07] bg-black/20 text-white/55 transition group-hover:border-[#b8ff3c]/20 group-hover:text-[#b8ff3c]">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-white/50">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
