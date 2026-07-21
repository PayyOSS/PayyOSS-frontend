"use client";

import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  ExternalLink,
  Globe2,
  Mail,
  Pencil,
  ShieldCheck,
  Store,
  Trash2,
  UserRound,
} from "lucide-react";

enum ApiEnvironment {
  TEST = "TEST",
  LIVE = "LIVE",
}

enum MerchantStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

enum BusinessType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
  NON_PROFIT = "NON_PROFIT",
}

const merchant = {
  name: "Acme Store",
  imageUrl: "",
  email: "merchant@acmestore.com",
  companyUrl: "https://acmestore.com",
  environment: ApiEnvironment.LIVE,
  status: MerchantStatus.ACTIVE,
  businessType: BusinessType.COMPANY,
  createdAt: "May 24, 2024 at 10:42 AM UTC",
};

export default function ShowMerchant() {
  const initials = merchant.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#02070A] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-362.5">
        {/* Top navigation */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#889098]">Merchants</span>
            <span className="text-[#556069]">›</span>
            <span className="font-medium text-white">Merchant Details</span>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/2 px-4 text-sm font-medium text-white transition hover:bg-white/5 sm:w-auto"
          >
            <ArrowLeft size={16} />
            Back to Merchants
          </button>
        </div>

        {/* Merchant summary */}
        <section className="mt-5 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(10,17,21,0.96),rgba(4,9,12,0.98))] px-5 py-6 sm:px-7 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/4 text-[#B8FF3C] sm:h-28 sm:w-28">
                  {merchant.imageUrl ? (
                    <img
                      src={merchant.imageUrl}
                      alt={merchant.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Store size={42} strokeWidth={1.7} />
                  )}
                </div>

                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#070D10] bg-[#B8FF3C] text-black">
                  <Check size={14} strokeWidth={3} />
                </div>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {merchant.name}
                  </h1>

                  <StatusBadge status={merchant.status} />
                </div>

                <div className="mt-4 grid gap-3 text-sm text-[#A6ADB5]">
                  <div className="flex items-center justify-center gap-3 sm:justify-start">
                    <Mail size={17} />
                    <span>{merchant.email}</span>
                  </div>

                  <a
                    href={merchant.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 transition hover:text-white sm:justify-start"
                  >
                    <Globe2 size={17} />
                    <span>{merchant.companyUrl}</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/2 px-5 text-sm font-medium text-white transition hover:bg-white/6"
              >
                <Pencil size={17} />
                Edit
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/5 px-5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </div>
        </section>

        {/* Merchant information */}
        <section className="mt-4 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(10,17,21,0.96),rgba(4,9,12,0.98))] p-5 sm:p-7 lg:p-8">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              Merchant Information
            </h2>

            <p className="mt-2 text-sm text-[#889098]">
              View and manage merchant information and settings.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#050A0D]/70">
            <InfoRow
              icon={<UserRound size={18} />}
              label="Name"
              value={merchant.name}
            />

            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={merchant.email}
            />

            <InfoRow
              icon={<Globe2 size={18} />}
              label="Company URL"
            >
              <a
                href={merchant.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white transition hover:text-[#B8FF3C]"
              >
                <span>{merchant.companyUrl}</span>
                <ExternalLink size={15} />
              </a>
            </InfoRow>

            <InfoRow
              icon={<Code2 size={18} />}
              label="Environment"
            >
              <EnvironmentBadge environment={merchant.environment} />
            </InfoRow>

            <InfoRow
              icon={<ShieldCheck size={18} />}
              label="Status"
            >
              <StatusBadge status={merchant.status} />
            </InfoRow>

            <InfoRow
              icon={<BriefcaseBusiness size={18} />}
              label="Business Type"
              value={formatEnumValue(merchant.businessType)}
              last
            />
          </div>

          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#050A0D]/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-[#A6ADB5]">
              <CalendarDays size={18} />
              <span className="text-sm">Created At</span>
            </div>

            <span className="text-sm text-white">{merchant.createdAt}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  children,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
        last ? "" : "border-b border-white/8"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B8FF3C]/8 text-[#B8FF3C]">
          {icon}
        </div>

        <span className="text-sm text-[#A6ADB5]">{label}</span>
      </div>

      <div className="break-all pl-12 text-sm text-white sm:pl-0">
        {children ?? value ?? "—"}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: MerchantStatus }) {
  const isActive = status === MerchantStatus.ACTIVE;

  return (
    <span
      className={`inline-flex w-fit items-center rounded-lg px-3 py-1.5 text-xs font-medium ${
        isActive
          ? "border border-[#B8FF3C]/15 bg-[#B8FF3C]/10 text-[#B8FF3C]"
          : "border border-red-500/20 bg-red-500/10 text-red-400"
      }`}
    >
      {formatEnumValue(status)}
    </span>
  );
}

function EnvironmentBadge({
  environment,
}: {
  environment: ApiEnvironment;
}) {
  const isLive = environment === ApiEnvironment.LIVE;

  return (
    <span
      className={`inline-flex w-fit items-center rounded-lg border px-3 py-1.5 text-xs font-medium ${
        isLive
          ? "border-sky-500/20 bg-sky-500/10 text-sky-400"
          : "border-yellow-400/20 bg-yellow-400/10 text-yellow-400"
      }`}
    >
      {formatEnumValue(environment)}
    </span>
  );
}

function formatEnumValue(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
