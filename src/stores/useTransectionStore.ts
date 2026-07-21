import { create } from "zustand";

export enum ApiEnvironment {
  TEST = "TEST",
  LIVE = "LIVE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  CONFIRMING = "CONFIRMING",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
  UNDERPAID = "UNDERPAID",
  OVERPAID = "OVERPAID",
  REFUNDED = "REFUNDED",
}

export enum AssetType {
  NATIVE = "NATIVE",
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export interface TransectionChainDto {
  name: string;
  nativeSymbol: string;
}

export interface TransectionPaymentIntentDto {
  amount: string;
  assetType: AssetType;
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string | null;
  tokenDecimals: number;
}

export interface TransectionDto {
  id: string;
  paymentIntentId: string | null;
  orderId: string | null;
  environment: ApiEnvironment;
  chainId: number;
  merchantWallet: string;
  payerWallet: string | null;
  txHash: string | null;
  status: PaymentStatus;
  confirmedAt: string | null;
  createdAt: string;
  updatedAt: string;
  chain: TransectionChainDto;
  paymentIntent: TransectionPaymentIntentDto | null;
}

export interface TransectionSummaryDto {
  successfulPaymentCount: number;
  failedPaymentCount: number;
  totalPaymentCount: number;
  totalPaymentValue: string | number;
}

export interface RecentTransectionsResponseDto {
  success: boolean;
  successfulTransactions: TransectionDto[];
  failedTransactions: TransectionDto[];
  summary: TransectionSummaryDto;
}

interface TransectionStore extends RecentTransectionsResponseDto {
  setTransections: (data: RecentTransectionsResponseDto) => void;
  resetTransections: () => void;
}

const initialTransectionState: RecentTransectionsResponseDto = {
  success: false,
  successfulTransactions: [],
  failedTransactions: [],
  summary: {
    successfulPaymentCount: 0,
    failedPaymentCount: 0,
    totalPaymentCount: 0,
    totalPaymentValue: 0,
  },
};

export const useTransectionStore = create<TransectionStore>()((set) => ({
  ...initialTransectionState,

  setTransections: (data) => set(data),

  resetTransections: () => set(initialTransectionState),
}));
