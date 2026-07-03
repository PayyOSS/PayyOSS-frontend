"use client";

import {
  Plus,
  KeyRound,
  Clock3,
  ShieldCheck,
  CalendarDays,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function ApiKeyShowPage() {
  const apiKey = {
    keyPrefix: "payyos_live_sk_7f3a****",
    environment: "Production",
    scopes: ["payments:read", "payments:write"],
    lastUsedAt: "2 hours ago",
    revokedAt: null,
    createdAt: "Jun 23, 2026 • 09:41 UTC",
    status: "Active",
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            API Keys
          </h1>

          <p className="mt-2 text-sm text-[#889098]">
            Manage and monitor your API credentials securely.
          </p>
        </div>

        <button className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#B8FF3C] px-6 text-sm font-medium text-[#B8FF3C] shadow-[0_0_35px_rgba(184,255,60,0.15)] transition hover:bg-[#B8FF3C]/10 active:scale-95">
          <Plus size={18} />
          Create API Key
        </button>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-[30px] border border-[#1A2A32] bg-[#14171C]/60 backdrop-blur-xl">
        {/* Top */}
        <div className="flex flex-col gap-6 border-b border-white/5 p-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B8FF3C]/20 bg-[#B8FF3C]/5 text-[#B8FF3C]">
              <KeyRound size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-medium">
                Active API Key
              </h2>

              <p className="mt-2 text-[#889098]">
                Use this key to authenticate your API requests.
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#B8FF3C]/10 px-4 py-2 text-sm text-[#B8FF3C]">
            <span className="h-2 w-2 rounded-full bg-[#B8FF3C]" />
            Active
          </span>
        </div>

        {/* Details */}
        <div className="grid gap-10 p-8 md:grid-cols-2 xl:grid-cols-3">
          {/* Key Prefix */}
          <div>
            <p className="text-xs uppercase tracking-wide text-[#889098]">
              Key Prefix
            </p>

            <p className="mt-4 text-2xl font-medium">
              {apiKey.keyPrefix}
            </p>
          </div>

          {/* Environment */}
          <div>
            <p className="text-xs uppercase tracking-wide text-[#889098]">
              Environment
            </p>

            <div className="mt-4">
              <span className="rounded-full bg-[#B8FF3C] px-4 py-2 text-sm font-medium text-black">
                ● {apiKey.environment}
              </span>
            </div>
          </div>

          {/* Scopes */}
          <div>
            <p className="text-xs uppercase tracking-wide text-[#889098]">
              Scopes
            </p>

            <div className="mt-4 flex flex-col gap-2 text-lg">
              {apiKey.scopes.map((scope) => (
                <span key={scope}>{scope}</span>
              ))}
            </div>

            <button className="mt-5 rounded-full border border-[#1A2A32] bg-[#0B0D0F] px-4 py-2 text-sm text-[#B8FF3C]">
              View all
            </button>
          </div>

          {/* Last Used */}
          <div>
            <p className="text-xs uppercase tracking-wide text-[#889098]">
              Last Used At
            </p>

            <div className="mt-4 flex items-center gap-3 text-lg">
              <Clock3
                size={20}
                className="text-[#B8FF3C]"
              />

              <span>{apiKey.lastUsedAt}</span>
            </div>
          </div>

          {/* Revoked */}
          <div>
            <p className="text-xs uppercase tracking-wide text-[#889098]">
              Revoked At
            </p>

            <div className="mt-4 flex items-center gap-3 text-lg">
              <ShieldCheck
                size={20}
                className="text-[#B8FF3C]"
              />

              <span>Not Revoked</span>
            </div>
          </div>

          {/* Created */}
          <div>
            <p className="text-xs uppercase tracking-wide text-[#889098]">
              Created At
            </p>

            <div className="mt-4 flex items-center gap-3 text-lg">
              <CalendarDays
                size={20}
                className="text-[#B8FF3C]"
              />

              <span>{apiKey.createdAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <FeatureCard
          icon={<ShieldCheck size={30} />}
          title="Secure Storage"
          description="API keys are encrypted and securely managed."
        />

        <FeatureCard
          icon={<TrendingUp size={30} />}
          title="Usage Monitoring"
          description="Track API usage and last activity in real time."
        />

        <FeatureCard
          icon={<Zap size={30} />}
          title="Instant Revocation"
          description="Immediately revoke compromised credentials."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-[#1A2A32] bg-[#14171C]/50 p-7 backdrop-blur-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#B8FF3C]/20 bg-[#B8FF3C]/5 text-[#B8FF3C] shadow-[0_0_30px_rgba(184,255,60,0.1)]">
        {icon}
      </div>

      <h3 className="mt-7 text-xl font-medium">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#889098]">
        {description}
      </p>
    </div>
  );
}