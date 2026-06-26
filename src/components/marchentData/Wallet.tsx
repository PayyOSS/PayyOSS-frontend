"use client";

import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  Wallet,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Pencil,
  X,
} from "lucide-react";

export default function WalletOverview() {
  const [isEditing, setIsEditing] = useState(false);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { openConnectModal } = useConnectModal();

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <>
      <div className="w-full p-5 sm:p-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#05080A]/70 p-6 backdrop-blur-xl">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,255,60,0.08),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(11,13,15,0.8),transparent_40%)]" />

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md transition hover:border-[#b8ff3c]/30 hover:bg-[#b8ff3c]/10 hover:text-[#b8ff3c]"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          {/* Header */}
          <div className="relative flex items-center gap-2 text-sm text-zinc-300">
            <Wallet className="h-4 w-4 text-[#b8ff3c]" />
            <span>Wallet Overview</span>
          </div>

          <div className="relative mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">
            {/* Wallet Card */}
            <div className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 lg:w-auto lg:min-w-[320px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10">
                <Wallet className="h-8 w-8 text-[#b8ff3c]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">Wallet Address</p>

                <div className="mt-1">
                  <p className="truncate font-medium text-white">
                    {shortAddress || "Not Connected"}
                  </p>
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
              <div className="min-w-[180px] border-l border-white/10 py-2 pl-8">
                <p className="text-sm text-zinc-500">
                  Verification Status
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-[#b8ff3c]" />
                  <span className="text-lg font-medium text-white">
                    ID Verified
                  </span>
                </div>
              </div>

              <div className="min-w-[180px] border-l border-white/10 py-2 pl-8">
                <p className="text-sm text-zinc-500">Wallet Label</p>

                <div className="mt-3 flex items-center gap-3">
                  <Tag className="h-6 w-6 text-[#b8ff3c]" />
                  <span className="text-lg font-medium text-white">
                    Main Wallet
                  </span>
                </div>
              </div>

              <div className="min-w-[180px] border-l border-white/10 py-2 pl-8">
                <p className="text-sm text-zinc-500">Default Status</p>

                <div className="mt-3 flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#b8ff3c]" />
                  <span className="text-lg font-medium text-white">
                    True
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#05080A] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                Edit Wallet
              </h2>

              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-6">
              {/* Wallet Connection */}
              <div>
                <p className="mb-3 text-sm text-zinc-500">
                  Wallet Connection
                </p>

                {isConnected ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs text-zinc-500">
                      Wallet Address
                    </p>

                    <p className="mt-2 break-all font-mono text-white">
                      {address}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={openConnectModal}
                    className="rounded-xl border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 px-5 py-3 font-medium text-[#b8ff3c] transition hover:bg-[#b8ff3c]/20"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>

              {/* Chain ID */}
              {isConnected && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs text-zinc-500">Chain ID</p>

                  <p className="mt-2 text-lg font-medium text-white">
                    {chainId}
                  </p>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={() => setIsEditing(false)}
                className="w-full rounded-xl bg-[#b8ff3c] px-5 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}