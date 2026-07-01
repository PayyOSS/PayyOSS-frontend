"use client";

import { useEffect, useState } from "react";
import { fetchTokenByChainAndSymbol } from "@/lib/fetchTokenByChainAndSymbol";
import { useMerchantStore } from "@/stores/useMerchantStore";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";
import { useMerchantAssetStore } from "@/stores/useMerchantAssetStore";
import api from "@/config/axios";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

export const CHAINS = [
  {
    id: 11142220,
    name: "Celo Sepolia",
  },
  {
    id: 80002,
    name: "Polygon Amoy",
  },
];

const TOKENS = ["USDC", "USDT"];

type FormState = {
  chainId: number | "";
  token: string;
  assetType: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number | "";
};

type AssetFormProps = {
  onCloseAction: () => void;
  isEdit: boolean;
};

export default function AssetForm({ onCloseAction, isEdit }: AssetFormProps) {
  const { merchant } = useMerchantStore();
  const { merchantWallet } = useMerchantWalletStore();
  const { merchantAsset, setMerchantAsset } = useMerchantAssetStore();
  const [fetchloading, setFetchLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    chainId: "",
    token: "",
    assetType: "",
    tokenAddress: "",
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTokenData = async () => {
      if (!form.chainId || !form.token) return;

      try {
        setLoading(true);
        const token = await fetchTokenByChainAndSymbol(
          form.chainId,
          form.token,
        );

        console.log(
          "chainId:",
          form.chainId,
          "symbol:",
          form.token,
          "result:",
          token,
        );

        if (!token) {
          setForm((prev) => ({
            ...prev,
            assetType: "",
            tokenAddress: "",
            tokenName: "",
            tokenSymbol: "",
            tokenDecimals: "",
          }));

          return;
        }

        setForm((prev) => ({
          ...prev,
          assetType: token.assetType,
          tokenAddress: token.tokenAddress,
          tokenName: token.tokenName,
          tokenSymbol: token.tokenSymbol,
          tokenDecimals: token.tokenDecimals,
        }));
      } finally {
        setLoading(false);
      }
    };

    getTokenData();
  }, [form.chainId, form.token]);

  const handleSubmit = async () => {
    if (
      !merchant.id ||
      !merchantWallet.id ||
      !form.chainId ||
      !form.tokenSymbol
    ) {
      toast.error("Missing required fields. Please check your input.");
      return;
    }

    try {
      setFetchLoading(true);

      const basePayload = {
        chainId: form.chainId,
        assetType: form.assetType,
        tokenAddress: form.tokenAddress,
        tokenName: form.tokenName,
        tokenSymbol: form.tokenSymbol,
        tokenDecimals: Number(form.tokenDecimals),
        riskLevel: "LOW",
      };

      // If an asset already exists, update it; otherwise create a new one.
      // The update DTO does not accept merchantId / settlementWalletId.
      const { data } = merchantAsset.id
        ? await api.patch(`/asset/update/${merchantAsset.id}`, basePayload)
        : await api.post("/asset/create", {
            ...basePayload,
            merchantId: merchant.id,
            settlementWalletId: merchantWallet.id,
          });

      if (!data.asset || !data.asset.id) {
        console.error("Failed to save asset: Invalid response", data);
        return;
      }

      // Save to Zustand
      setMerchantAsset({
        id: data.asset.id,
        chainId: data.asset.chainId,
        assetType: data.asset.assetType,
        tokenAddress: data.asset.tokenAddress,
        tokenName: data.asset.tokenName,
        tokenSymbol: data.asset.tokenSymbol,
        tokenDecimals: data.asset.tokenDecimals,
        settlementWalletId: data.asset.settlementWalletId,
        status: data.asset.status,
        isVerified: data.asset.isVerified,
        riskLevel: data.asset.riskLevel,
      });

      onCloseAction();
    } catch (err) {
      console.error("Failed to save asset:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col px-6 py-5 text-white">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        {/* Header */}
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-[#B8FF3C]/80">
            {isEdit ? "Edit Asset" : "Add Asset"}
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Add a new digital asset to start accepting payments.
          </p>
        </div>

        {/* Card */}
        <div className="mt-5 flex flex-1 flex-col rounded-3xl border border-zinc-800 bg-black/40 p-6">
          {/* Form */}
          <div className="grid flex-1 gap-5 lg:grid-cols-3">
            {/* Chain */}
            <div>
              <label className="mb-2 block text-sm font-medium">Chain ID</label>

              <select
                value={form.chainId}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    chainId: Number(e.target.value),
                  }))
                }
                className="h-11 w-full rounded-2xl border border-zinc-800 bg-[#090909] px-4 outline-none"
              >
                <option value="">Select Chain</option>

                {CHAINS.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.id} - {chain.name}
                  </option>
                ))}
              </select>

              <p className="mt-1 text-xs text-zinc-500">
                Select the blockchain network.
              </p>
            </div>

            {/* Token */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Token Symbol
              </label>

              <select
                value={form.token}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    token: e.target.value,
                  }))
                }
                className="h-11 w-full rounded-2xl border border-zinc-800 bg-[#090909] px-4 outline-none"
              >
                <option value="">Select Token</option>

                {TOKENS.map((token) => (
                  <option key={token} value={token}>
                    {token}
                  </option>
                ))}
              </select>

              <p className="mt-1 text-xs text-zinc-500">Select the token.</p>
            </div>

            {/* Asset Type */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Asset Type
              </label>

              <input
                readOnly
                value={form.assetType}
                placeholder="ERC20 / Native"
                className="h-11 w-full rounded-2xl border border-zinc-800 bg-[#090909] px-4"
              />

              <p className="mt-1 text-xs text-zinc-500">Token standard.</p>
            </div>

            {/* Address */}
            <div className="lg:col-span-3">
              <label className="mb-2 block text-sm font-medium">
                Token Address
              </label>

              <input
                readOnly
                value={loading ? "Loading..." : form.tokenAddress}
                className="h-11 w-full rounded-2xl border border-zinc-800 bg-[#090909] px-4 font-mono text-sm"
              />

              <p className="mt-1 text-xs text-zinc-500">
                Token contract address.
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Token Name
              </label>

              <input
                readOnly
                value={form.tokenName}
                className="h-11 w-full rounded-2xl border border-zinc-800 bg-[#090909] px-4"
              />

              <p className="mt-1 text-xs text-zinc-500">Full token name.</p>
            </div>

            {/* Symbol */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Token Symbol
              </label>

              <input
                readOnly
                value={form.tokenSymbol}
                className="h-11 w-full rounded-2xl border border-zinc-800 bg-[#090909] px-4"
              />

              <p className="mt-1 text-xs text-zinc-500">Token ticker symbol.</p>
            </div>

            {/* Decimals */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Token Decimals
              </label>

              <input
                readOnly
                value={form.tokenDecimals}
                className="h-11 w-full rounded-2xl border border-zinc-800 bg-[#090909] px-4"
              />

              <p className="mt-1 text-xs text-zinc-500">
                Number of decimal places.
              </p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 flex shrink-0 justify-end gap-4">
            <button
              onClick={onCloseAction}
              className="h-11 cursor-pointer rounded-2xl border border-zinc-700 px-7 transition hover:bg-zinc-900"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!form.tokenSymbol || fetchloading}
              className="flex h-11 min-w-32 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#B8FF3C] px-7 font-medium text-black transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {fetchloading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Update Asset"
              ) : (
                "Add Asset"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
