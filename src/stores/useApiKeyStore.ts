import { create } from "zustand";

export enum ApiKeyEnvironment {
  TEST = "TEST",
  LIVE = "LIVE",
}

export interface ApiKeyDto {
  id?: string;
  keyPrefix?: string;
  environment?: ApiKeyEnvironment;
  scopes?: string[];
  lastUsedAt?: string | null;
  revokedAt?: string | null;
  createdAt?: string | null;
}

interface ApiKeyStore {
  apiKey: ApiKeyDto;
  setApiKey: (apiKey: ApiKeyDto) => void;
  updateApiKey: (data: Partial<ApiKeyDto>) => void;
  resetApiKey: () => void;
}

const initialApiKeyState: ApiKeyDto = {
  id: "",
  keyPrefix: "",
  environment: ApiKeyEnvironment.TEST,
  scopes: [],
  lastUsedAt: null,
  revokedAt: null,
  createdAt: null,
};

export const useApiKeyStore = create<ApiKeyStore>()((set) => ({
  apiKey: initialApiKeyState,

  setApiKey: (apiKey) => set({ apiKey }),

  updateApiKey: (data) =>
    set((state) => ({
      apiKey: {
        ...state.apiKey,
        ...data,
      },
    })),

  resetApiKey: () => set({ apiKey: initialApiKeyState }),
}));
