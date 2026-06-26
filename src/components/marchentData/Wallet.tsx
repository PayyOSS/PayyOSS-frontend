"use client";

import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Wallet, ShieldCheck, Tag, CheckCircle2 } from "lucide-react";

export default function WalletOverview() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <div className="w-full p-5 sm:p-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#05080A]/70 p-6 backdrop-blur-xl">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,255,60,0.08),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(11,13,15,0.8),transparent_40%)]" />

        {/* Header */}
        <div className="relative flex items-center gap-2 text-sm text-zinc-300">
          <Wallet className="h-4 w-4 text-[#b8ff3c]" />
          <span>Wallet Overview</span>
        </div>

        <div className="relative mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* Wallet Card */}
          <div className="flex w-full lg:w-auto lg:min-w-[320px] items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10">
              <Wallet className="h-8 w-8 text-[#b8ff3c]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500">Wallet Address</p>

              <div className="mt-1 flex items-center gap-2">
                <p className="font-medium text-white  overflow-hidden truncate min-w-0">{shortAddress}</p>
              </div>

              {isConnected ? (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 px-3 py-1 text-xs text-[#b8ff3c]">
                  <span className="h-2 w-2 rounded-full bg-[#b8ff3c]" />
                  Connected
                </div>
              ) : (
                <button
                  onClick={openConnectModal}
                  className="mt-3 rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 px-4 py-1.5 text-xs font-medium text-[#b8ff3c] transition hover:bg-[#b8ff3c]/20"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>

          {/* Info Items */}
          <div className="flex flex-1 flex-col gap-8 md:flex-row md:justify-around">
            <div className="min-w-45 border-l border-white/10 pl-8 py-2">
              <p className="text-sm text-zinc-500">Verification Status</p>

              <div className="mt-3 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-[#b8ff3c]" />
                <span className="text-lg font-medium text-white">
                  ID Verified
                </span>
              </div>
            </div>

            <div className="min-w-45 border-l border-white/10 pl-8 py-2">
              <p className="text-sm text-zinc-500">Wallet Label</p>

              <div className="mt-3 flex items-center gap-3">
                <Tag className="h-6 w-6 text-[#b8ff3c]" />
                <span className="text-lg font-medium text-white">
                  Main Wallet
                </span>
              </div>
            </div>

            <div className="min-w-45 border-l border-white/10 pl-8 py-2">
              <p className="text-sm text-zinc-500">Default Status</p>

              <div className="mt-3 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-[#b8ff3c]" />
                <span className="text-lg font-medium text-white">True</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
