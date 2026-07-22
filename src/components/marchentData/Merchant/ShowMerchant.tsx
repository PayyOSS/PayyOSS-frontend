"use client";

import { useEffect, useState } from "react";
import {
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
import api from "@/config/axios";
import {
  ApiEnvironment,
  CreateMerchantDto,
  MerchantStatus,
  useMerchantStore,
} from "@/stores/useMerchantStore";
import MerchantLoder from "./MerchantLoder";
import UpdateMerchant from "./UpdateMerchant";
import DeleteMerchant from "./DeleteMerchant";

interface MerchantResponse {
  success: boolean;
  merchant?: CreateMerchantDto;
  message?: string;
}

export default function ShowMerchant() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const merchant = useMerchantStore((state) => state.merchant);
  const setMerchant = useMerchantStore((state) => state.setMerchant);
  const resetMerchant = useMerchantStore((state) => state.resetMerchant);

  useEffect(() => {
    if (merchant.id) {
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchMerchant = async () => {
      setIsLoading(true);

      try {
        const { data } = await api.get<MerchantResponse>("/merchant/userId");

        if (isCancelled) return;

        if (!data.success || !data.merchant?.id) {
          resetMerchant();
          return;
        }

        setMerchant({
          id: data.merchant.id,
          name: data.merchant.name,
          imageUrl: data.merchant.imageUrl,
          email: data.merchant.email,
          companyUrl: data.merchant.companyUrl,
          createdAt: data.merchant.createdAt,
          environment: data.merchant.environment,
          status: data.merchant.status,
          businessType: data.merchant.businessType,
        });
      } catch (error) {
        if (isCancelled) return;
        resetMerchant();
        console.error("Failed to fetch merchant:", error);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    void fetchMerchant();

    return () => {
      isCancelled = true;
    };
  }, [merchant.id, resetMerchant, setMerchant]);

  if (isLoading) return <MerchantLoder />;

  const merchantName = merchant.name || "Unnamed Merchant";

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
        </div>

        {/* Merchant summary */}
        <section className="mt-4 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(10,17,21,0.96),rgba(4,9,12,0.98))] px-4 py-4 sm:px-6 sm:py-5 lg:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/4 text-[#B8FF3C] sm:h-22 sm:w-22">
                  {merchant.imageUrl ? (
                    <img
                      src={merchant.imageUrl}
                      alt={merchantName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Store size={34} strokeWidth={1.7} />
                  )}
                </div>

                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-3 border-[#070D10] bg-[#B8FF3C] text-black">
                  <Check size={12} strokeWidth={3} />
                </div>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {merchantName}
                  </h1>

                  <StatusBadge status={merchant.status ?? MerchantStatus.PENDING} />
                </div>

                <div className="mt-3 grid gap-2 text-xs text-[#A6ADB5] sm:text-sm">
                  <div className="flex items-center justify-center gap-3 sm:justify-start">
                    <Mail size={17} />
                    <span>{merchant.email || "Not provided"}</span>
                  </div>

                  {merchant.companyUrl ? (
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
                  ) : (
                    <div className="flex items-center justify-center gap-3 sm:justify-start">
                      <Globe2 size={17} />
                      <span>Company URL not provided</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="group inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/2 px-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B8FF3C]/35 hover:bg-[#B8FF3C]/8 hover:text-[#B8FF3C] hover:shadow-[0_8px_24px_rgba(184,255,60,0.10)] active:translate-y-0 active:scale-95"
              >
                <Pencil
                  size={17}
                  className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteOpen(true)}
                className="group inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/5 px-4 text-sm font-medium text-red-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/70 hover:bg-red-500/12 hover:text-red-300 hover:shadow-[0_8px_24px_rgba(239,68,68,0.13)] active:translate-y-0 active:scale-95"
              >
                <Trash2
                  size={17}
                  className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                />
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
              value={merchantName}
            />

            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={merchant.email || "Not provided"}
            />

            <InfoRow
              icon={<Globe2 size={18} />}
              label="Company URL"
            >
              {merchant.companyUrl ? (
                <a
                  href={merchant.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white transition hover:text-[#B8FF3C]"
                >
                  <span>{merchant.companyUrl}</span>
                  <ExternalLink size={15} />
                </a>
              ) : (
                <span className="text-[#889098]">Not provided</span>
              )}
            </InfoRow>

            <InfoRow
              icon={<Code2 size={18} />}
              label="Environment"
            >
              <EnvironmentBadge environment={merchant.environment ?? ApiEnvironment.TEST} />
            </InfoRow>

            <InfoRow
              icon={<ShieldCheck size={18} />}
              label="Status"
            >
              <StatusBadge status={merchant.status ?? MerchantStatus.PENDING} />
            </InfoRow>

            <InfoRow
              icon={<BriefcaseBusiness size={18} />}
              label="Business Type"
              value={merchant.businessType ? formatEnumValue(merchant.businessType) : "Not available"}
              last
            />
          </div>

          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#050A0D]/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-[#A6ADB5]">
              <CalendarDays size={18} />
              <span className="text-sm">Created At</span>
            </div>

            <span className="text-sm text-white">{formatCreatedAt(merchant.createdAt)}</span>
          </div>
        </section>
      </div>

      <UpdateMerchant
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
      <DeleteMerchant
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
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

function formatCreatedAt(value: string | null | undefined) {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}
