import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export enum ApiEnvironment {
  TEST = "TEST",
  LIVE = "LIVE",
}

export enum MerchantStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DISABLED = "DISABLED",
}

export enum BusinessType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
  STARTUP = "STARTUP",
  NON_PROFIT = "NON_PROFIT",
}

export interface CreateMerchantDto {
  id?: string;
  name?: string;
  imageUrl?: string;
  email?: string;
  companyUrl?: string;
  createdAt?: string | null;
  environment?: ApiEnvironment;
  status?: MerchantStatus;
  businessType?: BusinessType;
}

interface MerchantStore {
  merchant: CreateMerchantDto;
  setMerchant: (merchant: CreateMerchantDto) => void;
  updateMerchant: (data: Partial<CreateMerchantDto>) => void;
  resetMerchant: () => void;
}

const initialMerchantState: CreateMerchantDto = {
  id: "",
  name: "",
  imageUrl: "",
  email: "",
  companyUrl: "",
  createdAt: null,
  environment: ApiEnvironment.TEST,
  status: MerchantStatus.ACTIVE,
  businessType: BusinessType.INDIVIDUAL,
};

export const useMerchantStore = create<MerchantStore>()(
  persist(
    (set) => ({
      merchant: initialMerchantState,

      setMerchant: (merchant) => set({ merchant }),

      updateMerchant: (data) =>
        set((state) => ({
          merchant: {
            ...state.merchant,
            ...data,
          },
        })),

      resetMerchant: () => set({ merchant: initialMerchantState }),
    }),
    {
      name: "merchant-storage",          // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ merchant: state.merchant }), // only persist merchant, not actions
    }
  )
);
