"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" }
    ]
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/Documentation" },
      { label: "TypeScript SDK", href: "/Documentation/sdk/typescript" },
      { label: "Webhooks", href: "/Documentation/webhook/overview" }
    ]
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/auth/sign-in" },
      { label: "Create merchant", href: "/create_marchent" },
      { label: "Dashboard", href: "/auth/sign-in" }
    ]
  }
];

export function Footer() {
  const footer = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-footer-item]", {
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        scrollTrigger: { trigger: footer.current, start: "top 90%" }
      });
    },
    { scope: footer }
  );

  return (
    <footer ref={footer} className="border-t border-white/[0.07] bg-[#050605]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-7 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div data-footer-item>
            <a href="/" aria-label="PayyOSS home">
              <Image src="/logobig.png" alt="PayyOSS" width={1284} height={430} className="h-auto w-40" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
              Crypto payment infrastructure for modern businesses that want to accept stable value without unnecessary complexity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div data-footer-item key={column.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.17em] text-white/35">{column.title}</h2>
                <div className="mt-5 space-y-3.5">
                  {column.links.map((link) => (
                    <a key={link.label} href={link.href} className="block text-sm text-white/55 transition hover:text-[#b8ff3c]">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PayyOSS. All rights reserved.</p>
          <p>Built for borderless commerce.</p>
        </div>
      </div>
    </footer>
  );
}
