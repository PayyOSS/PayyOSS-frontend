"use client";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  return (
    <div className="w-full p-5 sm:p-8">
      <div className="relative max-w-3xl rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6">

        <div className="absolute top-4 right-4 z-10">
          {isConnected ? (
            <button
              onClick={() => disconnect()}
              className="px-4 py-2 cursor-pointer text-sm text-red-400 border border-white/10 hover:bg-white/5 rounded-lg transition-all"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={openConnectModal}
              className="px-4 py-2 cursor-pointer text-sm text-[#b8ff3c] border border-[#b8ff3c]/20 hover:bg-[#b8ff3c]/10 rounded-lg transition-all"
            >
              Connect
            </button>
          )}
        </div>

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
          <div className="mt-6 rounded-xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs text-zinc-500">Wallet Address</p>
            <p className="mt-1 break-all font-mono text-sm text-zinc-200">
              {address}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}