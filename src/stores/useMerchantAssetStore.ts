import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export enum AssetType {
  NATIVE = "NATIVE",
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export enum AssetStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface MerchantAssetDto {
  id?: string;
  chainId?: number;
  assetType?: AssetType;
  tokenAddress?: string;
  tokenName?: string;
  tokenSymbol?: string;
  tokenDecimals?: number;
  settlementWalletId?: string;
  status?: AssetStatus;
  isVerified?: boolean;
  riskLevel?: RiskLevel;
}

interface MerchantAssetStore {
  merchantAsset: MerchantAssetDto;
  expiresAt: number | null;
  setMerchantAsset: (merchantAsset: MerchantAssetDto) => void;
  updateMerchantAsset: (data: Partial<MerchantAssetDto>) => void;
  resetMerchantAsset: () => void;
  isExpired: () => boolean;
}

const initialMerchantAssetState: MerchantAssetDto = {
  id: "",
  chainId: undefined,
  assetType: undefined,
  tokenAddress: "",
  tokenName: "",
  tokenSymbol: "",
  tokenDecimals: undefined,
  settlementWalletId: "",
  status: AssetStatus.ACTIVE,
  isVerified: false,
  riskLevel: RiskLevel.LOW,
};

const TTL_MS = 10 * 60 * 1000; // 10 minutes

export const useMerchantAssetStore = create<MerchantAssetStore>()(
  persist(
    (set, get) => ({
      merchantAsset: initialMerchantAssetState,
      expiresAt: null,

      setMerchantAsset: (merchantAsset) =>
        set({ merchantAsset, expiresAt: Date.now() + TTL_MS }),

      updateMerchantAsset: (data) =>
        set((state) => ({
          merchantAsset: {
            ...state.merchantAsset,
            ...data,
          },
          expiresAt: Date.now() + TTL_MS,
        })),

      resetMerchantAsset: () =>
        set({ merchantAsset: initialMerchantAssetState, expiresAt: null }),

      isExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() > expiresAt;
      },
    }),
    {
      name: "merchant-asset-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        merchantAsset: state.merchantAsset,
        expiresAt: state.expiresAt,
      }),
    }
  )
);