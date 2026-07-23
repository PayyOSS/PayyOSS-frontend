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
import React, { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "@/config/axios";
import type { MerchantAssetDto } from "@/stores/useMerchantAssetStore";
import { useMerchantStore } from "@/stores/useMerchantStore";
import type { MerchantWalletDto } from "@/stores/useMerchantWalletStore";
import type { RecentTransectionsResponseDto } from "@/stores/useTransectionStore";
import type { WebHookDto } from "@/stores/useWebHookStore";

type AnalyticsRange = "24h" | "7d" | "1m";

interface PaymentAnalyticsBucket {
  periodStart: string;
  periodEnd: string;
  grossVolume: string;
  fees: string;
  refunds: string;
  netVolume: string;
  paymentCount: number;
}

interface PaymentAnalyticsAsset {
  chainId: number;
  tokenAddress: string | null;
  tokenSymbol: string | null;
  series: PaymentAnalyticsBucket[];
}

interface PaymentAnalyticsResponse {
  success: boolean;
  range: AnalyticsRange;
  environment: string;
  rangeStart: string;
  rangeEnd: string;
  assets: PaymentAnalyticsAsset[];
}

interface PaymentChartPoint {
  periodStart: string;
  grossVolume: number;
  fees: number;
  refunds: number;
  netVolume: number;
  paymentCount: number;
}

const analyticsRanges: AnalyticsRange[] = ["24h", "7d", "1m"];

interface WalletResponse {
  success: boolean;
  wallet: MerchantWalletDto;
}

interface AssetsResponse {
  success: boolean;
  assets: MerchantAssetDto[];
}

interface WebhooksResponse {
  success: boolean;
  webhooks: WebHookDto[];
}

const formatTokenAmount = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(value);

const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const formatBucketLabel = (
  periodStart: string,
  range: AnalyticsRange,
  long = false,
) => {
  const date = new Date(periodStart);

  if (Number.isNaN(date.getTime())) return periodStart;

  if (range === "24h") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: long ? "2-digit" : undefined,
      month: long ? "short" : undefined,
      day: long ? "numeric" : undefined,
      timeZone: "UTC",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: range === "7d" ? (long ? "long" : "short") : undefined,
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const getStatusClass = (status: string) => {
  if (status === "CONFIRMED") {
    return "border-[#b8ff3c]/20 bg-[#b8ff3c]/10 text-[#b8ff3c]";
  }

  if (status === "FAILED") {
    return "border-red-400/20 bg-red-400/10 text-red-300";
  }

  return "border-amber-400/20 bg-amber-400/10 text-amber-300";
};

const formatPaymentStatus = (status: string) =>
  status.charAt(0) + status.slice(1).toLowerCase();

const shortenValue = (value: string | null, start = 6, end = 4) => {
  if (!value) return "—";
  if (value.length <= start + end + 3) return value;
  return `${value.slice(0, start)}...${value.slice(-end)}`;
};

const formatRelativeTime = (dateValue: string) => {
  const timestamp = new Date(dateValue).getTime();
  if (Number.isNaN(timestamp)) return "—";

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "Just now";
  if (seconds < 3_600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86_400) return `${Math.floor(seconds / 3_600)}h ago`;
  if (seconds < 604_800) return `${Math.floor(seconds / 86_400)}d ago`;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(timestamp));
};

const Dashboard = () => {
  const merchant = useMerchantStore((state) => state.merchant);
  const merchantName = merchant?.name || "Payyoss Store";
  const environment = merchant?.environment || "TEST";
  const [activeRange, setActiveRange] = useState<AnalyticsRange>("7d");
  const [analytics, setAnalytics] = useState<PaymentAnalyticsResponse | null>(
    null,
  );
  const [selectedAssetKey, setSelectedAssetKey] = useState<string | null>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [transactions, setTransactions] =
    useState<RecentTransectionsResponseDto | null>(null);
  const [wallet, setWallet] = useState<MerchantWalletDto | null>(null);
  const [assets, setAssets] = useState<MerchantAssetDto[]>([]);
  const [webhooks, setWebhooks] = useState<WebHookDto[]>([]);
  const [isDashboardDataLoading, setIsDashboardDataLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState(false);
  const basePath =
    merchant?.id && merchant?.environment
      ? `/${merchant.id}/${merchant.environment.toLowerCase()}`
      : "";

  useEffect(() => {
    if (!merchant?.id || !merchant?.environment) {
      setAnalytics(null);
      setIsAnalyticsLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchPaymentAnalytics = async () => {
      setIsAnalyticsLoading(true);
      setAnalyticsError(null);

      try {
        const { data } = await api.get<PaymentAnalyticsResponse>(
          `/payment-analytics/${merchant.id}`,
          {
            params: {
              environment: merchant.environment,
              range: activeRange,
            },
          },
        );

        if (!isCancelled) setAnalytics(data);
      } catch (error) {
        if (isCancelled) return;

        setAnalytics(null);
        setAnalyticsError("Payment analytics could not be loaded.");
        console.error("Failed to fetch payment analytics:", error);
      } finally {
        if (!isCancelled) setIsAnalyticsLoading(false);
      }
    };

    void fetchPaymentAnalytics();

    return () => {
      isCancelled = true;
    };
  }, [activeRange, merchant?.environment, merchant?.id]);

  useEffect(() => {
    if (!merchant?.id || !merchant?.environment) {
      setTransactions(null);
      setWallet(null);
      setAssets([]);
      setWebhooks([]);
      setIsDashboardDataLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchDashboardData = async () => {
      setIsDashboardDataLoading(true);
      setTransactionsError(false);

      const [transactionsResult, walletResult, assetsResult, webhooksResult] =
        await Promise.allSettled([
          api.get<RecentTransectionsResponseDto>(
            `/transection/recent/${merchant.id}/${merchant.environment}`,
          ),
          api.get<WalletResponse>(`/wallet/merchant/${merchant.id}`),
          api.get<AssetsResponse>(`/asset/get/${merchant.id}`),
          api.get<WebhooksResponse>(`/webhook/get/${merchant.id}`),
        ]);

      if (isCancelled) return;

      if (transactionsResult.status === "fulfilled") {
        setTransactions(transactionsResult.value.data);
      } else {
        setTransactions(null);
        setTransactionsError(true);
        console.error(
          "Failed to fetch dashboard transactions:",
          transactionsResult.reason,
        );
      }

      setWallet(
        walletResult.status === "fulfilled"
          ? walletResult.value.data.wallet
          : null,
      );
      setAssets(
        assetsResult.status === "fulfilled"
          ? assetsResult.value.data.assets
          : [],
      );
      setWebhooks(
        webhooksResult.status === "fulfilled"
          ? webhooksResult.value.data.webhooks
          : [],
      );
      setIsDashboardDataLoading(false);
    };

    void fetchDashboardData();

    return () => {
      isCancelled = true;
    };
  }, [merchant?.environment, merchant?.id]);

  const getAssetKey = (asset: PaymentAnalyticsAsset) =>
    `${asset.chainId}:${asset.tokenAddress ?? "native"}`;

  const selectedAsset =
    analytics?.assets.find(
      (asset) => getAssetKey(asset) === selectedAssetKey,
    ) ??
    analytics?.assets[0] ??
    null;

  const chartData = useMemo<PaymentChartPoint[]>(
    () =>
      selectedAsset?.series.map((bucket) => ({
        periodStart: bucket.periodStart,
        grossVolume: Number(bucket.grossVolume) || 0,
        fees: Number(bucket.fees) || 0,
        refunds: Number(bucket.refunds) || 0,
        netVolume: Number(bucket.netVolume) || 0,
        paymentCount: bucket.paymentCount,
      })) ?? [],
    [selectedAsset],
  );

  const selectedAssetTotals = useMemo(
    () =>
      chartData.reduce(
        (totals, point) => ({
          grossVolume: totals.grossVolume + point.grossVolume,
          paymentCount: totals.paymentCount + point.paymentCount,
        }),
        { grossVolume: 0, paymentCount: 0 },
      ),
    [chartData],
  );

  const summary = transactions?.summary ?? {
    successfulPaymentCount: 0,
    failedPaymentCount: 0,
    totalPaymentCount: 0,
    totalPaymentValue: 0,
  };
  const otherPaymentCount = Math.max(
    0,
    summary.totalPaymentCount -
      summary.successfulPaymentCount -
      summary.failedPaymentCount,
  );
  const conversionRate =
    summary.totalPaymentCount > 0
      ? (summary.successfulPaymentCount / summary.totalPaymentCount) * 100
      : 0;
  const statusItems = [
    {
      label: "Confirmed",
      value: summary.successfulPaymentCount,
      color: "bg-[#b8ff3c]",
      text: "text-[#b8ff3c]",
    },
    {
      label: "Failed",
      value: summary.failedPaymentCount,
      color: "bg-red-400",
      text: "text-red-300",
    },
    {
      label: "Other",
      value: otherPaymentCount,
      color: "bg-amber-400",
      text: "text-amber-300",
    },
  ];
  const totalStatusCount = statusItems.reduce(
    (total, item) => total + item.value,
    0,
  );
  const recentPayments = useMemo(
    () =>
      [
        ...(transactions?.successfulTransactions ?? []),
        ...(transactions?.failedTransactions ?? []),
      ]
        .sort(
          (left, right) =>
            new Date(right.createdAt).getTime() -
            new Date(left.createdAt).getTime(),
        )
        .slice(0, 4),
    [transactions],
  );
  const activeAssets = assets.filter((asset) => asset.status === "ACTIVE");
  const enabledWebhooks = webhooks.filter((webhook) => webhook.enabled);
  const walletIsVerified = wallet?.verificationStatus === "VERIFIED";
  const setupHealth = [
    {
      label: "Wallet",
      detail: wallet
        ? walletIsVerified
          ? "Default wallet verified"
          : `Wallet ${String(wallet.verificationStatus ?? "configured").toLowerCase()}`
        : "No wallet configured",
      Icon: Wallet,
      ready: walletIsVerified,
    },
    {
      label: "Assets",
      detail: `${activeAssets.length} active asset${activeAssets.length === 1 ? "" : "s"}`,
      Icon: Layers,
      ready: activeAssets.length > 0,
    },
    {
      label: "Webhooks",
      detail: `${enabledWebhooks.length} enabled endpoint${enabledWebhooks.length === 1 ? "" : "s"}`,
      Icon: Link2,
      ready: enabledWebhooks.length > 0,
    },
  ];

  const metrics = [
    {
      label: `Gross Volume${selectedAsset?.tokenSymbol ? ` (${selectedAsset.tokenSymbol})` : ""}`,
      value: isAnalyticsLoading
        ? "—"
        : formatTokenAmount(selectedAssetTotals.grossVolume),
      delta: activeRange,
      Icon: CircleDollarSign,
    },
    {
      label: "Successful Payments",
      value: isAnalyticsLoading
        ? "—"
        : selectedAssetTotals.paymentCount.toLocaleString("en-US"),
      delta: activeRange,
      Icon: CheckCircle2,
    },
    {
      label: "Other Payments",
      value: isDashboardDataLoading
        ? "—"
        : otherPaymentCount.toLocaleString("en-US"),
      delta: "All time",
      Icon: Clock3,
    },
    {
      label: "Conversion Rate",
      value: isDashboardDataLoading ? "—" : `${conversionRate.toFixed(1)}%`,
      delta: "All time",
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
            {analyticsRanges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setActiveRange(range)}
                aria-pressed={activeRange === range}
                className={`h-9 rounded-full border px-4 text-sm font-semibold transition active:scale-95 ${
                  activeRange === range
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
                <div className="mt-3 flex flex-wrap items-baseline gap-2">
                  <p className="text-3xl font-semibold tracking-tight">
                    {isAnalyticsLoading
                      ? "—"
                      : formatTokenAmount(selectedAssetTotals.grossVolume)}
                  </p>
                  {selectedAsset?.tokenSymbol && (
                    <span className="text-sm font-semibold text-[#b8ff3c]">
                      {selectedAsset.tokenSymbol}
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-zinc-500">Payments</p>
                <p className="mt-1 text-lg font-semibold">
                  {isAnalyticsLoading
                    ? "—"
                    : selectedAssetTotals.paymentCount.toLocaleString("en-US")}
                </p>
              </div>
            </div>

            {analytics && analytics.assets.length > 1 && (
              <div
                className="mt-5 flex gap-2 overflow-x-auto pb-1"
                aria-label="Payment asset"
              >
                {analytics.assets.map((asset) => {
                  const assetKey = getAssetKey(asset);
                  const isSelected =
                    selectedAsset && getAssetKey(selectedAsset) === assetKey;

                  return (
                    <button
                      key={assetKey}
                      type="button"
                      onClick={() => setSelectedAssetKey(assetKey)}
                      aria-pressed={Boolean(isSelected)}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        isSelected
                          ? "border-[#b8ff3c]/30 bg-[#b8ff3c]/10 text-[#b8ff3c]"
                          : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {asset.tokenSymbol ?? "Unknown"} · {asset.chainId}
                    </button>
                  );
                })}
              </div>
            )}

            <div
              className="mt-6 h-56 sm:h-64"
              role="img"
              aria-label={`Payment volume for ${activeRange}`}
            >
              {isAnalyticsLoading ? (
                <PaymentChartSkeleton />
              ) : analyticsError ? (
                <PaymentChartMessage
                  title="Unable to load the graph"
                  detail={analyticsError}
                />
              ) : !selectedAsset || chartData.length === 0 ? (
                <PaymentChartMessage
                  title="No payment data yet"
                  detail="Analytics will appear here after the first confirmed payment."
                />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 8, right: 8, bottom: 0, left: -14 }}
                    accessibilityLayer
                  >
                    <defs>
                      <linearGradient
                        id="payment-volume-gradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#b8ff3c"
                          stopOpacity={0.28}
                        />
                        <stop
                          offset="100%"
                          stopColor="#b8ff3c"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      vertical={false}
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="4 4"
                    />
                    <XAxis
                      dataKey="periodStart"
                      tickFormatter={(value: string) =>
                        formatBucketLabel(value, activeRange)
                      }
                      axisLine={false}
                      tickLine={false}
                      minTickGap={22}
                      tick={{ fill: "#71717a", fontSize: 11 }}
                    />
                    <YAxis
                      tickFormatter={formatCompactNumber}
                      axisLine={false}
                      tickLine={false}
                      width={48}
                      tick={{ fill: "#71717a", fontSize: 11 }}
                    />
                    <Tooltip
                      cursor={{ stroke: "rgba(184,255,60,0.24)" }}
                      content={
                        <PaymentChartTooltip
                          range={activeRange}
                          tokenSymbol={selectedAsset.tokenSymbol}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="grossVolume"
                      name="Gross volume"
                      stroke="#b8ff3c"
                      strokeWidth={2.5}
                      fill="url(#payment-volume-gradient)"
                      activeDot={{
                        r: 5,
                        fill: "#b8ff3c",
                        stroke: "#05080A",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
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
                  style={{
                    width: `${
                      totalStatusCount > 0
                        ? (item.value / totalStatusCount) * 100
                        : 0
                    }%`,
                  }}
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
                    <p className={`font-semibold ${item.text}`}>
                      {isDashboardDataLoading
                        ? "—"
                        : item.value.toLocaleString("en-US")}
                    </p>
                    <p className="text-xs text-zinc-600">
                      {totalStatusCount > 0
                        ? Math.round((item.value / totalStatusCount) * 100)
                        : 0}
                      %
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
              <div className="mt-5 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
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
              {isDashboardDataLoading ? (
                <RecentPaymentsSkeleton />
              ) : transactionsError ? (
                <DashboardSectionMessage message="Recent transactions could not be loaded." />
              ) : recentPayments.length === 0 ? (
                <DashboardSectionMessage message="No transactions yet." />
              ) : (
                recentPayments.map((payment, index) => (
                  <div
                    key={payment.id}
                    className={`grid grid-cols-[1fr_auto] gap-3 px-4 py-4 sm:grid-cols-[110px_1fr_110px_100px_auto] sm:items-center ${
                      index !== recentPayments.length - 1
                        ? "border-b border-white/10"
                        : ""
                    }`}
                  >
                    <p
                      className="truncate font-mono text-sm text-zinc-300"
                      title={payment.id}
                    >
                      {shortenValue(payment.id, 7, 4)}
                    </p>
                    <p
                      className="min-w-0 truncate text-sm text-zinc-500"
                      title={payment.payerWallet ?? undefined}
                    >
                      {shortenValue(payment.payerWallet)}
                    </p>
                    <p className="text-right text-sm font-semibold text-white sm:text-left">
                      {payment.paymentIntent?.amount ?? "—"}{" "}
                      {payment.paymentIntent?.tokenSymbol ?? ""}
                    </p>
                    <span
                      className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                        payment.status,
                      )}`}
                    >
                      {formatPaymentStatus(payment.status)}
                    </span>
                    <p className="text-right text-xs text-zinc-600">
                      {formatRelativeTime(payment.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#05080A]/70 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <ShieldCheck className="h-4 w-4 text-[#b8ff3c]" />
              Setup Health
            </div>

            <div className="mt-6 space-y-5">
              {isDashboardDataLoading ? (
                <SetupHealthSkeleton />
              ) : (
                setupHealth.map(({ label, detail, Icon, ready }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4"
                  >
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
                        <p className="truncate text-sm text-zinc-500">
                          {detail}
                        </p>
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
                ))
              )}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

function PaymentChartTooltip({
  active,
  payload,
  label,
  range,
  tokenSymbol,
}: {
  active?: boolean;
  payload?: Array<{ payload: PaymentChartPoint }>;
  label?: string;
  range: AnalyticsRange;
  tokenSymbol: string | null;
}) {
  const point = payload?.[0]?.payload;

  if (!active || !point || !label) return null;

  const symbol = tokenSymbol ? ` ${tokenSymbol}` : "";

  return (
    <div className="min-w-48 rounded-2xl border border-white/10 bg-[#080D10]/95 p-4 shadow-2xl backdrop-blur-xl">
      <p className="text-xs font-semibold text-zinc-400">
        {formatBucketLabel(label, range, true)} UTC
      </p>
      <p className="mt-2 text-base font-semibold text-[#b8ff3c]">
        {formatTokenAmount(point.grossVolume)}
        {symbol}
      </p>
      <div className="mt-3 space-y-1.5 text-xs text-zinc-400">
        <div className="flex justify-between gap-6">
          <span>Payments</span>
          <span className="font-medium text-white">{point.paymentCount}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span>Net volume</span>
          <span className="font-medium text-white">
            {formatTokenAmount(point.netVolume)}
            {symbol}
          </span>
        </div>
        <div className="flex justify-between gap-6">
          <span>Fees</span>
          <span className="font-medium text-white">
            {formatTokenAmount(point.fees)}
            {symbol}
          </span>
        </div>
        {point.refunds > 0 && (
          <div className="flex justify-between gap-6">
            <span>Refunds</span>
            <span className="font-medium text-white">
              {formatTokenAmount(point.refunds)}
              {symbol}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentChartSkeleton() {
  return (
    <div
      className="flex h-full animate-pulse items-end gap-2 border-b border-white/10 px-2 pb-4"
      aria-label="Loading payment analytics"
    >
      {[38, 56, 44, 70, 61, 82, 52, 68, 48, 76, 63, 88].map(
        (height, index) => (
          <span
            key={`${height}-${index}`}
            className="flex-1 rounded-t bg-white/[0.06]"
            style={{ height: `${height}%` }}
          />
        ),
      )}
    </div>
  );
}

function PaymentChartMessage({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="grid h-full place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
      <div>
        <p className="text-sm font-semibold text-zinc-300">{title}</p>
        <p className="mt-2 max-w-sm text-xs leading-5 text-zinc-500">
          {detail}
        </p>
      </div>
    </div>
  );
}

function RecentPaymentsSkeleton() {
  return (
    <div className="animate-pulse">
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="grid grid-cols-2 gap-3 border-b border-white/10 px-4 py-5 last:border-b-0 sm:grid-cols-5"
        >
          {[42, 72, 52, 46, 34].map((width, index) => (
            <span
              key={`${row}-${index}`}
              className="h-3 rounded-full bg-white/[0.06]"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function SetupHealthSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-3">
          <span className="size-10 shrink-0 rounded-2xl bg-white/[0.06]" />
          <div className="flex-1">
            <div className="h-3 w-20 rounded-full bg-white/[0.08]" />
            <div className="mt-2 h-2.5 w-32 rounded-full bg-white/[0.05]" />
          </div>
          <span className="h-6 w-12 rounded-full bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}

function DashboardSectionMessage({ message }: { message: string }) {
  return (
    <div className="grid min-h-52 place-items-center px-6 text-center text-sm text-zinc-500">
      {message}
    </div>
  );
}

export default Dashboard;
