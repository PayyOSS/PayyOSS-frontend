"use client";

import { useAccount } from "wagmi";

export default function Wallet() {
  const { address, isConnected } = useAccount();

  return (
    <div className="w-full p-5 sm:p-8">
      <div className="max-w-3xl rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b8ff3c]/70">
          Wallet
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white">
          {isConnected ? "Wallet connected" : "No wallet connected"}
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          {isConnected
            ? "Your connected wallet is ready for merchant wallet actions."
            : "Use the connect button in the top navigation to connect a wallet."}
        </p>

        {isConnected && (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-zinc-500">Address</p>
            <p className="mt-1 break-all font-mono text-sm text-zinc-200">
              {address}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
