"use client";

import { useState } from "react";
import { Copy, Check, X, KeyRound, AlertTriangle } from "lucide-react";

type ShowApiKeyProps = {
  secretKey: string;
  onClose: () => void;
};

export default function ShowApiKey({ secretKey, onClose }: ShowApiKeyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secretKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy API key:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-[#1A2A32] bg-[#14171C] p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#889098] transition hover:bg-white/10 hover:text-white active:scale-95"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B8FF3C]/20 bg-[#B8FF3C]/5 text-[#B8FF3C] shadow-[0_0_35px_rgba(184,255,60,0.15)]">
          <KeyRound size={28} />
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-2xl font-medium text-white">
          API Key Created
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#889098]">
          Copy your secret key now. For security reasons, you won&apos;t be able
          to see it again.
        </p>

        {/* Secret key box */}
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-wider text-[#889098]">
            Secret Key
          </p>

          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#1A2A32] bg-[#0B0D0F] p-4">
            <code className="flex-1 break-all font-mono text-sm text-white">
              {secretKey}
            </code>

            <button
              onClick={handleCopy}
              aria-label="Copy API key"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#B8FF3C]/20 bg-[#B8FF3C]/10 text-[#B8FF3C] transition hover:bg-[#B8FF3C]/20 active:scale-95"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          {copied && (
            <p className="mt-2 text-xs text-[#B8FF3C]">Copied to clipboard</p>
          )}
        </div>

        {/* Warning */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-yellow-400" />
          <p className="text-sm leading-6 text-yellow-200/80">
            Store this key in a safe place. Anyone with this key can access your
            account.
          </p>
        </div>

        {/* Done */}
        <button
          onClick={onClose}
          className="mt-7 w-full rounded-2xl bg-[#B8FF3C] px-4 py-3 text-sm font-semibold text-black shadow-[0_0_35px_rgba(184,255,60,0.15)] transition hover:opacity-90 active:scale-95"
        >
          I&apos;ve saved my key
        </button>
      </div>
    </div>
  );
}
