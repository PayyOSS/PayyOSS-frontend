import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export enum VerificationStatus {
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export interface MerchantWalletDto {
  id?: string;
  merchantId?: string;
  chainId?: number;
  walletAddress?: string;
  label?: string;
  isDefault?: boolean;
  verificationStatus?: VerificationStatus;
}

interface MerchantWalletStore {
  merchantWallet: MerchantWalletDto;
  expiresAt: number | null;
  setMerchantWallet: (merchantWallet: MerchantWalletDto) => void;
  updateMerchantWallet: (data: Partial<MerchantWalletDto>) => void;
  resetMerchantWallet: () => void;
  isExpired: () => boolean;
}

const initialMerchantWalletState: MerchantWalletDto = {
  id: "",
  merchantId: "",
  chainId: undefined,
  walletAddress: "",
  label: "",
  isDefault: false,
  verificationStatus: VerificationStatus.PENDING,
};

const TTL_MS = 10 * 60 * 1000; // 10 minutes

export const useMerchantWalletStore = create<MerchantWalletStore>()(
  persist(
    (set, get) => ({
      merchantWallet: initialMerchantWalletState,
      expiresAt: null,

      setMerchantWallet: (merchantWallet) =>
        set({ merchantWallet, expiresAt: Date.now() + TTL_MS }),

      updateMerchantWallet: (data) =>
        set((state) => ({
          merchantWallet: {
            ...state.merchantWallet,
            ...data,
          },
          expiresAt: Date.now() + TTL_MS, // reset TTL on update too
        })),

      resetMerchantWallet: () =>
        set({ merchantWallet: initialMerchantWalletState, expiresAt: null }),

      isExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() > expiresAt;
      },
    }),
    {
      name: "merchant-wallet-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        merchantWallet: state.merchantWallet,
        expiresAt: state.expiresAt,
      }),
    }
  )
);