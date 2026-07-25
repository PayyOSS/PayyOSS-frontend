"use client";
import { authClient } from "@/lib/auth-client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UserMenu } from "./UserMenu";

const navItems = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "/Documentation" },
];

const navLink =
  "grid min-h-8 min-w-[76px] place-items-center rounded-full px-3.5 text-xs font-semibold text-white/60 transition hover:text-[#f5f5f0]";

export function Navbar() {
  const { data: session } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from(".navbar", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".navmid", {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
    });
  });

  return (
    <header
      className="relative z-50 grid items-center gap-4.5 md:grid-cols-[1fr_auto_1fr] max-md:grid-cols-[1fr_auto]"
      aria-label="PayyOSS primary navigation"
    >
      <a
        className="navbar inline-flex w-fit items-center"
        href="/"
        aria-label="PayyOSS home"
      >
        <Image
          src="/logobig.png"
          alt="PayyOSS"
          width={1284}
          height={430}
          priority
          className="h-auto w-28 md:w-36"
        />
      </a>

      <nav
        className="navmid mt-2 hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.025] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl md:inline-flex"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <a
            className={navLink}
            href={item.href}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="navbar inline-flex items-center justify-self-end gap-1">
        {!session?.user ? (
          <a
            href="/auth/sign-in"
            className="group hidden h-10 items-center gap-2 rounded-full bg-[#b8ff3c] px-5 text-sm font-extrabold text-[#111903] shadow-[0_12px_32px_rgba(184,255,60,0.16)] transition hover:-translate-y-0.5 hover:bg-[#c5ff61] lg:inline-flex"
          >
            Start building
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ) : (
          <UserMenu image={session?.user?.image} name={session?.user?.name} />
        )}

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:border-white/20 hover:bg-white/[0.08] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-[calc(100%+0.75rem)] origin-top rounded-2xl border border-white/10 bg-[#0a0d0a]/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition duration-200 md:hidden ${
          menuOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <nav className="grid" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold text-white/65 transition hover:bg-white/[0.05] hover:text-white"
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ArrowUpRight className="size-4 text-white/25" />
            </a>
          ))}
          {!session?.user && (
            <a
              href="/auth/sign-in"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#b8ff3c] px-4 text-sm font-extrabold text-[#111903]"
            >
              Start building
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
