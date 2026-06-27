"use client";

import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Layers,
  Link2,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useMerchantStore } from "@/stores/useMerchantStore";

const trendData = [
  { label: "Mon", volume: 12400, payments: 22 },
  { label: "Tue", volume: 16900, payments: 29 },
  { label: "Wed", volume: 14200, payments: 25 },
  { label: "Thu", volume: 21300, payments: 38 },
  { label: "Fri", volume: 19800, payments: 34 },
  { label: "Sat", volume: 24600, payments: 43 },
  { label: "Sun", volume: 12100, payments: 39 },
];

const statusItems = [
  { label: "Confirmed", value: 186, color: "bg-[#b8ff3c]", text: "text-[#b8ff3c]" },
  { label: "Pending", value: 18, color: "bg-zinc-500", text: "text-zinc-300" },
  { label: "Issues", value: 6, color: "bg-amber-400", text: "text-amber-300" },
];

const recentPayments = [
  {
    id: "PY-1038",
    customer: "0x7F4a...91C2",
    amount: "420 USDC",
    status: "Confirmed",
    time: "2m ago",
  },
  {
    id: "PY-1037",
    customer: "0x2B9d...A001",
    amount: "0.18 ETH",
    status: "Pending",
    time: "11m ago",
  },
  {
    id: "PY-1036",
    customer: "0x9C12...F8D4",
    amount: "980 USDT",
    status: "Confirmed",
    time: "24m ago",
  },
  {
    id: "PY-1035",
    customer: "0x48De...B222",
    amount: "120 USDC",
    status: "Issue",
    time: "38m ago",
  },
];

const setupHealth = [
  {
    label: "Wallet",
    detail: "Default wallet verified",
    Icon: Wallet,
    ready: true,
  },
  {
    label: "Assets",
    detail: "4 active assets",
    Icon: Layers,
    ready: true,
  },
  {
    label: "Webhooks",
    detail: "1 retry queued",
    Icon: Link2,
    ready: false,
  },
];

const maxVolume = Math.max(...trendData.map((item) => item.volume));
const chartPoints = trendData
  .map((item, index) => {
    const x = (index / (trendData.length - 1)) * 100;
    const y = 100 - (item.volume / maxVolume) * 78 - 10;
    return `${x},${y}`;
  })
  .join(" ");

const totalStatusCount = statusItems.reduce((total, item) => total + item.value, 0);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const getStatusClass = (status: string) => {
  if (status === "Confirmed") {
    return "border-[#b8ff3c]/20 bg-[#b8ff3c]/10 text-[#b8ff3c]";
  }

  if (status === "Pending") {
    return "border-white/10 bg-white/5 text-zinc-300";
  }

  return "border-amber-400/20 bg-amber-400/10 text-amber-300";
};

const Dashboard = () => {
  const merchant = useMerchantStore((state) => state.merchant);
  const merchantName = merchant?.name || "Payyoss Store";
  const environment = merchant?.environment || "TEST";
  const basePath =
    merchant?.id && merchant?.environment
      ? `/${merchant.id}/${merchant.environment.toLowerCase()}`
      : "";

  const metrics = [
    {
      label: "Gross Volume",
      value: "$131.3K",
      delta: "+12.4%",
      Icon: CircleDollarSign,
    },
    {
      label: "Successful Payments",
      value: "186",
      delta: "+18",
      Icon: CheckCircle2,
    },
    {
      label: "Pending",
      value: "18",
      delta: "7 confirming",
      Icon: Clock3,
    },
    {
      label: "Conversion Rate",
      value: "88.6%",
      delta: "+3.1%",
      Icon: TrendingUp,
    },
  ];

  return (
    <main className="h-full min-h-0 overflow-y-auto p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Dashboard
              </h1>
              <span className="rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 px-3 py-1 text-xs font-semibold text-[#b8ff3c]">
                {environment}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{merchantName}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["24h", "7d", "30d"].map((range) => (
              <button
                key={range}
                type="button"
                className={`h-9 rounded-full border px-4 text-sm font-semibold transition active:scale-95 ${
                  range === "7d"
                    ? "border-[#b8ff3c]/30 bg-[#b8ff3c] text-black shadow-[0_0_24px_rgba(184,255,60,0.16)]"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:border-[#b8ff3c]/30 hover:text-[#b8ff3c]"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-[#05080A]/70 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <Activity className="h-4 w-4 text-[#b8ff3c]" />
                  Payment Volume
                </div>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  {formatCurrency(131300)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-zinc-500">Payments</p>
                <p className="mt-1 text-lg font-semibold">230</p>
              </div>
            </div>

            <div className="mt-6 h-48 sm:h-52">
              <svg
                className="h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                role="img"
                aria-label="Payment volume trend"
              >
                {[20, 40, 60, 80].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="100"
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.5"
                  />
                ))}
                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="#b8ff3c"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.6"
                  vectorEffect="non-scaling-stroke"
                />
                <polyline
                  points={`0,100 ${chartPoints} 100,100`}
                  fill="rgba(184,255,60,0.08)"
                  stroke="none"
                />
                {trendData.map((item, index) => {
                  const x = (index / (trendData.length - 1)) * 100;
                  const y = 100 - (item.volume / maxVolume) * 78 - 10;

                  return (
                    <circle
                      key={item.label}
                      cx={x}
                      cy={y}
                      r="1.5"
                      fill="#b8ff3c"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2 text-center text-xs text-zinc-500">
              {trendData.map((item) => (
                <span key={item.label}>{item.label}</span>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#05080A]/70 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <CreditCard className="h-4 w-4 text-[#b8ff3c]" />
              Payment Status
            </div>

            <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-white/5">
              {statusItems.map((item) => (
                <span
                  key={item.label}
                  className={item.color}
                  style={{ width: `${(item.value / totalStatusCount) * 100}%` }}
                />
              ))}
            </div>

            <div className="mt-7 space-y-5">
              {statusItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`size-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-zinc-400">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${item.text}`}>{item.value}</p>
                    <p className="text-xs text-zinc-600">
                      {Math.round((item.value / totalStatusCount) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, delta, Icon }) => (
            <article
              key={label}
              className="rounded-3xl border border-white/10 bg-[#05080A]/70 p-5 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">{label}</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight">
                    {value}
                  </p>
                </div>
                <span className="grid size-10 place-items-center rounded-2xl border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 text-[#b8ff3c]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-[#b8ff3c]">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {delta}
              </div>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <article className="rounded-3xl border border-white/10 bg-[#05080A]/70 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">Recent Transactions</h2>
                <p className="mt-1 text-sm text-zinc-500">Latest payment activity</p>
              </div>
              <Link
                href={basePath ? `${basePath}/transaction` : "#"}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#b8ff3c] transition hover:border-[#b8ff3c]/30 hover:bg-[#b8ff3c]/10"
              >
                View all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              {recentPayments.map((payment, index) => (
                <div
                  key={payment.id}
                  className={`grid grid-cols-[1fr_auto] gap-3 px-4 py-4 sm:grid-cols-[110px_1fr_110px_100px_auto] sm:items-center ${
                    index !== recentPayments.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <p className="font-mono text-sm text-zinc-300">{payment.id}</p>
                  <p className="min-w-0 truncate text-sm text-zinc-500">{payment.customer}</p>
                  <p className="text-right text-sm font-semibold text-white sm:text-left">
                    {payment.amount}
                  </p>
                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                  <p className="text-right text-xs text-zinc-600">{payment.time}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#05080A]/70 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <ShieldCheck className="h-4 w-4 text-[#b8ff3c]" />
              Setup Health
            </div>

            <div className="mt-6 space-y-5">
              {setupHealth.map(({ label, detail, Icon, ready }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-2xl border ${
                        ready
                          ? "border-[#b8ff3c]/20 bg-[#b8ff3c]/10 text-[#b8ff3c]"
                          : "border-amber-400/20 bg-amber-400/10 text-amber-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium">{label}</p>
                      <p className="truncate text-sm text-zinc-500">{detail}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      ready
                        ? "bg-[#b8ff3c]/10 text-[#b8ff3c]"
                        : "bg-amber-400/10 text-amber-300"
                    }`}
                  >
                    {ready ? "Ready" : "Check"}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
