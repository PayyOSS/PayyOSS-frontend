"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, KeyRound, Webhook } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Create your workspace",
    body: "Choose a test or live environment, connect your settlement wallet, and configure the assets you accept.",
    Icon: KeyRound
  },
  {
    number: "02",
    title: "Integrate once",
    body: "Use one API and a focused TypeScript SDK to create payment sessions from your product or checkout.",
    Icon: Code2
  },
  {
    number: "03",
    title: "Track every payment",
    body: "See transaction status in your dashboard and keep your systems in sync with signed webhook events.",
    Icon: Webhook
  }
];

export function HowItWorks() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-how-heading]", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: section.current, start: "top 75%" }
      });

      const media = gsap.matchMedia();

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, index) => {
          gsap.from(step, {
            x: index % 2 === 0 ? -160 : 160,
            opacity: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 94%",
              end: "top 58%",
              scrub: 0.5
            }
          });
        });
      });

      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, index) => {
          gsap.from(step, {
            x: index % 2 === 0 ? -48 : 48,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 94%",
              end: "top 70%",
              scrub: 0.35
            }
          });
        });
      });

      return () => media.revert();
    },
    { scope: section }
  );

  return (
    <section id="how-it-works" ref={section} className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-32 size-80 rounded-full bg-[#b8ff3c]/[0.04] blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-7 lg:px-10">
        <div data-how-heading className="mx-auto max-w-3xl text-center">
          <p className="text-[clamp(0.75rem,0.9vw,0.875rem)] font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">
            How PayyOSS works
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2.6rem,5vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.045em] text-white">
            From account to confirmed payment in three steps.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.35vw,1.18rem)] leading-8 text-white/55">
            A clear integration path for your developers and a focused operating view for your team.
          </p>
        </div>

        <div data-step-list className="mt-16 grid gap-6 overflow-hidden sm:mt-20">
          {steps.map(({ number, title, body, Icon }, index) => (
            <article
              data-step
              key={number}
              className={`group relative grid w-full max-w-5xl gap-6 overflow-hidden rounded-3xl border border-white/[0.07] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.014))] p-7 transition hover:border-[#b8ff3c]/20 sm:grid-cols-[92px_1fr_auto] sm:items-center sm:gap-8 sm:p-9 ${
                index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Step</span>
                <p className="mt-1 text-[clamp(2rem,3.5vw,3.25rem)] font-[850] leading-none text-white/15">{number}</p>
              </div>
              <div>
                <h3 className="text-[clamp(1.55rem,2.4vw,2rem)] font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.95rem,1.2vw,1.08rem)] leading-7 text-white/50">{body}</p>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl border border-[#b8ff3c]/15 bg-[#b8ff3c]/[0.06] text-[#b8ff3c] transition group-hover:scale-105 group-hover:bg-[#b8ff3c]/10 sm:size-14">
                <Icon className="size-5 sm:size-6" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
