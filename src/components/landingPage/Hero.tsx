import { Navbar } from "@/components/common/Navbar";
import Image from "next/image";

const ledgerItems = [
  { label: "Virtual Cards", value: "$22,430.80" },
  { label: "Savings", value: "$34,023.10" }
];

const spendingItems = [
  { label: "Housing", value: "$8,600.00", width: "88%" },
  { label: "Friends & Family", value: "$2,090.00", width: "43%" },
  { label: "Education", value: "$4,320.00", width: "56%" },
  { label: "Other", value: "$2,800.00", width: "35%" }
];

const people = ["AR", "MS", "JD", "KT", "NL"];
const dashboardTabs = ["Overview", "Activity", "Manage", "Program", "Folders", "Documents"];
const sidebarItems = ["C", "O", "A", "M", "P", "F", "D", "S"];

const panel =
  "min-h-[210px] min-w-0 rounded-[18px] border border-white/10 bg-white/[0.035] p-4.5 max-md:min-h-[180px] max-md:rounded-[14px] max-md:p-3.5 max-sm:min-h-[160px] max-sm:rounded-[12px] max-sm:p-3";

export function Hero() {
  return (
    <main className="min-h-svh overflow-hidden mb-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_10rem),#030403]">
      <section
        className="relative isolate mx-auto min-h-svh w-full max-w-full overflow-hidden px-5 pt-6 sm:px-[clamp(20px,5vw,96px)] max-sm:px-3 max-sm:pt-4"
        aria-labelledby="hero-title"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-size-[96px_96px] mask-[radial-gradient(circle_at_50%_18%,black,transparent_65%)]" />
        <div className="pointer-events-none absolute -left-40 top-5 -z-10 size-88 rounded-full bg-white/30 opacity-35 blur-[72px]" />
        <div className="pointer-events-none absolute -right-44 bottom-36 -z-10 size-88 rounded-full bg-[#b8ff3c]/20 opacity-35 blur-[72px]" />

        <Navbar />

        <div className="mx-auto mt-[clamp(58px,11vh,118px)] grid w-full max-w-212.5 justify-items-center text-center max-md:mt-[clamp(40px,8vh,80px)] max-sm:mt-[clamp(32px,6vh,56px)]">
          

          <h1
           id="hero-title"
           className="max-w-200 px-10 text-balance text-[clamp(38px,5.8vw,74px)] font-[850] leading-[1.3] md:leading-[1.1] text-[#fbfbf6] max-md:text-[clamp(32px,6.5vw,52px)] max-sm:text-[clamp(40px,8vw,42px)] max-sm:max-w-[90vw]">
             Grow your business by accepting{" "}
           <b className="inline-block bg-[#b8ff3c]/70 text-black px-3 pb-2 md:pb-5 mt-2 py-0.4 rounded-xl leading-none align-middle">
             "Crypto"
           </b>{" "}
             payment
          </h1>
          <p className="mt-7 w-full max-w-155 text-balance text-[clamp(14px,1.4vw,16px)] font-medium leading-[1.55] text-white/60 max-md:mt-5 max-md:max-w-120 max-sm:mt-4 max-sm:max-w-[85vw] max-sm:text-[13px]">
            Finance management involves planning, organizing, and controlling financial
            resources to achieve personal or organizational goals.
          </p>

          {/* <div className="mt-7.5 flex flex-wrap justify-center gap-3.5 max-md:mt-6 max-sm:mt-5 max-sm:gap-2.5">
            <a
              className="grid min-h-11 min-w-33 place-items-center rounded-full bg-[#b8ff3c] text-[15px] font-extrabold text-[#121d03] shadow-[0_16px_40px_rgba(184,255,60,0.2)] transition hover:-translate-y-px max-sm:min-h-10 max-sm:min-w-28 max-sm:text-[13px]"
              href="#"
            >
              Get Started
            </a>
            <a
              className="grid min-h-11 min-w-33 place-items-center rounded-full bg-[#f4f2ea] text-[15px] font-extrabold text-[#131313] transition hover:-translate-y-px max-sm:min-h-10 max-sm:min-w-28 max-sm:text-[13px]"
              href="#"
            >
              Get a Demo
            </a>
          </div> */}
        </div>

        <DashboardPreview />

      </section>
    </main>
  );
}

function DashboardPreview() {
  return (
    <div
      className="relative mb-10 md:mx-auto mt-[clamp(48px,8vh,72px)] max-w-100 md:max-w-290 overflow-hidden rounded-t-[28px] bg-white/7 shadow-[0_32px_120px_rgba(0,0,0,0.56)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[48%] after:bg-[linear-gradient(180deg,transparent,#030403_92%)] max-md:mt-[clamp(36px,6vh,56px)] max-md:rounded-t-[22px] max-sm:left-1/2 max-sm:mt-[clamp(28px,5vh,44px)] max-sm:w-full max-sm:-translate-x-1/2 max-sm:rounded-t-[18px]"
      aria-label="PayyOSS dashboard preview"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 max-lg:grid-cols-[1fr_auto] max-md:gap-3 max-md:px-4 max-md:py-3 max-sm:gap-2 max-sm:px-3 max-sm:py-2.5">
        <a
          className="inline-flex w-fit items-center"
          href="/"
          aria-label="PayyOSS overview"
        >
          <Image
            src="/logobig.png"
            alt="PayyOSS"
            width={1284}
            height={430}
            className="h-auto w-18 max-sm:w-15"
          />
        </a>

        <div
          className="inline-flex gap-1 rounded-full border border-white/10 bg-white/2 p-1 max-md:hidden"
          aria-hidden="true"
        >
          {dashboardTabs.map((tab, index) => (
            <span
              className={`grid min-h-6.5 min-w-17 place-items-center text-[10px] font-bold text-white/60 ${
                index === 0 ? "rounded-full bg-white/10 text-[#f5f5f0]" : ""
              }`}
              key={tab}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-2.5 max-sm:gap-1.5" aria-hidden="true">
          <span className="size-6.5 rounded-full border border-white/10 bg-white/3 max-sm:size-5.5" />
          <span className="size-6.5 rounded-full border border-white/10 bg-white/3 max-sm:size-5.5" />
          <b className="grid size-7.5 place-items-center rounded-full border-2 border-[#b8ff3c]/50 bg-blue-500 text-[10px] text-[#f7d9a6] max-sm:size-6.5">
            AK
          </b>
        </div>
      </div>

      <div className="grid min-h-100 grid-cols-[58px_1fr] max-md:grid-cols-[50px_1fr] max-md:min-h-80 max-sm:grid-cols-[40px_1fr] max-sm:min-h-60">
        <aside
          className="grid content-start justify-items-center gap-3.5 py-5.5 text-white/40 max-md:gap-3 max-md:py-4 max-sm:gap-2.5 max-sm:py-3"
          aria-hidden="true"
        >
          {sidebarItems.map((icon, index) => (
            <span
              className={`grid size-7 place-items-center rounded-full text-[13px] max-sm:size-5.5 max-sm:text-[11px] ${
                index === 2 ? "bg-white/10 text-[#f5f5f0]" : ""
              }`}
              key={`${icon}-${index}`}
            >
              {icon}
            </span>
          ))}
        </aside>

        <div className="pb-12 pr-5 pt-4.5 max-md:pb-10 max-md:pr-4 max-md:pt-3.5 max-sm:pb-8 max-sm:pr-2.5 max-sm:pt-3">
          <div className="mb-5.5 flex items-center justify-between gap-6 max-md:mb-4 max-md:gap-4 max-sm:mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <div>
              <p className="m-0 text-[clamp(24px,2.4vw,34px)] font-[820] text-[#f4f4ef] max-md:text-[clamp(20px,3vw,26px)] max-sm:text-[clamp(18px,5vw,22px)]">
                Good morning, Avirup
              </p>
              <span className="text-xs font-semibold text-white/40 max-sm:text-[10px]">
                Stay on top of your tasks, monitor progress, and track status.
              </span>
            </div>
            <button
              className="min-h-9.5 min-w-39 rounded-full border border-white/10 bg-white/4 text-xs font-bold text-[#f5f5f0] max-md:min-h-8 max-md:min-w-32 max-md:text-[11px] max-sm:hidden"
              type="button"
            >
              Create a Report
            </button>
          </div>

          <div className="grid grid-cols-[1.05fr_1fr_0.9fr] gap-4.5 max-lg:grid-cols-2 max-md:gap-3 max-sm:grid-cols-1 max-sm:gap-2.5">
            <article className={panel}>
              <PanelHeader title="Your Balance" />
              <strong className="mt-2.5 block text-[28px] leading-none text-[#f6f6f0] max-md:text-[24px] max-sm:text-[20px]">
                $56,454.20
              </strong>
              <div className="mt-4.5 grid gap-2.5">
                {ledgerItems.map((item) => (
                  <div
                    className="grid grid-cols-[34px_1fr_auto] items-center gap-2.5 rounded-[10px] bg-white/4 p-2.5 max-sm:grid-cols-[28px_1fr_auto] max-sm:gap-2 max-sm:p-2"
                    key={item.label}
                  >
                    <span className="size-7.5 rounded-[7px] bg-[linear-gradient(135deg,#7e5cff,#e5a0ff)] max-sm:size-6" />
                    <div>
                      <b className="block text-xs text-[#f5f5f0]">{item.value}</b>
                      <small className="block text-[10px] text-white/40">{item.label}</small>
                    </div>
                    <em className="text-[10px] not-italic text-white/40">Details</em>
                  </div>
                ))}
              </div>
            </article>

            <article className={panel}>
              <PanelHeader title="Spending Overview" />
              <div className="flex items-end gap-2.5">
                <strong className="mt-2.5 block text-[28px] leading-none text-[#f6f6f0] max-md:text-[24px] max-sm:text-[20px]">
                  $23,454.20
                </strong>
                <span className="grid min-h-5 min-w-12.5 place-items-center rounded-full bg-[#b8ff3c]/90 text-[10px] font-[850] text-[#192304]">
                  +3.89%
                </span>
              </div>
              <div className="mt-4.5 grid gap-2.5">
                {spendingItems.map((item) => (
                  <div className="grid gap-2" key={item.label}>
                    <div className="flex justify-between gap-2.5 text-[11px] text-white/60">
                      <span>{item.label}</span>
                      <b className="text-xs text-[#f5f5f0]">{item.value}</b>
                    </div>
                    <i
                      className="block h-1.75 rounded-full bg-[linear-gradient(90deg,#b8ff3c,rgba(184,255,60,0.16))]"
                      style={{ width: item.width }}
                    />
                  </div>
                ))}
              </div>
            </article>

            <article className={`${panel} hidden md:grid content-start gap-3 max-lg:col-span-2 max-md:gap-2.5 max-sm:col-span-1 max-sm:gap-2`}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="m-0 text-[15px] font-bold text-[#f8f8f2]">Quick Transfer</h2>
                <a className="text-[11px] font-bold text-white/60" href="#">
                  View All
                </a>
              </div>
              <small className="text-xs font-semibold text-white/40">Latest Transaction</small>
              <div className="flex items-center gap-2" aria-hidden="true">
                {people.map((person) => (
                  <span
                    className="grid size-8.5 place-items-center rounded-full border border-white/10 bg-[linear-gradient(135deg,#745f4a,#2a2924)] text-[10px] font-extrabold text-[#f7dfbf] max-sm:size-7"
                    key={person}
                  >
                    {person}
                  </span>
                ))}
                <button
                  className="grid size-8.5 place-items-center rounded-full bg-white/[0.07] text-[#f5f5f0] max-sm:size-7"
                  type="button"
                >
                  +
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  className="min-h-9.5 flex-1 rounded-full bg-white/[0.07] text-[11px] font-bold text-[#f5f5f0] max-sm:min-h-8 max-sm:text-[10px]"
                  type="button"
                >
                  Request Money
                </button>
                <button
                  className="min-h-9.5 flex-1 rounded-full bg-[#e9e8e0] text-[11px] font-bold text-[#161613] max-sm:min-h-8 max-sm:text-[10px]"
                  type="button"
                >
                  Send Money
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="m-0 text-[15px] font-bold text-[#f8f8f2]">{title}</h2>
      <span className="grid size-5.5 place-items-center rounded-full border border-white/10 text-[11px] text-white/40">
        i
      </span>
    </div>
  );
}
