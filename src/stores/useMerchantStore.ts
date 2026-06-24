import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export enum ApiEnvironment {
  TEST = "TEST",
  LIVEu = "LIVE",
}

export enum MerchantStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum BusinessType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
}

export interface CreateMerchantDto {
  id?: string;
  name?: string;
  imageUrl?: string;
  email?: string;
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
      partialState: (state) => ({ merchant: state.merchant }), // only persist merchant, not actions
    }
  )
);