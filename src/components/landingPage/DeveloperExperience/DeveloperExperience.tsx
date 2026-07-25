"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const code = `import PayyOSS from "payyoss";

const payyoss = new PayyOSS({
  apiKey: process.env.PAYYOSS_API_KEY
});

const payment = await payyoss.checkout.create({
  amount: "250.00",
  asset: "USDC",
  network: "polygon"
});

return payment.checkoutUrl;`;

export function DeveloperExperience() {
  const section = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.from("[data-dev-copy]", {
        x: -45,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: section.current, start: "top 72%" }
      });
      gsap.from("[data-code-window]", {
        x: 50,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 72%" }
      });
      gsap.from("[data-code-line]", {
        x: 15,
        opacity: 0,
        stagger: 0.035,
        duration: 0.35,
        scrollTrigger: { trigger: "[data-code-window]", start: "top 65%" }
      });
    },
    { scope: section }
  );

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="developers" ref={section} className="relative border-y border-white/[0.06] bg-[#070a08] py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b8ff3c]/[0.04] blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-7 lg:grid-cols-2 lg:px-10">
        <div data-dev-copy className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">Developer first</p>
          <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            A clean integration your team can understand.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/50">
            Create a checkout, send your customer to pay, and use verified events to update your product when funds arrive.
          </p>
          <a
            href="/Documentation/sdk/typescript"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#b8ff3c]"
          >
            Explore the TypeScript SDK
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div data-code-window className="overflow-hidden rounded-[26px] border border-white/10 bg-[#050706] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-[#b8ff3c]/50" />
              </div>
              <span className="text-[11px] font-medium text-white/35">checkout.ts</span>
            </div>
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/50 transition hover:text-white"
              aria-label="Copy integration example"
            >
              {copied ? <Check className="size-3.5 text-[#b8ff3c]" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto p-5 text-[12px] leading-7 text-white/70 sm:p-7 sm:text-[13px]">
            <code>
              {code.split("\n").map((line, index) => (
                <span data-code-line className="block" key={`${line}-${index}`}>
                  <span className="mr-5 inline-block w-4 select-none text-right text-white/15">{index + 1}</span>
                  <span className={line.includes("const ") || line.includes("import ") ? "text-[#dfff9e]" : ""}>{line || " "}</span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
