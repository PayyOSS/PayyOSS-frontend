"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Globe2,
  ImagePlus,
  Loader2,
  Mail,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "@/config/axios";
import {
  ApiEnvironment,
  BusinessType,
  CreateMerchantDto,
  MerchantStatus,
  useMerchantStore,
} from "@/stores/useMerchantStore";

interface UpdateMerchantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MerchantResponse {
  success: boolean;
  merchant?: CreateMerchantDto;
  message?: string;
}

interface MerchantForm {
  name: string;
  email: string;
  companyUrl: string;
  businessType: BusinessType;
  environment: ApiEnvironment;
  status: MerchantStatus;
}

export default function UpdateMerchant({
  isOpen,
  onClose,
}: UpdateMerchantProps) {
  const merchant = useMerchantStore((state) => state.merchant);
  const setMerchant = useMerchantStore((state) => state.setMerchant);
  const [form, setForm] = useState<MerchantForm>({
    name: "",
    email: "",
    companyUrl: "",
    businessType: BusinessType.INDIVIDUAL,
    environment: ApiEnvironment.TEST,
    status: MerchantStatus.PENDING,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      name: merchant.name ?? "",
      email: merchant.email ?? "",
      companyUrl: merchant.companyUrl ?? "",
      businessType: merchant.businessType ?? BusinessType.INDIVIDUAL,
      environment: merchant.environment ?? ApiEnvironment.TEST,
      status: merchant.status ?? MerchantStatus.PENDING,
    });
    setImageFile(null);
    setImagePreview(merchant.imageUrl ?? "");
    setError("");
  }, [isOpen, merchant]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("The merchant logo must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }

    setImageFile(file);
    setError("");

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim()) {
      setError("Business name and email are required.");
      return;
    }

    let normalizedCompanyUrl = "";
    if (form.companyUrl.trim()) {
      try {
        const parsedUrl = new URL(form.companyUrl.trim());
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
          setError("Company URL must use HTTP or HTTPS.");
          return;
        }
        normalizedCompanyUrl = parsedUrl.toString();
      } catch {
        setError("Enter a valid company URL including https://.");
        return;
      }
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("email", form.email.trim());
      payload.append("businessType", form.businessType);
      payload.append("environment", form.environment);
      payload.append("status", form.status);
      if (normalizedCompanyUrl) payload.append("companyUrl", normalizedCompanyUrl);
      if (imageFile) payload.append("image", imageFile);

      const { data } = await api.patch<MerchantResponse>(
        "/merchant/update",
        payload,
      );

      if (!data.success || !data.merchant?.id) {
        throw new Error(data.message || "The server did not return merchant details.");
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

      toast.success("Merchant updated successfully.");
      onClose();
    } catch (submitError) {
      if (axios.isAxiosError(submitError)) {
        const responseMessage = submitError.response?.data?.message;
        setError(
          (Array.isArray(responseMessage)
            ? responseMessage.join(" ")
            : responseMessage) || "Failed to update the merchant.",
        );
      } else {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Failed to update the merchant.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-[18px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-merchant-title"
    >
      <button
        type="button"
        aria-label="Close update merchant modal"
        onClick={() => !isSubmitting && onClose()}
        className="absolute inset-0 cursor-default"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(145deg,rgba(11,18,22,0.98),rgba(3,8,10,0.99))] shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
      >
        <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#B8FF3C]/80 to-transparent" />

        <header className="flex items-start justify-between gap-5 border-b border-white/8 px-5 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#B8FF3C]/15 bg-[#B8FF3C]/8 text-[#B8FF3C]">
              <Building2 size={24} />
            </div>
            <div>
              <h2 id="update-merchant-title" className="text-xl font-semibold text-white sm:text-2xl">
                Update Merchant
              </h2>
              <p className="mt-1 text-sm text-[#889098]">
                Update your business identity and account settings.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="group flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#889098] transition hover:bg-white/[0.08] hover:text-white active:scale-90 disabled:opacity-50"
          >
            <X size={19} className="transition-transform group-hover:rotate-90" />
          </button>
        </header>

        <div className="max-h-[calc(100dvh-190px)] overflow-y-auto px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.025] p-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#B8FF3C]/20 bg-[#B8FF3C]/5 text-[#B8FF3C]">
              {imagePreview ? (
                <img src={imagePreview} alt="Merchant logo preview" className="h-full w-full object-cover" />
              ) : (
                <ImagePlus size={30} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white">Merchant logo</p>
              <p className="mt-1 text-xs text-[#889098]">PNG, JPG or WebP. Maximum file size is 2 MB.</p>
              <label className="mt-3 inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-white transition hover:border-[#B8FF3C]/30 hover:text-[#B8FF3C]">
                <Upload size={15} />
                Choose image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <FormField icon={<Building2 size={18} />} label="Business Name" required>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                required
                maxLength={255}
                className={inputClassName}
              />
            </FormField>

            <FormField icon={<Mail size={18} />} label="Business Email" required>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                required
                maxLength={255}
                className={inputClassName}
              />
            </FormField>

            <FormField icon={<Globe2 size={18} />} label="Company URL">
              <input
                type="url"
                value={form.companyUrl}
                onChange={(event) => setForm((current) => ({ ...current, companyUrl: event.target.value }))}
                placeholder="https://company.com"
                maxLength={2048}
                className={inputClassName}
              />
            </FormField>

            <FormField icon={<BriefcaseBusiness size={18} />} label="Business Type">
              <select
                value={form.businessType}
                onChange={(event) => setForm((current) => ({ ...current, businessType: event.target.value as BusinessType }))}
                className={inputClassName}
              >
                {Object.values(BusinessType).map((value) => (
                  <option key={value} value={value}>{formatEnumValue(value)}</option>
                ))}
              </select>
            </FormField>

            <FormField icon={<Globe2 size={18} />} label="Environment">
              <select
                value={form.environment}
                onChange={(event) => setForm((current) => ({ ...current, environment: event.target.value as ApiEnvironment }))}
                className={inputClassName}
              >
                {Object.values(ApiEnvironment).map((value) => (
                  <option key={value} value={value}>{formatEnumValue(value)}</option>
                ))}
              </select>
            </FormField>

            <FormField icon={<ShieldCheck size={18} />} label="Status">
              <select
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as MerchantStatus }))}
                className={inputClassName}
              >
                {Object.values(MerchantStatus).map((value) => (
                  <option key={value} value={value}>{formatEnumValue(value)}</option>
                ))}
              </select>
            </FormField>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-white/8 bg-black/20 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-11 cursor-pointer rounded-xl border border-white/10 px-6 text-sm font-medium text-white transition hover:bg-white/[0.06] active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#B8FF3C] px-7 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(184,255,60,0.14)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <><Loader2 size={17} className="animate-spin" />Updating...</>
            ) : (
              <>Update Merchant<ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></>
            )}
          </button>
        </footer>
      </form>
    </div>
  );
}

const inputClassName =
  "h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-[#667078] focus:border-[#B8FF3C]/60 focus:ring-2 focus:ring-[#B8FF3C]/8";

function FormField({
  icon,
  label,
  required = false,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#D8DCDF]">
        <span className="text-[#B8FF3C]">{icon}</span>
        {label}
        {required && <span className="text-red-400">*</span>}
      </span>
      {children}
    </label>
  );
}

function formatEnumValue(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
