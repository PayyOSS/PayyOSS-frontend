"use client";

import { useEffect } from "react";
import {
  ArrowLeftRightIcon,
  Dock,
  KeyRound,
  Layers,
  LayoutDashboardIcon,
  Store,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMerchantStore } from "@/stores/useMerchantStore";

interface SidebarProps {
  sidebar: boolean;
  setSidebar: (open: boolean) => void;
}

interface NavItem {
  to: string;
  label: string;
  Icon: LucideIcon;
}

const Sidebar = ({ sidebar, setSidebar }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ marchentId: string; mode: string }>();
  const merchant = useMerchantStore((state) => state.merchant);
  const merchantId = params.marchentId || merchant.id;
  const mode = params.mode || merchant.environment?.toLowerCase();
  const basePath = merchantId && mode ? `/${merchantId}/${mode}` : "";

  const detailItems: NavItem[] = [
    {
      to: `${basePath}/dashboard`,
      label: "Dashboard",
      Icon: LayoutDashboardIcon,
    },
    {
      to: `${basePath}/transaction`,
      label: "Transaction",
      Icon: ArrowLeftRightIcon,
    },
    { to: `${basePath}/merchant`, label: "Merchant", Icon: Store },
  ];

  const manageItems: NavItem[] = [
    { to: `${basePath}/wallet`, label: "Wallet", Icon: Wallet },
    { to: `${basePath}/assets`, label: "Assets", Icon: Layers },
    { to: `${basePath}/api-key`, label: "API Key", Icon: KeyRound },
    { to: `${basePath}/webhook`, label: "Webhook", Icon: Workflow },
  ];

  useEffect(() => {
    if (!basePath) return;

    [...detailItems, ...manageItems].forEach(({ to }) => {
      router.prefetch(to);
    });
  }, [basePath, router]);

  return (
    <aside
      className={`relative z-50 flex w-60 shrink-0 flex-col overflow-hidden border-r border-white/[0.07] bg-[#050708]/97 px-3 pb-5 pt-6 shadow-[18px_0_55px_rgba(0,0,0,0.22)] backdrop-blur-xl max-sm:absolute max-sm:bottom-0 max-sm:top-14 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-transform duration-300 ease-out`}
    >
      <div className="pointer-events-none absolute -left-16 top-20 size-44 rounded-full bg-[#b8ff3c]/[0.035] blur-3xl" />

      <div className="relative flex min-h-0 flex-1 flex-col gap-8 overflow-x-hidden overflow-y-auto">
        <SidebarGroup
          title="Details"
          items={detailItems}
          pathname={pathname}
          onNavigate={() => setSidebar(false)}
          onPrefetch={(to) => router.prefetch(to)}
          highlighted
        />

        <SidebarGroup
          title="Manage"
          items={manageItems}
          pathname={pathname}
          onNavigate={() => setSidebar(false)}
          onPrefetch={(to) => router.prefetch(to)}
        />
      </div>

      <div className="relative mt-5 border-t border-white/[0.07] pt-4">
        <Link
          href="/Documentation"
          onClick={() => setSidebar(false)}
          className="group/link flex h-11 w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-sm font-medium text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b8ff3c]/20 hover:bg-[#b8ff3c]/[0.055] hover:text-[#dfff9e] active:scale-[0.98]"
        >
          <span className="grid size-8 place-items-center rounded-lg border border-white/[0.07] bg-black/20 text-zinc-600 transition-colors group-hover/link:border-[#b8ff3c]/20 group-hover/link:text-[#b8ff3c]">
            <Dock className="size-[17px]" />
          </span>
          <span>Documentation</span>
          <span className="ml-auto text-base text-zinc-700 transition-all group-hover/link:translate-x-0.5 group-hover/link:text-[#b8ff3c]">
            →
          </span>
        </Link>
      </div>
    </aside>
  );
};

function SidebarGroup({
  title,
  items,
  pathname,
  onNavigate,
  onPrefetch,
  highlighted = false,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
  onNavigate: () => void;
  onPrefetch: (to: string) => void;
  highlighted?: boolean;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2 px-3">
        <span
          className={`size-1.5 rounded-full ${
            highlighted
              ? "bg-[#b8ff3c] shadow-[0_0_10px_rgba(184,255,60,0.65)]"
              : "bg-white/25"
          }`}
        />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {title}
        </h2>
      </div>

      <nav className="relative space-y-1 pl-5 pr-1 text-sm font-medium">
        <span
          className={`pointer-events-none absolute bottom-5 left-2 top-5 w-px bg-gradient-to-b ${
            highlighted
              ? "from-[#b8ff3c]/35 via-white/10 to-transparent"
              : "from-white/15 via-white/[0.07] to-transparent"
          }`}
        />

        {items.map(({ to, label, Icon }) => {
          const isActive = pathname === to;

          return (
            <Link
              href={to}
              key={to}
              prefetch
              onMouseEnter={() => onPrefetch(to)}
              onFocus={() => onPrefetch(to)}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`group/link relative flex h-11 w-full items-center gap-3 rounded-xl border px-3 transition-all duration-200 active:scale-[0.98] ${
                isActive
                  ? "border-[#b8ff3c]/20 bg-[linear-gradient(90deg,rgba(184,255,60,0.13),rgba(184,255,60,0.035))] text-[#dfff9e] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_24px_rgba(0,0,0,0.18)]"
                  : "border-transparent text-zinc-500 hover:translate-x-1 hover:border-white/[0.07] hover:bg-white/[0.035] hover:text-zinc-100"
              }`}
            >
              <span
                className={`pointer-events-none absolute -left-3 top-1/2 h-px w-3 -translate-y-1/2 ${
                  isActive ? "bg-[#b8ff3c]/55" : "bg-white/10"
                }`}
              />
              <span
                className={`pointer-events-none absolute -left-[15px] top-1/2 size-1.5 -translate-y-1/2 rounded-full border ${
                  isActive
                    ? "border-[#b8ff3c] bg-[#050708] shadow-[0_0_8px_rgba(184,255,60,0.65)]"
                    : "border-white/20 bg-[#050708]"
                }`}
              />
              <span
                className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-lg border transition-all duration-200 ${
                  isActive
                    ? "border-[#b8ff3c]/25 bg-[#b8ff3c]/10 text-[#b8ff3c]"
                    : "border-white/[0.06] bg-white/[0.025] text-zinc-600 group-hover/link:border-white/10 group-hover/link:text-[#b8ff3c]"
                }`}
              >
                <Icon className="size-[17px] transition-transform duration-200 group-hover/link:scale-110" />
              </span>
              <span className="truncate">{label}</span>
              {isActive ? (
                <span className="ml-auto h-5 w-0.5 rounded-full bg-[#b8ff3c] shadow-[0_0_10px_rgba(184,255,60,0.7)]" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}

export default Sidebar;
