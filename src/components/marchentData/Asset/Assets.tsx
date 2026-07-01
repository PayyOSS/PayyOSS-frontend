"use client";

import { useEffect, useState } from "react";
import { useMerchantAssetStore } from "@/stores/useMerchantAssetStore";
import { useMerchantStore } from "@/stores/useMerchantStore";
import api from "@/config/axios";
import {
  ShieldCheck,
  Zap,
  PieChart,
  FileText,
  Plus,
  CheckCheck,
  Coins,
  Pencil,
} from "lucide-react";
import AssetForm from "./Create&UpdateAsset";
import toast from "react-hot-toast";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";
import { useRouter } from "next/navigation";

export default function AssetsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { merchantWallet } = useMerchantWalletStore();
  const router = useRouter();
  const hasWallet = !!merchantWallet.walletAddress;

  const { merchantAsset, setMerchantAsset, isExpired } =
    useMerchantAssetStore();
  const { merchant } = useMerchantStore();
  const hasAsset = !!merchantAsset.id && !isExpired();

  useEffect(() => {
    if (!merchant.id) return;
    if (hasAsset) return; // skip if still valid in store

    const fetchAsset = async () => {
      try {
        const { data } = await api.get(`/asset/get/${merchant.id}`);

        if (!data || !data.assets || data.assets.length === 0) {
          setMerchantAsset({
            id: "",
            chainId: 0,
            tokenAddress: "",
            tokenName: "",
            tokenSymbol: "",
            tokenDecimals: 0,
            settlementWalletId: "",
            isVerified: false,
          });
          return;
        }

        if (data.assets && data.assets.length > 0) {
          const asset = data.assets[0];
          setMerchantAsset({
            id: asset.id,
            chainId: asset.chainId,
            assetType: asset.assetType,
            tokenAddress: asset.tokenAddress,
            tokenName: asset.tokenName,
            tokenSymbol: asset.tokenSymbol,
            tokenDecimals: asset.tokenDecimals,
            settlementWalletId: asset.settlementWalletId,
            status: asset.status,
            isVerified: asset.isVerified,
            riskLevel: asset.riskLevel,
          });
        }
      } catch (err) {
        console.error("Failed to fetch asset:", err);
      }
    };

    fetchAsset();
  }, [merchant.id, hasAsset]);

  if (isFormOpen) {
    return (
      <AssetForm onCloseAction={() => setIsFormOpen(false)} isEdit={hasAsset} />
    );
  }

  return (
    <div className="flex min-h-screen flex-col text-white">
      <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Assets
            </h1>

            <p className="mt-2 text-sm text-[#889098]">
              Manage and monitor your supported digital assets.
            </p>
          </div>

          <button
            onClick={() => {
              if (hasWallet) {
                setIsFormOpen(true);
              } else {
                router.push(
                  `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/wallet`,
                );
                toast(
                  "Before creating an asset, first create a wallet",
                  {
                    duration: 6000,
                  },
                );
              }
            }}
            className="flex h-11 w-full items-center cursor-pointer justify-center gap-2 rounded-2xl border border-[#B8FF3C] px-5 text-sm font-medium text-[#B8FF3C] transition hover:bg-[#B8FF3C]/10 active:scale-95 sm:w-auto"
          >
            {hasAsset ? <Pencil size={18} /> : <Plus size={18} />}
            {hasAsset ? "Edit Asset" : "Add Asset"}
          </button>
        </div>

        {/* Empty State */}
        {!hasAsset ? (
          <div className="flex min-h-65 flex-col items-center justify-center rounded-[28px] border border-dashed border-[#B8FF3C]/20 bg-[#14171C]/50 px-6 py-10 text-center">
            <div className="rounded-2xl bg-[#B8FF3C]/10 p-4 text-[#B8FF3C]">
              <Coins size={40} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
              No assets created yet
            </h2>

            <p className="mt-3 max-w-md text-center text-sm leading-6 text-[#889098]">
              Create your first asset to start accepting crypto payments through
              PayyOSS.
            </p>

            <button
              onClick={() => {
                if (hasWallet) {
                  setIsFormOpen(true);
                } else {
                  router.push(
                    `/${merchant?.id}/${merchant?.environment?.toLowerCase()}/wallet`,
                  );
                  toast(
                    "Before creating an asset, first create a wallet",
                    {
                      duration: 6000,
                    },
                  );
                }
              }}
              className="mt-6 flex h-11 items-center gap-2 cursor-pointer rounded-2xl bg-[#B8FF3C] px-5 text-sm font-medium text-black transition hover:brightness-110 active:scale-95"
            >
              <Plus size={18} />
              Add Asset
            </button>
          </div>
        ) : (
          <>
            {/* Asset Table */}
            {/* Asset Table — desktop */}
            <div className="hidden overflow-x-auto rounded-[28px] border border-white/5 bg-[#14171C]/50 backdrop-blur-xl lg:block">
              <div className="min-w-275">
                <div className="grid grid-cols-[70px_100px_2fr_130px_100px_90px_110px_110px_90px] gap-4 border-b border-white/5 px-6 py-4 text-[11px] uppercase tracking-wide text-[#889098]">
                  <span>Chain ID</span>
                  <span>Asset Type</span>
                  <span>Token Address</span>
                  <span>Token Name</span>
                  <span>Token Symbol</span>
                  <span>Decimals</span>
                  <span>Status</span>
                  <span>Verified</span>
                  <span>Risk Level</span>
                </div>

                <div className="grid grid-cols-[70px_100px_2fr_130px_100px_90px_110px_110px_90px] items-center gap-4 px-6 py-5 text-sm">
                  <span>{merchantAsset.chainId}</span>
                  <div>
                    <span className="rounded-full bg-[#B8FF3C]/10 px-3 py-1 text-xs font-medium text-[#B8FF3C]">
                      {merchantAsset.assetType}
                    </span>
                  </div>
                  <span
                    className="truncate font-mono text-xs"
                    title={merchantAsset.tokenAddress}
                  >
                    {merchantAsset.tokenAddress}
                  </span>
                  <span>{merchantAsset.tokenName}</span>
                  <span>{merchantAsset.tokenSymbol}</span>
                  <span>{merchantAsset.tokenDecimals}</span>
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#B8FF3C]/10 px-3 py-1 text-xs text-[#B8FF3C]">
                      <span className="h-2 w-2 rounded-full bg-[#B8FF3C]" />
                      {merchantAsset.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#B8FF3C]">
                    <CheckCheck size={15} />
                    <span className="text-xs">
                      {merchantAsset.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        merchantAsset.riskLevel === "LOW"
                          ? "bg-[#B8FF3C]/10 text-[#B8FF3C]"
                          : merchantAsset.riskLevel === "MEDIUM"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {merchantAsset.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Card — mobile & tablet */}
            <div className="lg:hidden rounded-[28px] border border-white/5 bg-[#14171C]/50 backdrop-blur-xl overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#B8FF3C]" />
                  <span className="text-xs font-medium uppercase tracking-widest text-[#889098]">
                    Asset Details
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#B8FF3C]">
                  <CheckCheck size={13} />
                  <span className="text-xs font-medium">
                    {merchantAsset.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Token Identity */}
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-[11px] text-[#889098]">Token Name</p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      {merchantAsset.tokenName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-[#889098]">Symbol</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {merchantAsset.tokenSymbol}
                    </p>
                  </div>
                </div>

                {/* Asset Type + Chain */}
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-[11px] text-[#889098]">Asset Type</p>
                    <span className="mt-1.5 inline-block rounded-full bg-[#B8FF3C]/10 px-3 py-1 text-xs font-medium text-[#B8FF3C]">
                      {merchantAsset.assetType}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-[#889098]">Chain ID</p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      {merchantAsset.chainId}
                    </p>
                  </div>
                </div>

                {/* Token Address */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                  <p className="text-[11px] text-[#889098]">Token Address</p>
                  <p className="mt-1 break-all font-mono text-xs leading-5 text-white/80">
                    {merchantAsset.tokenAddress}
                  </p>
                </div>

                {/* Decimals + Status + Risk */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3 text-center">
                    <p className="text-[11px] text-[#889098]">Decimals</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {merchantAsset.tokenDecimals}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3 text-center">
                    <p className="text-[11px] text-[#889098]">Status</p>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#B8FF3C]/10 px-2 py-0.5 text-[11px] text-[#B8FF3C]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF3C]" />
                      {merchantAsset.status}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3 text-center">
                    <p className="text-[11px] text-[#889098]">Risk</p>
                    <span
                      className={`mt-1 rounded-full px-2 py-0.5 text-[11px] ${
                        merchantAsset.riskLevel === "LOW"
                          ? "bg-[#B8FF3C]/10 text-[#B8FF3C]"
                          : merchantAsset.riskLevel === "MEDIUM"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {merchantAsset.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-white/5 px-5 py-3 text-xs text-[#889098]">
                Showing 1 of 1 asset
              </div>
            </div>
          </>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            icon={<ShieldCheck size={30} />}
            title="Secure & Verified"
            description="All assets are verified and monitored for security."
          />

          <FeatureCard
            icon={<Zap size={30} />}
            title="Real-time Monitoring"
            description="Asset status and risk levels are updated in real-time."
          />

          <FeatureCard
            icon={<PieChart size={30} />}
            title="Risk Management"
            description="We analyze risk levels to help make safer decisions."
          />

          <FeatureCard
            icon={<FileText size={30} />}
            title="Audit Ready"
            description="Asset configurations are logged and audit-friendly."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 border-t border-white/5 px-4 py-5 text-center text-xs text-[#889098] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left">
        <p>© 2025 PayyOSS. All rights reserved.</p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
          <button className="transition hover:text-white">Docs</button>
          <button className="transition hover:text-white">Privacy</button>
        </div>
      </footer>
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
    <div className="flex min-h-40 flex-col rounded-3xl border border-white/5 bg-[#14171C]/50 p-5 backdrop-blur-xl sm:min-h-42.5 sm:p-6">
      <div className="text-[#B8FF3C]">{icon}</div>

      <h3 className="mt-4 text-base font-medium sm:mt-5 sm:text-lg">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-[#889098] sm:mt-3">
        {description}
      </p>
    </div>
  );
}
