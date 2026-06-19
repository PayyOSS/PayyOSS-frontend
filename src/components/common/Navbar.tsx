"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navItems = ["Home", "Activity", "Manage", "Program", "Folders", "Documents"];

const navLink =
  "grid min-h-8 min-w-[76px] place-items-center rounded-full px-3.5 text-xs font-semibold text-white/60 transition hover:text-[#f5f5f0]";

export function Navbar() {

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
  },);

  return (
    <header
      className="grid items-center gap-4.5 md:grid-cols-[1fr_auto_1fr] max-md:grid-cols-[1fr_auto]"
      aria-label="PayyOss primary navigation"
    >
      <a
        className="navbar inline-flex w-fit items-center gap-2 text-sm font-bold leading-none"
        href="#"
        aria-label="PayyOss home"
      >
        <span className="grid size-8 md:size-10 place-items-center rounded-full bg-[#b8ff3c] text-2xl md:text-3xl font-black leading-none text-[#111804]">
          P
        </span>
        <span className="text-xl md:text-2xl">PayyOSS</span>
      </a>

      <nav
        className="navmid md:inline-flex hidden items-center gap-1 rounded-full border-b border-white/10 p-1 pb-2 max-md:col-span-full max-md:row-start-2 max-md:max-w-full max-md:justify-self-center max-md:overflow-x-auto"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <a
            className={`${navLink} ${item === "Home" ? "bg-white/10 text-[#f5f5f0]" : ""}`}
            href="#"
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="navbar inline-flex items-center justify-self-end gap-1">
        <a
          className="sm:grid min-h-8 place-items-center rounded-full px-4 text-lg font-semibold text-white/60 transition hover:text-[#f5f5f0] hidden"
          href="#"
        >
          Log in
        </a>
        <a
          className="grid min-h-8 place-items-center rounded-full bg-[#b8ff3c] px-4 text-[15px] font-semibold text-[#122004] transition hover:-translate-y-px"
          href="#"
        >
          Sign up
        </a>
      </div>
    </header>
  );
}
