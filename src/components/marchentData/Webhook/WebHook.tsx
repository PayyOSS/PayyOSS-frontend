"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  KeyRound,
  Link2,
  Loader2,
  Pencil,
  Plus,
  RadioTower,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useWebHookStore } from "@/stores/useWebHookStore";
import { useMerchantStore } from "@/stores/useMerchantStore";
import api from "@/config/axios";
import CreateAndUpdateWebhookModal from "./createAndUpdate";
import WebhookLoader from "./Loader";
import toast from "react-hot-toast";

interface WebhookDelivery {
  event: string;
  status: string;
  attempt: string;
  time: string;
}

const deliveries: WebhookDelivery[] = [];

export default function Webhook() {
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const webHook = useWebHookStore((state) => state.webHook);
  const setWebHook = useWebHookStore((state) => state.setWebHook);
  const resetWebHook = useWebHookStore((state) => state.resetWebHook);
  const merchantId = useMerchantStore((state) => state.merchant.id);
  const hasWebHook = Boolean(webHook.url.trim());

  useEffect(() => {
    if (!merchantId) {
      resetWebHook();
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchWebhook = async () => {
      setIsLoading(true);

      try {
        const { data } = await api.get(`/webhook/get/${merchantId}`);

        if (isCancelled) return;

        const fetchedWebhook = data.webhook ?? data.webhooks?.[0];

        if (!fetchedWebhook) {
          resetWebHook();
          return;
        }

        setWebHook({
          id: fetchedWebhook.id ?? "",
          url:
            fetchedWebhook.url ?? fetchedWebhook.serverWebHookUrl ?? "",
          secretPrefix: fetchedWebhook.secretPrefix ?? "",
          secretHash: fetchedWebhook.secretHash ?? "",
          enabled: fetchedWebhook.enabled ?? true,
          createdAt: fetchedWebhook.createdAt ?? null,
        });
      } catch (fetchError) {
        if (isCancelled) return;

        resetWebHook();
        console.error("Failed to fetch webhook:", fetchError);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    void fetchWebhook();

    return () => {
      isCancelled = true;
    };
  }, [merchantId, resetWebHook, setWebHook]);

  const handleDeleteWebhook = async () => {
    if (!webHook.id) {
      toast.error("Webhook ID is unavailable. Please refresh and try again.");
      return;
    }

    setIsDeleting(true);

    try {
      const { data } = await api.delete(`/webhook/delete/${webHook.id}`);

      resetWebHook();
      setShowDeleteModal(false);
      toast.success(data.message ?? "Webhook deleted successfully.");
    } catch (deleteError) {
      console.error("Failed to delete webhook:", deleteError);
      toast.error("Failed to delete the webhook. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <WebhookLoader />;

  return (
    <div className="min-h-screen bg-[#020608] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Webhook Details */}
        <section className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(9,16,20,0.96),rgba(3,8,10,0.98))] p-5 shadow-[0_0_80px_rgba(184,255,60,0.04)] sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold sm:text-2xl">
                {hasWebHook ? "Webhook Details" : "Webhook Endpoint"}
              </h1>

              <p className="mt-2 text-sm text-[#889098]">
                {hasWebHook
                  ? "View and manage your webhook endpoint."
                  : "Create an endpoint to receive webhook events."}
              </p>
            </div>

            {hasWebHook ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsWebhookModalOpen(true)}
                  className="inline-flex cursor-pointer h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm font-medium text-white transition hover:bg-white/[0.05]"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex cursor-pointer h-10 items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 text-sm font-medium text-red-400 transition hover:bg-red-500/15"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsWebhookModalOpen(true)}
                className="group cursor-pointer inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#B8FF3C] px-4 text-sm font-medium text-black shadow-[0_0_0_rgba(184,255,60,0)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(184,255,60,0.22)] active:translate-y-0 active:scale-95"
              >
                <Plus
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                Create Webhook
              </button>
            )}
          </div>

          {hasWebHook ? (
            <div className="mt-6 grid overflow-hidden rounded-2xl border border-white/10 bg-[#050A0D]/80 md:grid-cols-2">
              <DetailItem
                icon={<Link2 size={22} />}
                label="URL"
                value={webHook.url}
                className="border-b border-white/10 md:border-r"
              />

              <DetailItem
                icon={<KeyRound size={22} />}
                label="Secret Prefix"
                value={webHook.secretPrefix}
                className="border-b border-white/10"
              />

              <DetailItem
                icon={<ShieldCheck size={22} />}
                label="Enabled"
                className="border-b border-white/10 md:border-r md:border-b-0"
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium ${
                    webHook.enabled
                      ? "bg-[#B8FF3C]/10 text-[#B8FF3C]"
                      : "bg-white/[0.06] text-[#A6ADB5]"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      webHook.enabled ? "bg-[#B8FF3C]" : "bg-[#A6ADB5]"
                    }`}
                  />
                  {webHook.enabled ? "Enabled" : "Disabled"}
                </span>
              </DetailItem>

              <DetailItem
                icon={<CalendarDays size={22} />}
                label="Created At"
                value={formatCreatedAt(webHook.createdAt)}
                className="md:border-b-0"
              />
            </div>
          ) : (
            <div className="mt-6 flex min-h-65 flex-col items-center justify-center rounded-[28px] border border-dashed border-[#B8FF3C]/20 bg-[#14171C]/50 px-6 py-10 text-center">
              <div className="rounded-2xl bg-[#B8FF3C]/10 p-4 text-[#B8FF3C]">
                <RadioTower size={40} />
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                No webhook endpoint yet
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#889098]">
                Create your first webhook endpoint to receive real-time payment
                updates from PayyOSS.
              </p>
            </div>
          )}
        </section>

        {/* Recent Deliveries */}
        <section className="mt-4 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(9,16,20,0.96),rgba(3,8,10,0.98))] p-5 shadow-[0_0_80px_rgba(184,255,60,0.03)] sm:p-6">
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">
              Recent Deliveries
            </h2>

            <p className="mt-2 text-sm text-[#889098]">
              Latest webhook delivery attempts for this endpoint.
            </p>
          </div>

          {deliveries.length > 0 ? (
            <>
              {/* Desktop table */}
              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/10 md:block">
            <div className="grid grid-cols-[1.2fr_1fr_0.6fr_1.8fr_32px] bg-white/[0.025] px-5 py-4 text-sm text-[#A6ADB5]">
              <span>Event</span>
              <span>Status</span>
              <span>Attempt</span>
              <span>Time</span>
              <span />
            </div>

            {deliveries.map((delivery) => (
              <div
                key={`${delivery.event}-${delivery.time}`}
                className="grid grid-cols-[1.2fr_1fr_0.6fr_1.8fr_32px] items-center border-t border-white/10 px-5 py-5 text-sm"
              >
                <span className="font-medium text-white">
                  {delivery.event}
                </span>

                <span>
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#B8FF3C]/10 px-3 py-1.5 text-xs font-medium text-[#B8FF3C]">
                    <span className="h-2 w-2 rounded-full bg-[#B8FF3C]" />
                    {delivery.status}
                  </span>
                </span>

                <span className="text-white">{delivery.attempt}</span>

                <span className="text-[#A6ADB5]">{delivery.time}</span>

                <ChevronRight
                  size={18}
                  className="justify-self-end text-[#A6ADB5]"
                />
              </div>
            ))}
              </div>

              {/* Mobile cards */}
              <div className="mt-6 grid gap-3 md:hidden">
                {deliveries.map((delivery) => (
                  <div
                    key={`${delivery.event}-${delivery.time}`}
                    className="rounded-2xl border border-white/10 bg-[#050A0D]/80 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium text-white">{delivery.event}</p>
                      <ChevronRight size={18} className="text-[#A6ADB5]" />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-[#B8FF3C]/10 px-3 py-1.5 text-xs font-medium text-[#B8FF3C]">
                        <span className="h-2 w-2 rounded-full bg-[#B8FF3C]" />
                        {delivery.status}
                      </span>

                      <span className="text-sm text-white">
                        Attempt {delivery.attempt}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-[#889098]">
                      {delivery.time}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6 flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#050A0D]/50 px-6 py-8 text-center">
              <RadioTower size={32} className="text-[#889098]" />
              <h3 className="mt-4 text-base font-medium text-white">
                No deliveries yet
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#889098]">
                Webhook delivery attempts will appear here after an event is
                sent to this endpoint.
              </p>
            </div>
          )}
        </section>
      </div>

      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-webhook-title"
        >
          <button
            type="button"
            aria-label="Close delete confirmation"
            onClick={() => !isDeleting && setShowDeleteModal(false)}
            className="absolute inset-0 cursor-default"
          />

          <section className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-[#14171C] p-7 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
              <Trash2 size={22} />
            </div>

            <h2
              id="delete-webhook-title"
              className="mt-5 text-xl font-medium text-white"
            >
              Delete Webhook
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#889098]">
              Are you sure you want to delete this webhook endpoint? Delivery
              attempts to this endpoint will stop immediately.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-[#A6ADB5] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleDeleteWebhook()}
                disabled={isDeleting}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(239,68,68,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-400 hover:shadow-[0_10px_28px_rgba(239,68,68,0.28)] active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting && <Loader2 size={16} className="animate-spin" />}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </section>
        </div>
      )}

      <CreateAndUpdateWebhookModal
        isOpen={isWebhookModalOpen}
        onClose={() => setIsWebhookModalOpen(false)}
      />
    </div>
  );
}

function formatCreatedAt(createdAt: string | null) {
  if (!createdAt) return "Not available";

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return createdAt;

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

function DetailItem({
  icon,
  label,
  value,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex gap-4 p-5 sm:p-6 ${className}`}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#B8FF3C]/10 bg-[#B8FF3C]/5 text-[#B8FF3C]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-[#889098]">{label}</p>

        {children ?? (
          <p className="mt-2 break-all font-medium text-white">{value}</p>
        )}
      </div>
    </div>
  );
}
