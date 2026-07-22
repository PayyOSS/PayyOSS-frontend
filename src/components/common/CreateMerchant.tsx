"use client";

import axios from "axios";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Globe2,
  Loader2,
  Mail,
  Upload,
} from "lucide-react";
import api from "@/config/axios";
import { useMerchantStore } from "@/stores/useMerchantStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

enum BusinessType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
  NON_PROFIT = "NON_PROFIT",
  STARTUP = "STARTUP",
}

export default function CreateMerchantForm() {
  const router = useRouter();
  const [logo, setLogo] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const setMerchant = useMerchantStore((state) => state.setMerchant);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyUrl: "",
    businessType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
      e.target.value = "";
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("businessType", formData.businessType);
      if (formData.companyUrl) payload.append("companyUrl", formData.companyUrl);
      if (logoFile) payload.append("image", logoFile);

      const { data } = await api.post("merchant/create", payload);

      if (!data?.success) {
        toast.error(data?.message || "Failed to create merchant.");
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
      toast.success("Merchant created successfully.");
      router.push(`/${data.merchant.id}/${data.merchant.environment.toLowerCase()}/dashboard`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseMessage = error.response?.data?.message;
        toast.error(
          (Array.isArray(responseMessage)
            ? responseMessage.join(" ")
            : responseMessage) || "Failed to create merchant. Please try again.",
        );
      } else {
        toast.error("Failed to create merchant. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 grid max-h-full w-full max-w-5xl overflow-hidden rounded-[26px] border border-white/10 bg-[#070a09]/95 shadow-[0_30px_100px_rgba(0,0,0,0.72),0_0_70px_rgba(184,255,60,0.05)] backdrop-blur-3xl lg:grid-cols-[0.72fr_1.28fr]"
    >
      <div className="pointer-events-none absolute inset-x-20 top-0 h-px bg-linear-to-r from-transparent via-[#b8ff3c]/80 to-transparent" />

      <aside className="relative flex items-center justify-between gap-4 border-b border-white/8 bg-[radial-gradient(circle_at_15%_10%,rgba(184,255,60,0.12),transparent_48%),linear-gradient(145deg,#0d120c,#070907)] px-5 py-4 lg:flex-col lg:items-start lg:justify-between lg:border-r lg:border-b-0 lg:p-7">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#b8ff3c] text-xl font-black text-[#111804] shadow-[0_0_24px_rgba(184,255,60,0.2)]">
              P
            </span>
            <div>
              <p className="text-base font-semibold tracking-tight text-white">
                Payy<span className="text-[#b8ff3c]">OSS</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Merchant onboarding
              </p>
            </div>
          </div>

          <div className="mt-5 hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">
              Get started
            </p>
            <h1 className="mt-2 max-w-xs text-3xl font-semibold leading-tight tracking-[-0.035em] text-white">
              Create your merchant workspace.
            </h1>
            <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-400">
              Add your business identity and start accepting secure crypto payments.
            </p>
          </div>
        </div>

        <div className="hidden lg:grid lg:gap-2.5">
          {["Secure checkout", "Multi-chain ready", "Built for global payments"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="grid size-5 place-items-center rounded-full bg-[#b8ff3c]/10 text-[#b8ff3c]">
                <Check size={12} strokeWidth={3} />
              </span>
              {item}
            </div>
          ))}
        </div>
      </aside>

      <section className="min-h-0 px-5 py-4 sm:px-7 sm:py-5 lg:px-8 lg:py-7">
        <div className="text-center">
          <label
            title="Upload business logo"
            className="group relative mx-auto flex size-16 cursor-pointer items-center justify-center overflow-hidden rounded-[22px] border border-dashed border-[#b8ff3c]/45 bg-[linear-gradient(145deg,rgba(184,255,60,0.1),rgba(184,255,60,0.025))] shadow-[0_12px_35px_rgba(184,255,60,0.1)] transition duration-300 hover:-translate-y-0.5 hover:border-[#b8ff3c] hover:shadow-[0_16px_42px_rgba(184,255,60,0.16)] sm:size-20"
          >
            {logo ? (
              <>
                <img
                  src={logo}
                  alt="Business logo preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/70 opacity-0 transition group-hover:opacity-100">
                  <div className="flex flex-col items-center gap-1 text-[#b8ff3c]">
                    <Upload className="size-5" />
                    <span className="text-[9px] font-medium">Change</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-zinc-400 transition group-hover:text-[#b8ff3c]">
                <Upload className="size-5 sm:size-6" />
                <span className="text-[9px] font-medium sm:text-[10px]">Add logo</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
          <p className="mt-1.5 text-[9px] text-zinc-600 sm:text-[10px]">
            PNG, JPG or WebP · Max 2 MB
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8ff3c] sm:text-xs">
            Business details
          </p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-white sm:text-xl">
            Set up your account
          </h2>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <FormField label="Business name" icon={<Building2 size={17} />}>
            <input
              required
              type="text"
              name="name"
              autoComplete="organization"
              placeholder="Acme Inc."
              value={formData.name}
              onChange={handleChange}
              className={inputClassName}
            />
          </FormField>

          <FormField label="Business email" icon={<Mail size={17} />}>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="hello@company.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClassName}
            />
          </FormField>

          <div className="sm:col-span-2">
            <FormField label="Company URL" optional icon={<Globe2 size={17} />}>
              <input
                type="url"
                name="companyUrl"
                inputMode="url"
                autoComplete="url"
                placeholder="https://company.com"
                value={formData.companyUrl}
                onChange={handleChange}
                className={inputClassName}
              />
            </FormField>
          </div>
        </div>

        <fieldset className="mt-4">
          <legend className="text-xs font-medium text-zinc-300">Business type</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {Object.values(BusinessType).map((type) => {
              const selected = formData.businessType === type;
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFormData((prev) => ({ ...prev, businessType: type }))}
                  className={`relative min-h-13 cursor-pointer rounded-xl border px-2.5 py-2 text-left transition-all duration-200 ${
                    selected
                      ? "border-[#b8ff3c]/70 bg-[#b8ff3c]/12 text-white shadow-[0_0_22px_rgba(184,255,60,0.08)]"
                      : "border-white/8 bg-white/[0.025] text-zinc-400 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span className="block pr-4 text-[11px] font-semibold leading-tight sm:text-xs">
                    {formatBusinessType(type)}
                  </span>
                  {selected && (
                    <span className="absolute right-2 top-2 grid size-4 place-items-center rounded-full bg-[#b8ff3c] text-black">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/8 pt-4">
          <p className="hidden max-w-xs text-[11px] leading-5 text-zinc-500 sm:block">
            By continuing, you confirm that these business details are accurate.
          </p>
          <button
            type="submit"
            disabled={loading || !formData.businessType}
            className="group flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#b8ff3c] px-6 text-sm font-semibold text-[#101700] shadow-[0_10px_28px_rgba(184,255,60,0.16)] transition hover:-translate-y-0.5 hover:bg-[#c4ff5b] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
          >
            {loading ? (
              <><Loader2 className="size-4 animate-spin" /> Creating...</>
            ) : (
              <>Create merchant <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></>
            )}
          </button>
        </div>
      </section>
    </form>
  );
}

const inputClassName =
  "h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600";

function FormField({
  label,
  icon,
  optional = false,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-300">
        {label}
        {optional && <span className="font-normal text-zinc-600">(optional)</span>}
      </span>
      <span className="flex h-11 items-center gap-3 rounded-xl border border-white/9 bg-white/[0.025] px-3 text-zinc-500 transition focus-within:border-[#b8ff3c]/55 focus-within:bg-[#b8ff3c]/5 focus-within:text-[#b8ff3c] focus-within:ring-2 focus-within:ring-[#b8ff3c]/5">
        {icon}
        {children}
      </span>
    </label>
  );
}

function formatBusinessType(type: BusinessType) {
  return type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
