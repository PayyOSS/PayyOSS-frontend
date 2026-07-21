"use client";

import { useEffect, useState } from "react";
import {
  CalendarClock,
  Check,
  CheckCircle2,
  Coins,
  Copy,
  Hash,
  Network,
  ReceiptText,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { PaymentStatus, TransectionDto } from "@/stores/useTransectionStore";

interface ShowAllTransectionDataProps {
  transaction: TransectionDto | null;
  onClose: () => void;
}

export default function ShowAllTransectionData({
  transaction,
  onClose,
}: ShowAllTransectionDataProps) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  useEffect(() => {
    if (!transaction) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, transaction]);

  if (!transaction) return null;

  const paymentIntent = transaction.paymentIntent;
  const isConfirmed = transaction.status === PaymentStatus.CONFIRMED;

  const copyValue = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      window.setTimeout(() => setCopiedValue(null), 1600);
    } catch (error) {
      console.error("Unable to copy transaction detail:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/80 p-2 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-details-title"
    >
      <button
        type="button"
        aria-label="Close transaction details"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <aside className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(160deg,#0b1114_0%,#030708_58%,#071006_100%)] shadow-[0_30px_100px_rgba(0,0,0,0.7)] sm:max-h-[calc(100dvh-2.5rem)]">
        <header className="shrink-0 border-b border-white/10 bg-[#071013]/90 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-11 sm:w-11 ${
                  isConfirmed
                    ? "border-[#B8FF3C]/20 bg-[#B8FF3C]/10 text-[#B8FF3C]"
                    : "border-red-400/20 bg-red-500/10 text-red-400"
                }`}
              >
                {isConfirmed ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#889098]">
                  Transaction details
                </p>
                <h2
                  id="transaction-details-title"
                  className="mt-0.5 truncate text-lg font-semibold text-white sm:text-xl"
                >
                  {paymentIntent?.amount ?? "0"} {paymentIntent?.tokenSymbol ?? ""}
                </h2>
                <span
                  className={`mt-1.5 inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    isConfirmed
                      ? "bg-[#B8FF3C]/10 text-[#B8FF3C]"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isConfirmed ? "bg-[#B8FF3C]" : "bg-red-400"
                    }`}
                  />
                  {transaction.status}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close transaction details"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#A6ADB5] transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <X size={19} />
            </button>
          </div>
        </header>

        <div className="grid min-h-0 grid-cols-2 gap-2 overflow-hidden p-2 sm:gap-3 sm:p-4 lg:grid-cols-3">
          <DetailSection icon={<ReceiptText size={19} />} title="Overview">
            <DetailGrid>
              <DetailItem label="Transaction ID" value={transaction.id} copy onCopy={copyValue} copiedValue={copiedValue} />
              <DetailItem label="Order ID" value={transaction.orderId} copy onCopy={copyValue} copiedValue={copiedValue} />
              <DetailItem label="Payment Intent ID" value={transaction.paymentIntentId} copy onCopy={copyValue} copiedValue={copiedValue} />
              <DetailItem label="Environment" value={transaction.environment} accent />
            </DetailGrid>
          </DetailSection>

          <DetailSection icon={<Coins size={19} />} title="Payment">
            <DetailGrid>
              <DetailItem label="Amount" value={paymentIntent?.amount} />
              <DetailItem label="Asset Type" value={paymentIntent?.assetType} />
              <DetailItem label="Token Name" value={paymentIntent?.tokenName} />
              <DetailItem label="Token Symbol" value={paymentIntent?.tokenSymbol} accent />
              <DetailItem label="Token Decimals" value={paymentIntent?.tokenDecimals} />
              <DetailItem label="Token Address" value={paymentIntent?.tokenAddress} copy wide onCopy={copyValue} copiedValue={copiedValue} />
            </DetailGrid>
          </DetailSection>

          <DetailSection icon={<Network size={19} />} title="Network">
            <DetailGrid>
              <DetailItem label="Chain" value={transaction.chain.name} />
              <DetailItem label="Chain ID" value={transaction.chainId} />
              <DetailItem label="Native Symbol" value={transaction.chain.nativeSymbol} accent />
            </DetailGrid>
          </DetailSection>

          <DetailSection icon={<Wallet size={19} />} title="Wallets">
            <DetailGrid>
              <DetailItem label="Merchant Wallet" value={transaction.merchantWallet} copy wide onCopy={copyValue} copiedValue={copiedValue} />
              <DetailItem label="Payer Wallet" value={transaction.payerWallet} copy wide onCopy={copyValue} copiedValue={copiedValue} />
            </DetailGrid>
          </DetailSection>

          <DetailSection icon={<Hash size={19} />} title="Blockchain">
            <DetailGrid>
              <DetailItem label="Transaction Hash" value={transaction.txHash} copy wide accent onCopy={copyValue} copiedValue={copiedValue} />
            </DetailGrid>
          </DetailSection>

          <DetailSection icon={<CalendarClock size={19} />} title="Timeline">
            <DetailGrid>
              <DetailItem label="Created" value={formatDateTime(transaction.createdAt)} />
              <DetailItem label="Updated" value={formatDateTime(transaction.updatedAt)} />
              <DetailItem label="Confirmed" value={formatDateTime(transaction.confirmedAt)} wide />
            </DetailGrid>
          </DetailSection>
        </div>
      </aside>
    </div>
  );
}

function DetailSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] sm:rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-2.5 py-2 sm:px-3.5 sm:py-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#B8FF3C]/10 text-[#B8FF3C] sm:h-8 sm:w-8">
          {icon}
        </span>
        <h3 className="text-xs font-medium text-white sm:text-sm">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function DetailGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2">{children}</div>;
}

function DetailItem({
  label,
  value,
  copy = false,
  accent = false,
  wide = false,
  onCopy,
  copiedValue,
}: {
  label: string;
  value: string | number | null | undefined;
  copy?: boolean;
  accent?: boolean;
  wide?: boolean;
  onCopy?: (value: string) => void;
  copiedValue?: string | null;
}) {
  const displayValue = value === null || value === undefined || value === "" ? "Not available" : String(value);
  const canCopy = copy && displayValue !== "Not available";
  const copied = copiedValue === displayValue;

  return (
    <div className={`min-w-0 border-b border-r border-white/[0.06] px-2 py-1.5 sm:px-3 sm:py-2 ${wide ? "col-span-2" : ""}`}>
      <p className="truncate text-[8px] font-medium uppercase tracking-[0.08em] text-[#737D85] sm:text-[9px]">{label}</p>
      <div className="mt-1 flex min-w-0 items-center gap-1.5">
        <p className={`min-w-0 break-all text-[10px] leading-4 sm:text-xs ${accent ? "font-medium text-[#B8FF3C]" : "text-[#E7EAEC]"}`}>
          {displayValue}
        </p>
        {canCopy && (
          <button
            type="button"
            onClick={() => onCopy?.(displayValue)}
            aria-label={`Copy ${label}`}
            className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[#889098] transition hover:border-[#B8FF3C]/30 hover:text-[#B8FF3C] sm:h-7 sm:w-7"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}

function formatDateTime(value: string | null) {
  if (!value) return "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}
