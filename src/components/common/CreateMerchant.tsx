"use client";

import { useState } from "react";
import { Building2, Mail, Upload, Loader2 } from "lucide-react";
import axios from "axios";
import api from "@/config/axios";
import { useMerchantStore } from "@/stores/useMerchantStore";
import { useRouter } from "next/navigation";

enum BusinessType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
  NON_PROFIT = "NON_PROFIT",
  STARTUP = "STARTUP",
}

export default function CreateMerchantForm() {
  const router = useRouter();
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setMerchant = useMerchantStore((state) => state.setMerchant);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post(
        "merchant/create",
        {
          name: formData.name,
          email: formData.email,
          businessType: formData.businessType,
        }
      );

      if(data?.success){
        setMerchant({
          id: data.merchant.id,
          name: data.merchant.name,
          imageUrl: data.merchant.imageUrl,
          email: data.merchant.email,
          environment: data.merchant.environment,
          status: data.merchant.status,
          businessType: data.merchant.businessType,
        });
        router.push(`/${data.merchant.id}/${data.merchant.environment.toLowerCase()}/dashboard`);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-xl rounded-[28px] border border-white/10 bg-black/80 p-8 backdrop-blur-3xl shadow-[0_0_80px_rgba(184,255,60,0.08)]"
  >
    {/* Logo */}
    <div className="flex flex-col items-center">
      <label className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed border-[#b8ff3c]/30 bg-white/[0.03] transition-all duration-300 hover:border-[#b8ff3c] hover:bg-[#b8ff3c]/10">
        {logo ? (
          <>
            <img
              src={logo}
              alt="Business logo"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
              <Upload className="h-7 w-7 text-[#b8ff3c]" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Upload className="h-7 w-7 text-[#b8ff3c]" />
            <span className="text-[11px] text-zinc-400">
              Upload Logo
            </span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />
      </label>

      <p className="mt-3 text-xs text-zinc-500">
        Add your business logo
      </p>
    </div>

    <div className="mt-8 space-y-5">
      {/* Business Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Business Name
        </label>

        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-4 py-3 transition-all duration-300 focus-within:border-[#b8ff3c]/70 focus-within:bg-[#b8ff3c]/10">
          <Building2 className="h-5 w-5 text-zinc-500" />

          <input
            type="text"
            name="name"
            placeholder="Acme Inc."
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Business Email
        </label>

        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-4 py-3 transition-all duration-300 focus-within:border-[#b8ff3c]/70 focus-within:bg-[#b8ff3c]/10">
          <Mail className="h-5 w-5 text-zinc-500" />

          <input
            type="email"
            name="email"
            placeholder="hello@company.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Business Type */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Business Type
        </label>

        <div className="grid grid-cols-2 gap-3">
          {Object.values(BusinessType).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  businessType: type,
                }))
              }
              className={`rounded-2xl border p-3 text-left transition-all duration-300 cursor-pointer ${
                formData.businessType === type
                  ? "border-[#b8ff3c] bg-[#b8ff3c]/20 shadow-lg shadow-[#b8ff3c]/20"
                  : "border-white/10 bg-white/3 hover:border-[#b8ff3c]/40 hover:bg-[#b8ff3c]/10"
              }`}
            >
              <h3 className="text-sm font-medium text-white">
                {type.replace("_", " ")}
              </h3>

              <p className="mt-1 text-[11px] text-zinc-500">
                {type === "INDIVIDUAL" && "Personal business"}
                {type === "COMPANY" && "Registered company"}
                {type === "STARTUP" && "New startup"}
                {type === "NON_PROFIT" && "Organization"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-linear-to-r from-[#91d320] to-[#86bd06] text-sm font-semibold text-black shadow-xl shadow-[#b8ff3c]/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Create Merchant"
        )}
      </button>
    </div>
  </form>
);
}