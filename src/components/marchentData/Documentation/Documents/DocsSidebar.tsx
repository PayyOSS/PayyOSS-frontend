import { ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sidebarSections, supportCards } from "./docs-data";

type DocsSidebarProps = {
  currentPath: string;
};

export function DocsSidebar({ currentPath }: DocsSidebarProps) {
  const HelpIcon = supportCards[0].icon;

  return (
    <aside className="flex min-h-screen w-full max-w-[320px] flex-col overflow-y-auto border-r border-white/10 bg-[#061016]/95 px-4 py-8 text-white shadow-[22px_0_80px_rgba(0,0,0,0.32)] lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:h-screen max-lg:min-h-0 max-lg:max-w-none max-lg:border-b max-lg:border-r-0">
      <Link
        className="mb-9 flex items-center px-3"
        href="/Documentation/introcuction"
        aria-label="PayyOSS documentation home"
      >
        <Image
          src="/logobig.png"
          alt="PayyOSS"
          width={1284}
          height={430}
          priority
          className="h-auto w-44"
        />
        <span className="ml-2 border-l border-white/20 pl-2 text-lg font-semibold text-[#b8ff00]">
          Docs
        </span>
      </Link>

      <nav className="space-y-2">
        {sidebarSections.map((section) => {
          const Icon = section.icon;
          const isSectionActive =
            currentPath === section.href ||
            section.items.some((item) => currentPath === item.href);

          return (
            <div key={section.title}>
              <Link
                className={`flex h-12 items-center gap-3 rounded-lg px-4 text-sm font-semibold transition ${
                  isSectionActive
                    ? "border border-[#b8ff00] bg-[#b8ff00]/5 text-[#b8ff00]"
                    : "text-white hover:bg-white/[0.04]"
                }`}
                href={section.href}
                aria-current={currentPath === section.href ? "page" : undefined}
              >
                <Icon className="size-5" />
                <span className="flex-1">{section.title}</span>
                {section.items.length > 0 ? <ChevronDown className="size-4" /> : null}
              </Link>

              {section.items.length > 0 ? (
                <div className="ml-6 mt-2 space-y-1 border-l border-white/10 pl-3">
                  {section.items.map((item) => (
                    <Link
                      className={`flex h-10 items-center gap-3 text-sm ${
                        currentPath === item.href
                          ? "text-[#b8ff00]"
                          : "text-white/70 hover:text-white"
                      }`}
                      href={item.href}
                      key={item.title}
                      aria-current={currentPath === item.href ? "page" : undefined}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          currentPath === item.href ? "bg-[#b8ff00]" : "bg-white/30"
                        }`}
                      />
                      {item.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-8 max-lg:hidden">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-3 flex items-center gap-3">
            <HelpIcon className="size-5 text-[#b8ff00]" />
            <h2 className="font-semibold">{supportCards[0].title}</h2>
          </div>
          <p className="mb-5 text-sm leading-6 text-white/70">{supportCards[0].description}</p>
          <a
            className="flex h-12 items-center justify-center gap-3 rounded-md border border-white/10 bg-white/[0.02] font-semibold"
            href="#"
          >
            {supportCards[0].action}
            <ExternalLink className="size-4" />
          </a>
        </div>

        <a
          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-5"
          href="#"
        >
          <div>
            <h2 className="mb-2 font-semibold">{supportCards[1].title}</h2>
            <p className="flex items-center gap-2 text-sm text-white/70">
              <span className="size-2 rounded-full bg-[#b8ff00]" />
              {supportCards[1].description}
            </p>
          </div>
          <ExternalLink className="size-4" />
        </a>
      </div>
    </aside>
  );
}
