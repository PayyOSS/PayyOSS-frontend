"use client";

import {
  Plus,
  KeyRound,
  Clock3,
  ShieldCheck,
  CalendarDays,
  TrendingUp,
  Zap,
  Trash2,
} from "lucide-react";

type ApiKey = {
  keyPrefix: string;
  environment: string;
  scopes: string[];
  lastUsedAt: string | null;
  revokedAt: string | null;
  createdAt: string | null;
  status: string;
};

export default function ApiKeyShowPage() {
  // Set to `null` when the merchant has no API key yet.
  const apiKey: ApiKey | null = {
    keyPrefix: "payyos_live_sk_7f3a****",
    environment: "Production",
    scopes: ["payments:write"],
    lastUsedAt: "2 hours ago",
    revokedAt: null,
    createdAt: "Jun 23, 2026 • 09:41 UTC",
    status: "Active",
  };

  const hasApiKey = !!apiKey?.keyPrefix;

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

        <button className="flex h-10 items-center justify-center gap-2 rounded-2xl border border-[#B8FF3C] px-4 text-sm font-medium text-[#B8FF3C] shadow-[0_0_35px_rgba(184,255,60,0.15)] transition hover:bg-[#B8FF3C]/10 active:scale-95">
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
                {hasApiKey ? "Active API Key" : "No API Key"}
              </h2>

              <p className="mt-2 text-[#889098]">
                {hasApiKey
                  ? "Use this key to authenticate your API requests."
                  : "You don't have an API key yet. Create one to start authenticating your requests."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasApiKey ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#B8FF3C]/10 px-4 py-2 text-sm text-[#B8FF3C]">
                <span className="h-2 w-2 rounded-full bg-[#B8FF3C]" />
                {apiKey?.status ?? "Active"}
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-[#889098]">
                <span className="h-2 w-2 rounded-full bg-[#889098]" />
                Inactive
              </span>
            )}

            {hasApiKey && (
              <button
                aria-label="Delete API key"
                className="flex h-8 w-8 items-center cursor-pointer justify-center rounded-xl border border-white/10 bg-white/5 text-[#889098] transition hover:bg-white/10 hover:text-white active:scale-95"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 divide-y divide-white/5 md:grid-cols-2 md:divide-y-0 md:divide-x xl:grid-cols-3">
  {/* Key Prefix */}
  <div className="p-6">
    <p className="text-[11px] uppercase tracking-wider text-[#889098]">
      Key Prefix
    </p>

    <p
      className={`mt-3 text-lg font-medium break-all ${
        hasApiKey ? "" : "text-[#889098]"
      }`}
    >
      {hasApiKey ? apiKey?.keyPrefix : "No API Key"}
    </p>
  </div>

  {/* Environment */}
  <div className="p-6">
    <p className="text-[11px] uppercase tracking-wider text-[#889098]">
      Environment
    </p>

    <div className="mt-3">
      {hasApiKey ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-[#B8FF3C]/10 px-3 py-1.5 text-sm font-medium text-[#B8FF3C]">
          <span className="h-2 w-2 rounded-full bg-[#B8FF3C]" />
          {apiKey?.environment}
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-[#889098]">
          <span className="h-2 w-2 rounded-full bg-[#889098]" />
          No Environment
        </span>
      )}
    </div>
  </div>

  {/* Scopes */}
  <div className="p-6">
    <p className="text-[11px] uppercase tracking-wider text-[#889098]">
      Scopes
    </p>

    <div className="mt-3 flex flex-wrap gap-2">
      {hasApiKey && apiKey && apiKey.scopes.length > 0 ? (
        apiKey.scopes.map((scope) => (
          <span
            key={scope}
            className="rounded-full bg-[#1A2A32] px-3 py-1 text-xs text-white"
          >
            {scope}
          </span>
        ))
      ) : (
        <span className="text-sm text-[#889098]">No Scopes</span>
      )}
    </div>
  </div>

  {/* Last Used */}
  <div className="p-6">
    <p className="text-[11px] uppercase tracking-wider text-[#889098]">
      Last Used At
    </p>

    <div className="mt-3 flex items-center gap-2 text-sm">
      <Clock3
        size={16}
        className={hasApiKey ? "text-[#B8FF3C]" : "text-[#889098]"}
      />
      <span className={hasApiKey ? "" : "text-[#889098]"}>
        {hasApiKey ? apiKey?.lastUsedAt ?? "Never Used" : "Never Used"}
      </span>
    </div>
  </div>

  {/* Revoked */}
  <div className="p-6">
    <p className="text-[11px] uppercase tracking-wider text-[#889098]">
      Revoked At
    </p>

    <div className="mt-3 flex items-center gap-2 text-sm">
      <ShieldCheck
        size={16}
        className={hasApiKey ? "text-[#B8FF3C]" : "text-[#889098]"}
      />

      <span className={hasApiKey ? "" : "text-[#889098]"}>
        {hasApiKey ? apiKey?.revokedAt ?? "Not Revoked" : "No API Key"}
      </span>
    </div>
  </div>

  {/* Created */}
  <div className="p-6">
    <p className="text-[11px] uppercase tracking-wider text-[#889098]">
      Created At
    </p>

    <div className="mt-3 flex items-center gap-2 text-sm">
      <CalendarDays
        size={16}
        className={hasApiKey ? "text-[#B8FF3C]" : "text-[#889098]"}
      />

      <span className={hasApiKey ? "" : "text-[#889098]"}>
        {hasApiKey ? apiKey?.createdAt ?? "Not Created" : "Not Created"}
      </span>
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