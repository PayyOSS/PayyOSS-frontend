// stores/useMerchantStore.ts
import { create } from "zustand";

export enum BusinessType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
}

export interface CreateMerchantDto {
  name?: string;
  imageUrl?: string;
  email?: string;
  businessType?: BusinessType;
}

interface MerchantStore {
  merchant: CreateMerchantDto;

  setMerchant: (merchant: CreateMerchantDto) => void;

  updateMerchant: (
    data: Partial<CreateMerchantDto>
  ) => void;

  resetMerchant: () => void;
}

const initialMerchantState: CreateMerchantDto = {
  name: "",
  imageUrl: "",
  email: "",
  businessType: BusinessType.INDIVIDUAL,
};

export const useMerchantStore = create<MerchantStore>((set) => ({
  merchant: initialMerchantState,

  setMerchant: (merchant) =>
    set({ merchant }),

  updateMerchant: (data) =>
    set((state) => ({
      merchant: {
        ...state.merchant,
        ...data,
      },
    })),

  resetMerchant: () =>
    set({
      merchant: initialMerchantState,
    }),
}));