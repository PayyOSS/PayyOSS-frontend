"use client";

import { useEffect, useState } from "react";
import {
  ChevronRight,
  CircleDollarSign,
  Copy,
  TrendingUp,
} from "lucide-react";
import api from "@/config/axios";
import { useMerchantStore } from "@/stores/useMerchantStore";
import {
  PaymentStatus,
  RecentTransectionsResponseDto,
  TransectionDto,
  useTransectionStore,
} from "@/stores/useTransectionStore";
import TransectionLoader from "./TransectionLoder";
import ShowAllTransectionData from "./ShowAllTransectionData";

type TransactionTab = "SUCCESS" | "FAILED";

export default function Transactions() {
  const [activeTab, setActiveTab] = useState<TransactionTab>("SUCCESS");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransectionDto | null>(null);
  const merchantId = useMerchantStore((state) => state.merchant.id);
  const environment = useMerchantStore((state) => state.merchant.environment);
  const successfulTransactions = useTransectionStore(
    (state) => state.successfulTransactions,
  );
  const failedTransactions = useTransectionStore(
    (state) => state.failedTransactions,
  );
  const summary = useTransectionStore((state) => state.summary);
  const setTransections = useTransectionStore(
    (state) => state.setTransections,
  );
  const resetTransections = useTransectionStore(
    (state) => state.resetTransections,
  );

  useEffect(() => {
    if (!merchantId || !environment) {
      resetTransections();
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchTransections = async () => {
      setIsLoading(true);

      try {
        const { data } = await api.get<RecentTransectionsResponseDto>(
          `/transection/recent/${merchantId}/${environment}`,
        );

        if (!isCancelled) setTransections(data);
      } catch (error) {
        if (isCancelled) return;

        resetTransections();
        console.error("Failed to fetch transactions:", error);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    void fetchTransections();

    return () => {
      isCancelled = true;
    };
  }, [environment, merchantId, resetTransections, setTransections]);

  const visibleTransactions =
    activeTab === "SUCCESS"
      ? successfulTransactions
      : failedTransactions;

  const totalTransactions = summary.totalPaymentCount;
  const totalVolume = Number(summary.totalPaymentValue);
  const totalVolumeTokenSymbol =
    successfulTransactions[0]?.paymentIntent?.tokenSymbol ??
    failedTransactions[0]?.paymentIntent?.tokenSymbol;

  const copyHash = async (txHash: string) => {
    try {
      await navigator.clipboard.writeText(txHash);
    } catch (error) {
      console.error("Unable to copy transaction hash:", error);
    }
  };

  if (isLoading) return <TransectionLoader />;

  return (
    <div className="min-h-screen bg-[#020608] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Transactions
            </h1>

            <p className="mt-2 text-sm text-[#889098]">
              View and monitor all your transaction activities.
            </p>
          </div>
        </header>

        {/* Summary */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-[#0A0F12]/75 backdrop-blur-xl">
          <div className="grid grid-cols-4 divide-x divide-white/5">
            <SummaryItem
              icon={
                <TrendingUp
                  size={23}
                  className="text-[#B8FF3C]"
                />
              }
              iconClassName="bg-[#B8FF3C]/10"
              label="Total Transactions"
              value={String(totalTransactions)}
              helper="All time"
              border
            />

            <SummaryItem
              dotClassName="bg-[#B8FF3C]"
              label="Succeeded"
              value={String(summary.successfulPaymentCount)}
              helper={formatPercentage(
                summary.successfulPaymentCount,
                totalTransactions,
              )}
              border
            />

            <SummaryItem
              dotClassName="bg-red-500"
              label="Failed"
              value={String(summary.failedPaymentCount)}
              helper={formatPercentage(
                summary.failedPaymentCount,
                totalTransactions,
              )}
              border
            />

            <SummaryItem
              icon={
                <CircleDollarSign
                  size={23}
                  className="text-sky-400"
                />
              }
              iconClassName="bg-sky-500/10"
              label="Total Volume"
              value={totalVolume.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              suffix={totalVolumeTokenSymbol}
              helper="All time"
            />
          </div>
        </section>

        {/* Transaction tabs */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-white/5 bg-[#080D10]/75 backdrop-blur-xl">
          <div className="flex overflow-x-auto border-b border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab("SUCCESS")}
              className={`relative min-w-max px-6 py-4 text-sm font-medium transition ${
                activeTab === "SUCCESS"
                  ? "bg-[#B8FF3C]/5 text-[#B8FF3C]"
                  : "text-[#889098] hover:bg-white/[0.02] hover:text-white"
              }`}
            >
              Successful Transactions (
              {successfulTransactions.length})
              {activeTab === "SUCCESS" && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#B8FF3C]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("FAILED")}
              className={`relative min-w-max px-6 py-4 text-sm font-medium transition ${
                activeTab === "FAILED"
                  ? "bg-red-500/5 text-red-400"
                  : "text-[#889098] hover:bg-white/[0.02] hover:text-white"
              }`}
            >
              Failed Transactions ({failedTransactions.length})
              {activeTab === "FAILED" && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-500" />
              )}
            </button>
          </div>

          {/* Responsive transaction table */}
          <div className="overflow-x-auto overscroll-x-contain">
            <div className="min-w-[760px] sm:min-w-[840px]">
              <div className="grid grid-cols-[0.85fr_0.68fr_1.05fr_0.78fr_1fr_0.9fr_20px] gap-2 border-b border-white/5 bg-white/[0.015] px-3 py-3 text-[10px] uppercase tracking-wide text-[#889098] sm:gap-3 sm:px-4 sm:text-[11px]">
                <span>Token Symbol</span>
                <span>Asset Type</span>
                <span>Tx Hash</span>
                <span>Status</span>
                <span>Order ID</span>
                <span>Created At</span>
                <span />
              </div>

              {visibleTransactions.length > 0 ? (
                visibleTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    onCopy={copyHash}
                    onSelect={() => setSelectedTransaction(transaction)}
                  />
                ))
              ) : (
                <EmptyTransactions activeTab={activeTab} />
              )}
            </div>
          </div>

          {/* Table footer */}
          <div className="flex flex-col gap-3 border-t border-white/5 px-5 py-4 text-sm text-[#889098] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {visibleTransactions.length}{" "}
              {activeTab === "SUCCESS"
                ? "successful"
                : "failed"}{" "}
              transaction
              {visibleTransactions.length === 1 ? "" : "s"}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#889098] transition hover:text-white"
              >
                ‹
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#B8FF3C] bg-[#B8FF3C]/10 text-[#B8FF3C]"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#889098] transition hover:text-white"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>

      <ShowAllTransectionData
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}

function SummaryItem({
  icon,
  iconClassName = "",
  dotClassName,
  label,
  value,
  suffix,
  helper,
  border = false,
}: {
  icon?: React.ReactNode;
  iconClassName?: string;
  dotClassName?: string;
  label: string;
  value: string;
  suffix?: string;
  helper: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[82px] min-w-0 flex-col items-start justify-center gap-1 px-2 py-2 sm:min-h-[110px] sm:flex-row sm:items-center sm:justify-start sm:gap-4 sm:px-5 sm:py-5 ${
        border ? "xl:border-r xl:border-white/5" : ""
      }`}
    >
      {icon ? (
        <div
          className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full sm:flex sm:h-12 sm:w-12 ${iconClassName}`}
        >
          {icon}
        </div>
      ) : (
        <span
          className={`hidden h-2 w-2 shrink-0 rounded-full sm:block ${dotClassName}`}
        />
      )}

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-1 text-[8px] leading-3 text-[#889098] sm:gap-2 sm:text-sm sm:leading-normal">
          {!icon && (
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2 ${dotClassName}`}
            />
          )}

          <span className="line-clamp-2 sm:line-clamp-none">{label}</span>
        </div>

        <div className="flex max-w-full items-end gap-1 sm:mt-1 sm:gap-1.5">
          <strong className="truncate text-sm font-semibold sm:text-2xl">
            {value}
          </strong>

          {suffix && (
            <span className="truncate pb-0.5 text-[8px] font-medium text-white sm:pb-1 sm:text-sm">
              {suffix}
            </span>
          )}
        </div>

        <p className="hidden text-sm text-[#889098] sm:mt-1 sm:block">
          {helper}
        </p>
      </div>
    </div>
  );
}

function TransactionRow({
  transaction,
  onCopy,
  onSelect,
}: {
  transaction: TransectionDto;
  onCopy: (txHash: string) => void;
  onSelect: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect();
      }}
      aria-label={`View transaction ${transaction.orderId ?? transaction.id}`}
      className="grid min-h-17 cursor-pointer grid-cols-[0.85fr_0.68fr_1.05fr_0.78fr_1fr_0.9fr_20px] items-center gap-2 border-b border-white/5 px-3 py-3.5 text-xs transition hover:bg-white/[0.035] focus-visible:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#B8FF3C]/50 last:border-b-0 [&>span]:min-w-0 [&>span]:truncate sm:gap-3 sm:px-4 sm:text-sm"
    >
      <TokenBadge symbol={transaction.paymentIntent?.tokenSymbol ?? "—"} />

      <span>{transaction.paymentIntent?.assetType ?? "—"}</span>

      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate font-mono font-medium text-[#B8FF3C]">
          {shortenHash(transaction.txHash)}
        </span>

        {transaction.txHash && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onCopy(transaction.txHash!);
            }}
            aria-label={`Copy ${transaction.txHash}`}
            className="shrink-0 text-[#889098] transition hover:text-white"
          >
            <Copy size={15} />
          </button>
        )}
      </div>

      <StatusBadge status={transaction.status} />

      <span className="truncate">
        {transaction.orderId ?? "—"}
      </span>

      <div className="min-w-0">
        <p className="truncate">{formatTransactionDate(transaction.createdAt).date}</p>
        <p className="mt-1 text-xs text-[#889098]">
          {formatTransactionDate(transaction.createdAt).time}
        </p>
      </div>

      <ChevronRight
        size={17}
        className="justify-self-end text-[#889098]"
      />
    </div>
  );
}

function TransactionCard({
  transaction,
  onCopy,
  onSelect,
}: {
  transaction: TransectionDto;
  onCopy: (txHash: string) => void;
  onSelect: () => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect();
      }}
      aria-label={`View transaction ${transaction.orderId ?? transaction.id}`}
      className="cursor-pointer rounded-2xl border border-white/5 bg-[#050A0D]/80 p-4 transition hover:border-[#B8FF3C]/20 hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8FF3C]/50"
    >
      <div className="flex items-start justify-between gap-4">
        <TokenBadge symbol={transaction.paymentIntent?.tokenSymbol ?? "—"} />
        <StatusBadge status={transaction.status} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <InfoItem
          label="Asset Type"
          value={transaction.paymentIntent?.assetType ?? "—"}
        />

        <InfoItem
          label="Order ID"
          value={transaction.orderId ?? "—"}
        />

        <div>
          <p className="text-xs uppercase tracking-wide text-[#889098]">
            Tx Hash
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="min-w-0 truncate font-mono text-sm text-[#B8FF3C]">
              {shortenHash(transaction.txHash)}
            </span>

            {transaction.txHash && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onCopy(transaction.txHash!);
                }}
                aria-label={`Copy ${transaction.txHash}`}
                className="shrink-0 text-[#889098] transition hover:text-white"
              >
                <Copy size={15} />
              </button>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-[#889098]">
            Created At
          </p>

          <p className="mt-2 text-sm">
            {formatTransactionDate(transaction.createdAt).date}
          </p>

          <p className="mt-1 text-xs text-[#889098]">
            {formatTransactionDate(transaction.createdAt).time}
          </p>
        </div>
      </div>
    </article>
  );
}

function TokenBadge({
  symbol,
}: {
  symbol: string;
}) {
  const isUsdc = symbol === "USDC";

  return (
    <div className="flex min-w-0 items-center gap-3">

      <span className="min-w-0 truncate font-medium">{symbol}</span>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const succeeded = status === PaymentStatus.CONFIRMED;

  return (
    <span
      className={`inline-flex w-fit max-w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium ${
        succeeded
          ? "bg-[#B8FF3C]/10 text-[#B8FF3C]"
          : "bg-red-500/10 text-red-400"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          succeeded ? "bg-[#B8FF3C]" : "bg-red-500"
        }`}
      />

      {succeeded ? "Succeeded" : "Failed"}
    </span>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[#889098]">
        {label}
      </p>

      <p className="mt-2 break-all text-sm">
        {value}
      </p>
    </div>
  );
}

function EmptyTransactions({
  activeTab,
}: {
  activeTab: TransactionTab;
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
      <h3 className="text-lg font-medium">
        No{" "}
        {activeTab === "SUCCESS"
          ? "successful"
          : "failed"}{" "}
        transactions
      </h3>

      <p className="mt-2 text-sm text-[#889098]">
        Transactions matching this status will appear here.
      </p>
    </div>
  );
}

function formatPercentage(count: number, total: number) {
  if (total === 0) return "0.00%";
  return `${((count / total) * 100).toFixed(2)}%`;
}

function shortenHash(txHash: string | null) {
  if (!txHash) return "—";
  if (txHash.length <= 16) return txHash;
  return `${txHash.slice(0, 8)}...${txHash.slice(-6)}`;
}

function formatTransactionDate(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return { date: createdAt, time: "" };
  }

  return {
    date: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(date),
    time: `${new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(date)} UTC`,
  };
}
