"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  KeyRound,
  Link2,
  ShieldCheck,
  Webhook,
  X,
} from "lucide-react";
import { useWebHookStore } from "@/stores/useWebHookStore";
import { useMerchantStore } from "@/stores/useMerchantStore";
import api from "@/config/axios";
import toast from "react-hot-toast";
import axios from "axios";

type AddWebhookModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateAndUpdateWebhookModal({
  isOpen,
  onClose,
}: AddWebhookModalProps) {
  const webHook = useWebHookStore((state) => state.webHook);
  const setWebHook = useWebHookStore((state) => state.setWebHook);
  const merchant = useMerchantStore((state) => state.merchant);
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [webhookSecret, setWebhookSecret] = useState<string | null>(null);
  const hasExistingWebhook = Boolean(webHook.url.trim());

  useEffect(() => {
    if (!isOpen) return;

    setUrl(webHook.url);
    setError("");
  }, [isOpen, webHook.url]);

  if (!isOpen) return null;


  const handleSubmit = async () => {
    setError("");

    if (!merchant.id) {
      setError("Merchant information is unavailable. Please refresh and try again.");
      return;
    }

    if (!url.trim()) {
      setError("Webhook URL is required.");
      return;
    }

    try {
      const parsedUrl = new URL(url.trim());

      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        setError("Webhook URL must use HTTP or HTTPS.");
        return;
      }

      const normalizedUrl = parsedUrl.toString();

      if (hasExistingWebhook && !webHook.id) {
        setError("Webhook ID is unavailable. Please refresh and try again.");
        return;
      }

      setIsSubmitting(true);

      const payload = { serverUrl: normalizedUrl };
      const { data } = hasExistingWebhook
        ? await api.patch(`/webhook/update/${webHook.id}`, payload)
        : await api.post(`/webhook/create/${merchant.id}`, payload);

      if (!data.webhook) {
        throw new Error("The server did not return webhook details.");
      }

      setWebHook({
        id: data.webhook.id ?? webHook.id ?? "",
        url:
          data.webhook.url ??
          data.webhook.serverWebHookUrl ??
          normalizedUrl,
        secretPrefix:
          data.webhook.secretPrefix ?? webHook.secretPrefix ?? "",
        secretHash: data.webhook.secretHash ?? webHook.secretHash ?? "",
        enabled: data.webhook.enabled ?? webHook.enabled ?? true,
        createdAt:
          data.webhook.createdAt ??
          webHook.createdAt ??
          new Date().toISOString(),
      });

      toast.success(
        hasExistingWebhook
          ? "Webhook updated successfully."
          : "Webhook created successfully.",
      );

      if (data.webhookSecret) {
        setWebhookSecret(data.webhookSecret);
      } else {
        setUrl("");
        onClose();
      }
    } catch (submitError) {
      if (axios.isAxiosError(submitError)) {
        const responseMessage = submitError.response?.data?.message;
        const message = Array.isArray(responseMessage)
          ? responseMessage.join(" ")
          : responseMessage;

        setError(message || "Failed to save the webhook. Please try again.");
      } else if (submitError instanceof TypeError) {
        setError("Enter a valid webhook URL.");
      } else {
        console.error("Failed to save webhook:", submitError);
        setError("Failed to save the webhook. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (webhookSecret) {
    return (
      <WebhookSecretPanel
        secret={webhookSecret}
        onClose={() => {
          setWebhookSecret(null);
          setUrl("");
          onClose();
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-[18px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-webhook-title"
    >
      {/* Extra dark blur layer */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[radial-gradient(circle_at_50%_45%,rgba(26,42,50,0.2),rgba(0,0,0,0.76)_65%)]"
      />

      <section className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[26px] border border-white/15 bg-[#080D10]/95 shadow-[0_24px_100px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
        {/* Subtle edge accents */}
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#B8FF3C]/70 to-transparent" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[#B8FF3C]/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-[#1A2A32]/40 blur-3xl" />

        <div className="relative p-5 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#B8FF3C]/15 bg-[#B8FF3C]/8 text-[#B8FF3C]">
                <Webhook size={27} />
              </div>

              <div>
                <h2
                  id="add-webhook-title"
                  className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  {hasExistingWebhook ? "Update Webhook" : "Add New Webhook"}
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#889098] sm:text-base">
                  Enter the endpoint URL where you want to receive webhook
                  events from PayyOSS.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="group flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-[#889098] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] active:translate-y-0 active:scale-90"
              aria-label="Close"
            >
              <X
                size={21}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            </button>
          </div>

          <div className="my-6 h-px bg-white/8" />

          {/* URL field */}
          <div>
            <label
              htmlFor="webhook-url"
              className="text-sm font-medium text-white"
            >
              Endpoint URL <span className="text-red-400">*</span>
            </label>

            <div
              className={`mt-3 flex min-w-0 items-center rounded-2xl border bg-black/35 transition focus-within:ring-2 ${
                error
                  ? "border-red-500/50 focus-within:border-red-400 focus-within:ring-red-500/10"
                  : "border-[#B8FF3C]/45 focus-within:border-[#B8FF3C] focus-within:ring-[#B8FF3C]/10"
              }`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center text-[#B8FF3C]">
                <Link2 size={21} />
              </div>

              <input
                id="webhook-url"
                type="url"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    void handleSubmit();
                  }
                }}
                placeholder="https://your-domain.com/webhooks/payyoss"
                autoComplete="url"
                className="h-14 min-w-0 flex-1 border-0 bg-transparent pr-4 text-sm text-white outline-none placeholder:text-[#889098]/70 sm:text-base"
              />
            </div>

            {error ? (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            ) : (
              <p className="mt-2 text-sm leading-6 text-[#889098]">
                PayyOSS will send an HTTPS POST request to this URL whenever a
                subscribed event occurs.
              </p>
            )}
          </div>

          {/* Information box */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#1A2A32]/25 p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B8FF3C]/10 bg-[#B8FF3C]/5 text-[#B8FF3C]">
              <ShieldCheck size={22} />
            </div>

            <div className="min-w-0">
              <h3 className="font-medium text-white">Before you continue</h3>
              <p className="mt-1 text-sm leading-6 text-[#889098]">
                Make sure the endpoint is publicly accessible, uses HTTPS and
                can accept POST requests from PayyOSS.
              </p>
            </div>

            <span className="shrink-0 rounded-lg border border-[#B8FF3C]/15 bg-[#B8FF3C]/8 px-3 py-1.5 text-xs font-medium text-[#B8FF3C]">
              HTTPS POST
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex flex-col-reverse gap-3 border-t border-white/8 bg-black/20 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-11 cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] px-6 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] active:translate-y-0 active:scale-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isSubmitting}
            className="group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#B8FF3C] px-7 text-sm font-semibold text-[#0B0D0F] shadow-[0_10px_30px_rgba(184,255,60,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#9BE83A] hover:shadow-[0_12px_34px_rgba(184,255,60,0.25)] active:translate-y-0 active:scale-[0.96] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? hasExistingWebhook
                ? "Updating..."
                : "Submitting..."
              : hasExistingWebhook
                ? "Update"
                : "Submit"}
            {!isSubmitting && (
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

function WebhookSecretPanel({
  secret,
  onClose,
}: {
  secret: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
    } catch (copyError) {
      console.error("Failed to copy webhook secret:", copyError);
    }
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4 backdrop-blur-[18px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="webhook-secret-title"
    >
      <section className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-[#B8FF3C]/20 bg-[#080D10] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.8)] sm:p-8">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#B8FF3C] to-transparent" />

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B8FF3C]/20 bg-[#B8FF3C]/5 text-[#B8FF3C] shadow-[0_0_35px_rgba(184,255,60,0.15)]">
          <KeyRound size={28} />
        </div>

        <h2
          id="webhook-secret-title"
          className="mt-6 text-2xl font-semibold text-white"
        >
          Webhook Created
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#889098]">
          Copy your webhook secret now. For security reasons, it will not be
          shown again after you close this window.
        </p>

        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-wider text-[#889098]">
            Webhook Secret
          </p>

          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#1A2A32] bg-[#020608] p-4">
            <code className="min-w-0 flex-1 break-all font-mono text-sm text-white">
              {secret}
            </code>

            <button
              type="button"
              onClick={() => void handleCopy()}
              aria-label="Copy webhook secret"
              className="group flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#B8FF3C]/20 bg-[#B8FF3C]/10 text-[#B8FF3C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B8FF3C]/20 hover:shadow-[0_8px_24px_rgba(184,255,60,0.16)] active:translate-y-0 active:scale-90"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          {copied && (
            <p className="mt-2 text-xs text-[#B8FF3C]">
              Copied to clipboard
            </p>
          )}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-yellow-400"
          />
          <p className="text-sm leading-6 text-yellow-200/80">
            Store this secret securely. It is required to verify that webhook
            requests were sent by PayyOSS.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={!copied}
          className="mt-7 w-full cursor-pointer rounded-2xl bg-[#B8FF3C] px-4 py-3 text-sm font-semibold text-black shadow-[0_0_35px_rgba(184,255,60,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_30px_rgba(184,255,60,0.22)] active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:brightness-100"
        >
          {copied ? "I’ve saved my secret" : "Copy the secret to continue"}
        </button>
      </section>
    </div>
  );
}
