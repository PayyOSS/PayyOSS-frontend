"use client";

import {
  ShieldCheck,
  Zap,
  PieChart,
  FileText,
  Plus,
  CheckCheck,
} from "lucide-react";

const asset = {
  chainId: 1,
  assetType: "ERC-20",
  tokenAddress: "0xA0b86991c6218b36c1d19D4a2...",
  tokenName: "USD Coin",
  tokenSymbol: "USDC",
  tokenDecimals: 6,
  status: "Active",
  isVerified: true,
  riskLevel: "Low",
};

export default function AssetsPage() {
  return (
    <div className="flex h-screen flex-col bg-[#0B0D0F] text-white">
      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Assets</h1>

            <p className="mt-2 text-sm text-[#889098]">
              Manage and monitor your supported digital assets.
            </p>
          </div>

          <button className="flex h-11 items-center gap-2 rounded-2xl text-[#B8FF3C] px-5 text-sm font-medium border border-[#B8FF3C] cursor-pointer transition hover:bg-[#B8FF3C]/10 active:scale-95">
            <Plus size={18} />
            Add Asset
          </button>
        </div>

        {/* Asset Table */}
        <div className="overflow-hidden rounded-[28px] border border-white/5 bg-[#14171C]/50 backdrop-blur-xl">
          {/* Table Header */}
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

          {/* Asset Row */}
          <div className="grid grid-cols-[70px_100px_2fr_130px_100px_90px_110px_110px_90px] items-center gap-4 px-6 py-5 text-sm">
            <span>{asset.chainId}</span>

            <div>
              <span className="rounded-full bg-[#B8FF3C]/10 px-3 py-1 text-xs font-medium text-[#B8FF3C]">
                {asset.assetType}
              </span>
            </div>

            <span className="truncate" title={asset.tokenAddress}>
              {asset.tokenAddress}
            </span>

            <span>{asset.tokenName}</span>

            <span>{asset.tokenSymbol}</span>

            <span>{asset.tokenDecimals}</span>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#B8FF3C]/10 px-3 py-1 text-xs text-[#B8FF3C]">
                <span className="h-2 w-2 rounded-full bg-[#B8FF3C]" />
                {asset.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#B8FF3C]">
              <CheckCheck size={15} />
              <span className="text-xs">
                {asset.isVerified ? "Verified" : "Unverified"}
              </span>
            </div>

            <div>
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  asset.riskLevel === "Low"
                    ? "bg-[#B8FF3C]/10 text-[#B8FF3C]"
                    : asset.riskLevel === "Medium"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
                }`}
              >
                {asset.riskLevel}
              </span>
            </div>
          </div>

          {/* Table Footer */}
          <div className="border-t border-white/5 px-6 py-4 text-sm text-[#889098]">
            Showing 1 of 1 asset
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-4 gap-5">
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
      <footer className="flex h-12 items-center justify-between border-t border-white/5 px-8 text-xs text-[#889098]">
        <p>© 2025 PayyOSS. All rights reserved.</p>

        <div className="flex items-center gap-8">
          <button className="transition hover:text-white">Docs</button>

          <button className="transition hover:text-white">Support</button>

          <button className="transition hover:text-white">Terms</button>

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
    <div className="flex h-[165px] flex-col rounded-[24px] border border-white/5 bg-[#14171C]/50 p-6 backdrop-blur-xl">
      <div className="text-[#B8FF3C]">{icon}</div>

      <h3 className="mt-5 text-base font-medium">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#889098]">{description}</p>
    </div>
  );
}
