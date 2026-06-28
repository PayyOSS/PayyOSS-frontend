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
  setMerchantWallet: (merchantWallet: MerchantWalletDto) => void;
  updateMerchantWallet: (data: Partial<MerchantWalletDto>) => void;
  resetMerchantWallet: () => void;
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

export const useMerchantWalletStore = create<MerchantWalletStore>()(
  persist(
    (set) => ({
      merchantWallet: initialMerchantWalletState,

      setMerchantWallet: (merchantWallet) => set({ merchantWallet }),

      updateMerchantWallet: (data) =>
        set((state) => ({
          merchantWallet: {
            ...state.merchantWallet,
            ...data,
          },
        })),

      resetMerchantWallet: () =>
        set({ merchantWallet: initialMerchantWalletState }),
    }),
    {
      name: "merchant-wallet-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ merchantWallet: state.merchantWallet }),
    }
  )
);