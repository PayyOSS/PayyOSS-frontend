"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    question: "Which networks and assets can I accept?",
    answer: "PayyOSS currently supports configured stablecoin payment flows including USDC and USDT on supported Polygon and Celo environments. Available networks can differ between test and live mode."
  },
  {
    question: "Can I test the integration before going live?",
    answer: "Yes. Test mode keeps development credentials, assets, and transaction activity separate from your live merchant environment."
  },
  {
    question: "How does PayyOSS notify my application?",
    answer: "Your application receives webhook events as a payment changes state. Verify the event signature and timestamp before updating an order or granting access."
  },
  {
    question: "Where are customer payments settled?",
    answer: "You configure the merchant wallet used for supported settlement flows. This keeps the destination visible and manageable from your workspace."
  },
  {
    question: "Do you offer an SDK?",
    answer: "Yes. The TypeScript SDK provides a focused client for creating checkout sessions and verifying webhook events. The documentation includes setup and integration examples."
  },
  {
    question: "How do production fees work?",
    answer: "Production pricing is based on your expected payment volume and integration needs. Contact the team for a tailored rate before launching."
  }
];

export function FAQ() {
  const section = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useGSAP(
    () => {
      gsap.from("[data-faq-heading]", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: section.current, start: "top 76%" }
      });
      gsap.from("[data-faq-item]", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-faq-list]", start: "top 80%" }
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-7">
        <div data-faq-heading className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">Questions, answered</p>
          <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Everything you need to start with confidence.
          </h2>
        </div>

        <div data-faq-list className="mt-14 divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article data-faq-item key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white/85 sm:text-lg">{item.question}</span>
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full border transition ${
                    isOpen ? "rotate-45 border-[#b8ff3c]/30 bg-[#b8ff3c]/10 text-[#b8ff3c]" : "border-white/10 text-white/45"
                  }`}>
                    <Plus className="size-4" />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 pr-12 text-sm leading-7 text-white/45">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
