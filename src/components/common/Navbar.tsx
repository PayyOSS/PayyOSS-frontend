"use client";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { UserMenu } from "./UserMenu";

const navItems = [
  "Home",
  "Activity",
  "Manage",
  "Program",
  "Folders",
  "Documents",
];

const navLink =
  "grid min-h-8 min-w-[76px] place-items-center rounded-full px-3.5 text-xs font-semibold text-white/60 transition hover:text-[#f5f5f0]";

export function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

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
        {!session?.user ? (
          <div
            onClick={() => router.push("/auth/sign-in")}
            className="relative group overflow-hidden hidden lg:block bg-[#85cb0d]/20 p-0.5 h-10 w-35 rounded-md active:scale-100 hover:scale-105 transition-all duration-300"
          >
            <button className="text-[#b8ff3c] cursor-pointer text-sm bg-linear-to-t from-black/50 to-black h-full w-full rounded transition-all">
              Get started
            </button>

            <div className="absolute -bottom-12 group-hover:-bottom-10 transition-all duration-200 left-1/2 -z-10 -translate-x-1/2 blur size-14 rounded-full bg-[#85cb0d]"></div>
          </div>
        ) : (
          <>
            <UserMenu image={session?.user?.image} name={session?.user?.name} />
          </>
        )}
      </div>
    </header>
  );
}
