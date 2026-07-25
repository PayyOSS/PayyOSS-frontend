"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fingerprint, KeyRound, ShieldCheck, WalletCards } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const safeguards = [
  { title: "Signed events", body: "Validate webhook signatures and timestamps before your systems process an event.", Icon: Fingerprint },
  { title: "Environment isolation", body: "Keep test credentials and production activity clearly separated.", Icon: KeyRound },
  { title: "Merchant-controlled wallet", body: "Configure a settlement wallet for the assets your business accepts.", Icon: WalletCards }
];

export function Security() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-security-copy]", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: section.current, start: "top 74%" }
      });
      gsap.from("[data-safeguard]", {
        x: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        scrollTrigger: { trigger: "[data-safeguards]", start: "top 76%" }
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-7 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div data-security-copy className="relative overflow-hidden rounded-[30px] border border-[#b8ff3c]/15 bg-[#b8ff3c]/[0.045] p-8 sm:p-10">
          <div className="absolute -right-20 -top-20 size-60 rounded-full bg-[#b8ff3c]/10 blur-3xl" />
          <span className="relative grid size-14 place-items-center rounded-2xl border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 text-[#b8ff3c]">
            <ShieldCheck className="size-7" />
          </span>
          <p className="relative mt-14 text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">Security by design</p>
          <h2 className="relative mt-4 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Protection built into the payment lifecycle.
          </h2>
          <p className="relative mt-6 text-base leading-8 text-white/55">
            PayyOSS helps your team protect credentials, verify payment events, and keep operational environments organized.
          </p>
        </div>

        <div data-safeguards className="grid content-center gap-4">
          {safeguards.map(({ title, body, Icon }) => (
            <article data-safeguard key={title} className="flex gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.022] p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-[#b8ff3c]">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-white/50">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
