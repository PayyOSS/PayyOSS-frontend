"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  KeyRound,
  Clock3,
  ShieldCheck,
  CalendarDays,
  TrendingUp,
  Zap,
  Trash2,
  Loader2,
} from "lucide-react";
import { useApiKeyStore } from "@/stores/useApiKeyStore";
import { useMerchantStore } from "@/stores/useMerchantStore";
import api from "@/config/axios";
import ShowApiKey from "./ShowApiKey";
import ApiKeyLoader from "./ApiKeyLoader";
import toast from "react-hot-toast";

export default function ApiKeyShowPage() {
  const { apiKey, setApiKey, resetApiKey } = useApiKeyStore();
  const { merchant } = useMerchantStore();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [secretKey, setSecretKey] = useState<string | null>(null);

  const hasApiKey = !!apiKey?.keyPrefix;

  useEffect(() => {
    if (!merchant.id) {
      setIsLoading(false);
      return;
    }

    const fetchApiKey = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api-key/get/${merchant?.id}/${merchant?.environment}`);

        if (data.apikey) {
          setApiKey({
            id: data.apikey.id,
            keyPrefix: data.apikey.keyPrefix,
            environment: data.apikey.environment,
            scopes: data.apikey.scopes,
            lastUsedAt: data.apikey.lastUsedAt,
            revokedAt: data.apikey.revokedAt,
            createdAt: data.apikey.createdAt,
          });
        } else {
          resetApiKey();
        }
      } catch (err) {
        console.error("Failed to fetch API key:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKey();
  }, [merchant.id]);

  const handleDeleteApiKey = async () => {
    if (!apiKey?.id) return;

    setIsDeleting(true);
    try {
     const { data } =  await api.delete(`/api-key/delete/${apiKey.id}`);
      resetApiKey();
      setShowDeleteModal(false);
      toast.success(data.message || "API key deleted successfully.");
    } catch (err) {
      console.error("Failed to delete API key:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateApiKey = async () => {
    if (!merchant.id) return;

    setIsCreating(true);
    try {
      const { data } = await api.post(`/api-key/create/${merchant.id}/${merchant.environment}`, {
        merchantId: merchant.id,
        environment: merchant.environment,
      });

      if (data.apikey) {
        setApiKey({
          id: data.apikey.id,
          keyPrefix: data.apikey.keyPrefix,
          environment: data.apikey.environment,
          scopes: data.apikey.scopes,
          lastUsedAt: data.apikey.lastUsedAt,
          revokedAt: data.apikey.revokedAt,
          createdAt: data.apikey.createdAt,
        });
      }

      // Show the secret key once — it's only returned at creation time.
      if (data.secretKey) {
        setSecretKey(data.secretKey);
      }
    } catch (err) {
      console.error("Failed to create API key:", err);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return <ApiKeyLoader />;
  }

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

        {!hasApiKey && (
          <button
            onClick={handleCreateApiKey}
            disabled={isCreating}
            className="flex mt-0 md:mt-7 cursor-pointer h-10 items-center justify-center gap-2 rounded-2xl border border-[#B8FF3C] px-4 text-sm font-medium text-[#B8FF3C] shadow-[0_0_35px_rgba(184,255,60,0.15)] transition hover:bg-[#B8FF3C]/10 active:scale-95 disabled:opacity-50"
          >
            {isCreating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Plus size={18} />
            )}
            {isCreating ? "Creating..." : "Create API Key"}
          </button>
        )}
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
                {apiKey?.revokedAt ? "Revoked" : "Active"}
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-[#889098]">
                <span className="h-2 w-2 rounded-full bg-[#889098]" />
                Inactive
              </span>
            )}

            {hasApiKey && (
              <button
                onClick={() => setShowDeleteModal(true)}
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
      className={`mt-3 font-mono text-lg font-normal tracking-tight ${
        hasApiKey ? "text-white" : "text-[#889098]"
      }`}
    >
      {hasApiKey
        ? `${apiKey?.keyPrefix?.slice(0, 20)}...`
        : "No API Key"}
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
      {hasApiKey && apiKey.scopes && apiKey.scopes.length > 0 ? (
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#14171C] p-7 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-5 text-xl font-medium text-white">
              Delete API Key
            </h2>

            <p className="mt-2 text-sm text-[#889098]">
              Are you sure you want to delete this key? This action cannot be
              undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-[#889098] backdrop-blur-md transition hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteApiKey}
                disabled={isDeleting}
                className="flex-1 cursor-pointer rounded-2xl bg-[#B8FF3C] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_35px_rgba(184,255,60,0.15)] transition hover:opacity-90 active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* One-time Secret Key Modal */}
      {secretKey && (
        <ShowApiKey secretKey={secretKey} onClose={() => setSecretKey(null)} />
      )}
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
