"use client";

import { useEffect, useState } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  Wallet,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Pencil,
  X,
  Edit,
} from "lucide-react";
import {
  useMerchantWalletStore,
  VerificationStatus,
} from "@/stores/useMerchantWalletStore";
import { useMerchantStore } from "@/stores/useMerchantStore";
import api from "@/config/axios";

export default function WalletOverview() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { openConnectModal } = useConnectModal();

  const { merchantWallet, setMerchantWallet } = useMerchantWalletStore();
  const { merchant } = useMerchantStore();
  const hasWallet = !!merchantWallet.walletAddress;

  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const shortAddress = merchantWallet.walletAddress
    ? merchantWallet.walletAddress.slice(0, 6) +
      "..." +
      merchantWallet.walletAddress.slice(-4)
    : "";

  useEffect(() => {
    if (isConnected && isEditing) {
      setShowDetails(true);
    }
  }, [isConnected, isEditing]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!hasWallet) {
      setIsEditing(true);
    }
  }, [mounted, hasWallet]);

  const handleOpenModal = () => {
    setIsEditing(true);
    setShowDetails(false);
    setError("");
  };

  const handleCloseModal = () => {
    disconnect();
    setIsEditing(false);
    setShowDetails(false);
    setError("");
  };

  const handleSave = async () => {
  if (!address) return;
  setIsSaving(true);
  setError("");
  try {
    if (hasWallet) {
      // PATCH request for existing wallet
      const { data } = await api.patch(`/wallet/${merchantWallet.id}`, {
        chainId,
        walletAddress: address,
      });

      setMerchantWallet({
        id: data.wallet.id,
        merchantId: data.wallet.merchantId,
        walletAddress: data.wallet.walletAddress,
        chainId: data.wallet.chainId,
        label: data.wallet.label,
        isDefault: data.wallet.isDefault,
        verificationStatus: data.wallet.verificationStatus,
      });
    } else {
      // POST request for new wallet
      const { data } = await api.post("/wallet/create", {
        merchantId: merchant.id,
        walletAddress: address,
        chainId,
        verificationStatus: VerificationStatus.VERIFIED,
      });

      setMerchantWallet({
        id: data.wallet.id,
        merchantId: data.wallet.merchantId,
        walletAddress: data.wallet.walletAddress,
        chainId: data.wallet.chainId,
        label: data.wallet.label,
        isDefault: data.wallet.isDefault,
        verificationStatus: data.wallet.verificationStatus,
      });
    }

    disconnect();
    setIsEditing(false);
    setShowDetails(false);
  } catch (err) {
    setError("Failed to save wallet. Please try again.");
    console.error(err);
  } finally {
    setIsSaving(false);
  }
};

  useEffect(() => {
    if (!merchant.id) return;
    if (hasWallet) return; // when TTL expires, hasWallet will be false and this will re-fetch

    const fetchWallet = async () => {
      try {
        console.log("Fetching wallet for merchant:", merchant.id);
        const { data } = await api.get(`/wallet/merchant/${merchant.id}`);
        if (data.wallet) {
          setMerchantWallet({
            id: data.wallet.id,
            merchantId: data.wallet.merchantId,
            walletAddress: data.wallet.walletAddress,
            chainId: data.wallet.chainId,
            label: data.wallet.label,
            isDefault: data.wallet.isDefault,
            verificationStatus: data.wallet.verificationStatus,
          });
        }
        if (data.wallet) {
          setIsEditing(false);
        }
      } catch (err) {
        console.error("Failed to fetch wallet:", err);
      }
    };

    fetchWallet();
  }, [merchant.id, hasWallet]);

  return (
    <>
      <div className="w-full p-5 sm:p-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#05080A]/70 p-6 backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,255,60,0.08),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(11,13,15,0.8),transparent_40%)]" />

          <button
            onClick={handleOpenModal}
            className="absolute cursor-pointer right-6 top-6 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md transition hover:border-[#b8ff3c]/30 hover:bg-[#b8ff3c]/10 hover:text-[#b8ff3c]"
          >
            <Pencil className="h-4 w-4" />
            {hasWallet ? "Edit Wallet" : "Create Wallet"}
          </button>

          <div className="relative flex items-center gap-2 text-sm text-zinc-300">
            <Wallet className="h-4 w-4 text-[#b8ff3c]" />
            <span>Wallet Overview</span>
          </div>

          <div className="relative mt-6 flex flex-col gap-6 xl:flex-row xl:items-center">
            <div className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 xl:w-auto xl:min-w-[320px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10">
                <Wallet className="h-8 w-8 text-[#b8ff3c]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">Wallet Address</p>

                {hasWallet ? (
                  <>
                    <p className="mt-1 truncate font-medium text-white">
                      {shortAddress}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 px-3 py-1 text-xs text-[#b8ff3c]">
                      <span className="h-2 w-2 rounded-full bg-[#b8ff3c]" />
                      Connected
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mt-1 truncate font-medium text-zinc-500">
                      Not Connected
                    </p>
                    <button
                      className="mt-3 rounded-full border border-[#b8ff3c]/20 bg-[#b8ff3c]/10 px-4 py-1.5 text-xs font-medium text-[#b8ff3c] transition hover:bg-[#b8ff3c]/20"
                    >
                    NO Wallet present
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid w-full flex-1 grid-cols-1 gap-4 md:grid-cols-3">
              <div className="min-w-0 border-l border-white/10 py-2 pl-5 lg:pl-8">
                <p className="whitespace-nowrap text-sm text-zinc-500">
                  Verification Status
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <ShieldCheck
                    className={
                      hasWallet
                        ? "h-6 w-6 shrink-0 text-[#b8ff3c]"
                        : "h-6 w-6 shrink-0 text-zinc-600"
                    }
                  />
                  <span
                    className={
                      hasWallet
                        ? "text-lg font-medium text-white"
                        : "text-lg font-medium text-zinc-600"
                    }
                  >
                    {hasWallet
                      ? merchantWallet.verificationStatus || "PENDING"
                      : "Not Verified"}
                  </span>
                </div>
              </div>

              <div className="min-w-0 border-l border-white/10 py-2 pl-5 lg:pl-8">
                <p className="whitespace-nowrap text-sm text-zinc-500">
                  Wallet Label
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Tag
                    className={
                      hasWallet
                        ? "h-6 w-6 shrink-0 text-[#b8ff3c]"
                        : "h-6 w-6 shrink-0 text-zinc-600"
                    }
                  />
                  <span
                    className={
                      hasWallet
                        ? "text-lg font-medium text-white"
                        : "text-lg font-medium text-zinc-600"
                    }
                  >
                    {hasWallet
                      ? merchantWallet.label || "No Label"
                      : "No Label"}
                  </span>
                </div>
              </div>

              <div className="min-w-0 border-l border-white/10 py-2 pl-5 lg:pl-8">
                <p className="whitespace-nowrap text-sm text-zinc-500">
                  Default Status
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <CheckCircle2
                    className={
                      hasWallet
                        ? "h-6 w-6 shrink-0 text-[#b8ff3c]"
                        : "h-6 w-6 shrink-0 text-zinc-600"
                    }
                  />
                  <span
                    className={
                      hasWallet
                        ? "text-lg font-medium text-white"
                        : "text-lg font-medium text-zinc-600"
                    }
                  >
                    {hasWallet
                      ? merchantWallet.isDefault
                        ? "True"
                        : "False"
                      : "False"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#05080A] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                {hasWallet ? "Edit Wallet" : "Connect Wallet"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-2 cursor-pointer text-zinc-500 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8">
              {!showDetails ? (
                <button
                  onClick={openConnectModal}
                  className="rounded-xl border cursor-pointer border-[#b8ff3c]/20 bg-[#b8ff3c]/10 px-5 py-3 font-medium text-[#b8ff3c] transition hover:bg-[#b8ff3c]/20"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs text-zinc-500">Wallet Address</p>
                    <p className="mt-2 break-all font-mono text-white">
                      {address}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs text-zinc-500">Chain ID</p>
                    <p className="mt-2 text-lg font-medium text-white">
                      {chainId}
                    </p>
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full rounded-xl cursor-pointer bg-[#b8ff3c] px-5 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
