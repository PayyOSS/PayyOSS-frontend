import { create } from "zustand";

export interface WebHookDto {
  id: string;
  url: string;
  secretPrefix: string;
  secretHash: string;
  enabled: boolean;
  createdAt: string | null;
}

interface WebHookStore {
  webHook: WebHookDto;
  setWebHook: (webHook: WebHookDto) => void;
  updateWebHook: (data: Partial<WebHookDto>) => void;
  resetWebHook: () => void;
}

const initialWebHookState: WebHookDto = {
  id: "",
  url: "",
  secretPrefix: "",
  secretHash: "",
  enabled: true,
  createdAt: null,
};

export const useWebHookStore = create<WebHookStore>()((set) => ({
  webHook: initialWebHookState,

  setWebHook: (webHook) => set({ webHook }),

  updateWebHook: (data) =>
    set((state) => ({
      webHook: {
        ...state.webHook,
        ...data,
      },
    })),

  resetWebHook: () => set({ webHook: initialWebHookState }),
}));
