"use client";

import axios from "axios";
import {
  AlertTriangle,
  KeyRound,
  Loader2,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/config/axios";
import { useApiKeyStore } from "@/stores/useApiKeyStore";
import { useMerchantAssetStore } from "@/stores/useMerchantAssetStore";
import { useMerchantStore } from "@/stores/useMerchantStore";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";
import { useTransectionStore } from "@/stores/useTransectionStore";
import { useWebHookStore } from "@/stores/useWebHookStore";

interface DeleteMerchantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DeleteMerchantResponse {
  success: boolean;
  message?: string;
}

function createConfirmationText() {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomValues = new Uint32Array(6);
  window.crypto.getRandomValues(randomValues);

  const code = Array.from(
    randomValues,
    (value) => characters[value % characters.length],
  ).join("");

  return `DELETE-${code}`;
}

export default function DeleteMerchant({
  isOpen,
  onClose,
}: DeleteMerchantProps) {
  const router = useRouter();
  const merchantName = useMerchantStore((state) => state.merchant.name);
  const resetMerchant = useMerchantStore((state) => state.resetMerchant);
  const resetMerchantAsset = useMerchantAssetStore(
    (state) => state.resetMerchantAsset,
  );
  const resetMerchantWallet = useMerchantWalletStore(
    (state) => state.resetMerchantWallet,
  );
  const resetApiKey = useApiKeyStore((state) => state.resetApiKey);
  const resetTransections = useTransectionStore(
    (state) => state.resetTransections,
  );
  const resetWebHook = useWebHookStore((state) => state.resetWebHook);
  const [confirmationText, setConfirmationText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setConfirmationText(createConfirmationText());
    setTypedText("");
    setError("");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDeleting) onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isDeleting, isOpen, onClose]);

  if (!isOpen) return null;

  const isConfirmed =
    confirmationText.length > 0 && typedText === confirmationText;

  const handleDelete = async () => {
    if (!isConfirmed || isDeleting) return;

    setError("");
    setIsDeleting(true);

    try {
      const { data } = await api.delete<DeleteMerchantResponse>(
        "/merchant/delete",
      );

      if (!data.success) {
        throw new Error(data.message || "The merchant could not be deleted.");
      }

      resetApiKey();
      resetMerchantAsset();
      resetMerchantWallet();
      resetTransections();
      resetWebHook();
      resetMerchant();

      // The merchant is gone, so no merchant-scoped state should survive locally.
      window.localStorage.clear();

      toast.success(data.message || "Merchant deleted successfully.");
      router.replace("/create_marchent");
      router.refresh();
    } catch (deleteError) {
      if (axios.isAxiosError(deleteError)) {
        const responseMessage = deleteError.response?.data?.message;
        setError(
          (Array.isArray(responseMessage)
            ? responseMessage.join(" ")
            : responseMessage) || "Failed to delete the merchant.",
        );
      } else {
        setError(
          deleteError instanceof Error
            ? deleteError.message
            : "Failed to delete the merchant.",
        );
      }
    //   setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-3 backdrop-blur-[18px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-merchant-title"
      aria-describedby="delete-merchant-description"
    >
      <button
        type="button"
        aria-label="Close delete merchant dialog"
        onClick={() => !isDeleting && onClose()}
        className="absolute inset-0 cursor-default"
      />

      <section className="relative z-10 my-auto w-full max-w-xl overflow-hidden rounded-[28px] border border-red-500/25 bg-[linear-gradient(145deg,rgba(22,9,11,0.99),rgba(5,7,9,0.99))] shadow-[0_35px_130px_rgba(0,0,0,0.9)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-red-400/90 to-transparent" />

        <header className="flex items-start justify-between gap-4 border-b border-red-500/15 px-5 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/10 text-red-400">
              <ShieldAlert size={25} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                Danger zone
              </p>
              <h2
                id="delete-merchant-title"
                className="mt-1 text-xl font-semibold text-white sm:text-2xl"
              >
                Permanently delete merchant
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close"
            className="group flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#889098] transition hover:bg-white/[0.08] hover:text-white active:scale-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} className="transition-transform group-hover:rotate-90" />
          </button>
        </header>

        <div className="px-5 py-5 sm:px-7">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.07] p-4">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 shrink-0 text-red-400" size={20} />
              <div>
                <p className="font-semibold text-red-300">
                  This action cannot be undone
                </p>
                <p
                  id="delete-merchant-description"
                  className="mt-1 text-sm leading-6 text-red-100/65"
                >
                  Deleting {merchantName ? `“${merchantName}”` : "this merchant"}
                  {" "}is permanent. You cannot recover or revoke this action later.
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-4 grid gap-2 text-sm text-[#A6ADB5]">
            <li className="flex items-start gap-2.5">
              <Trash2 size={16} className="mt-0.5 shrink-0 text-red-400" />
              Merchant settings and connected resources will be removed.
            </li>
            <li className="flex items-start gap-2.5">
              <KeyRound size={16} className="mt-0.5 shrink-0 text-red-400" />
              API keys, wallets, assets, and webhook configuration will no longer be available.
            </li>
          </ul>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
            <label
              htmlFor="delete-merchant-confirmation"
              className="block text-sm leading-6 text-[#C8CDD1]"
            >
              To confirm, type the exact verification text below:
            </label>
            <code className="mt-2 block select-all rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-center font-mono text-sm font-semibold tracking-[0.12em] text-red-300">
              {confirmationText}
            </code>
            <input
              id="delete-merchant-confirmation"
              type="text"
              value={typedText}
              onChange={(event) => {
                setTypedText(event.target.value);
                setError("");
              }}
              disabled={isDeleting}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="Type the verification text"
              className="mt-3 h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 font-mono text-sm text-white outline-none transition placeholder:font-sans placeholder:text-[#667078] focus:border-red-400/70 focus:ring-2 focus:ring-red-500/10 disabled:opacity-60"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-white/8 bg-black/20 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-11 cursor-pointer rounded-xl border border-white/10 px-6 text-sm font-medium text-white transition hover:bg-white/[0.06] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Keep merchant
          </button>

          {isConfirmed && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(239,68,68,0.2)] transition hover:-translate-y-0.5 hover:bg-red-400 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Deleting merchant...
                </>
              ) : (
                <>
                  <Trash2 size={17} />
                  Permanently delete
                </>
              )}
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}
