# Merchant Dashboard Design Proposal

## Goal

Design a dashboard page for merchants that gives a quick operational view of payment health, revenue movement, chain/token performance, wallet readiness, and integration reliability.

This document is only the design proposal. Dashboard implementation should start after approval.

## Existing Project Theme

Keep the current Payyoss merchant theme unchanged.

- Base app background: black and near-black surfaces (`#030403`, `#05080A`, `#111111`, `bg-black`).
- Primary accent: neon lime (`#b8ff3c`) with related lime gradients (`#8ecd20`, `#c8ff62e3`, `#91d320`, `#86bd06`).
- Text: white for primary content, zinc/gray for secondary content (`text-white`, `text-zinc-300`, `text-zinc-500`, `text-gray-500`).
- Borders: subtle translucent white (`border-white/10`) and lime-tinted active states (`border-[#b8ff3c]/20`).
- Cards/panels: dark translucent panels such as `bg-[#05080A]/70`, `bg-white/5`, with soft borders and optional backdrop blur.
- Buttons: lime filled primary buttons with black text, or dark glass buttons with lime hover states.
- Icons: use `lucide-react`, matching the sidebar and wallet page.
- Shape language: rounded panels and controls are already common (`rounded-xl`, `rounded-2xl`, `rounded-3xl`), so the dashboard should continue that.
- Layout shell: keep the existing merchant layout with black top nav, black sidebar, and `bg-[#111111]` content area.

## Database Schema Signals

The backend Prisma schema supports analytics from these core models:

- `Merchant`: merchant identity, status, environment, business type.
- `PaymentIntent`: requested payment amount, chain, asset, token, status, expiration, metadata.
- `Payment`: actual payment status, chain, payer wallet, merchant wallet, transaction hash, confirmation timestamp.
- `PaymentEvent`: detected transfers, confirmations, status changes, refunds, webhook-triggered events.
- `PaymentLink`: active/reusable payment links and configured payment amounts.
- `MerchantWallet`: wallet address, chain, default wallet flag, verification status.
- `MerchantAsset`: accepted assets/tokens, verification, risk level, active/inactive/archive status.
- `WebhookEndpoint` and `WebhookDelivery`: endpoint health, delivery status, retry state, attempt count.
- `SettlementReport`: gross volume, fees, refunds, net volume, settlement status by period, chain, asset.

## Recommended Dashboard Structure

### 1. Header Row

Show merchant context and time controls.

- Merchant name, environment badge (`TEST` or `LIVE`), merchant status.
- Date range selector: `24h`, `7d`, `30d`, `90d`.
- Optional chain filter and token filter.
- Primary action buttons: create payment link, view transactions.

### 2. KPI Summary Cards

Top row should answer: "How is my business doing right now?"

- Gross volume: sum of successful/confirmed payments or settlement gross volume.
- Net volume: settlement net volume after fees/refunds where available.
- Successful payments: count of `Payment.status = CONFIRMED`.
- Pending payments: count of `PENDING` + `CONFIRMING`.
- Failed/issue payments: count of `FAILED`, `UNDERPAID`, `OVERPAID`.
- Conversion rate: successful payment intents divided by all created payment intents.

Suggested visual style:

- Four to six compact cards in a responsive grid.
- Dark card background, white headline values, zinc labels, lime icon chips.
- Small comparison text such as `+12.4% vs previous 7d` once backend supports previous-period aggregation.

### 3. Payment Volume Trend

Show a time-series chart for merchant volume.

- X-axis: day/hour bucket depending on selected range.
- Y-axis: volume.
- Series options: gross volume, net volume, successful payment count.
- Keep chart colors restrained: lime primary line, white/gray grid, dark background.

Implementation note:

- The project does not currently include a chart library.
- First version can use a simple CSS/SVG line or bar chart component.
- If approved later, add a chart library such as `recharts` for better tooltips and responsive charts.

### 4. Payment Status Breakdown

Show operational payment state distribution.

- Confirmed
- Pending
- Confirming
- Failed
- Underpaid
- Overpaid
- Refunded

Recommended UI:

- Horizontal stacked bar using lime for confirmed, muted gray for neutral states, red/amber only for issue states.
- Compact legend with counts and percentages.

### 5. Chain and Asset Performance

Merchants accepting multiple chains/tokens need to know what is being used.

- Top chains by payment count and volume.
- Top tokens/assets by payment count and volume.
- Active assets count from `MerchantAsset`.
- High-risk or unverified assets warning from `riskLevel` and `isVerified`.

Recommended UI:

- Two side-by-side panels on desktop.
- Ranked rows with chain/token symbol, count, volume, and percentage bar.
- On mobile, stack vertically.

### 6. Recent Transactions Preview

Transactions already have their own dedicated page, so the dashboard should only include a short preview and route merchants to the transaction page for full details.

Fields:

- Status
- Amount/token if available from related `PaymentIntent`
- Chain
- Payer wallet shortened
- Transaction hash shortened
- Created/confirmed time

Recommended UI:

- Show latest 5 to 8 payments.
- Use status pills matching the theme.
- Add a "View all" action to the existing transaction route.
- Do not duplicate full transaction filters, pagination, or detailed transaction management here.

### 7. Wallet and Asset Readiness

This helps merchants see setup problems before they lose payments.

- Default wallet status.
- Wallet verification status.
- Number of active wallets.
- Number of active assets.
- Unverified assets or high-risk assets.

Recommended UI:

- A compact checklist panel.
- Lime check states for ready items.
- Muted amber/red states only for action-required items.

### 8. Webhook Health

For a payment gateway, webhook health belongs on the merchant dashboard.

- Enabled endpoints count.
- Recent delivery success/failure counts.
- Deliveries waiting for retry from `nextRetryAt`.
- Average attempt count or failed delivery count.

Recommended UI:

- Small "Integration health" panel.
- Show `Healthy`, `Needs attention`, or `No endpoint configured`.

### 9. Settlement Snapshot

Use `SettlementReport` when available.

- Current open settlement period.
- Gross volume, fees, refunds, net volume.
- Settlement status: `OPEN`, `FINALIZED`, `PAID`.
- Last paid/finalized settlement.

Recommended UI:

- Summary panel below the volume chart.
- If no settlement data exists, show a quiet empty state.

## Backend Analytics API Suggestion

Add a backend analytics module after design approval. Suggested endpoint:

`GET /merchant/:merchantId/analytics?range=7d&chainId=&tokenAddress=`

Suggested response shape:

```ts
type MerchantDashboardAnalytics = {
  merchant: {
    id: string;
    name: string | null;
    environment: "TEST" | "LIVE";
    status: "PENDING" | "ACTIVE" | "SUSPENDED" | "DISABLED";
  };
  summary: {
    grossVolume: string;
    netVolume: string;
    successfulPayments: number;
    pendingPayments: number;
    issuePayments: number;
    conversionRate: number;
  };
  volumeTrend: Array<{
    bucket: string;
    grossVolume: string;
    netVolume: string;
    paymentCount: number;
  }>;
  statusBreakdown: Array<{
    status: string;
    count: number;
  }>;
  chainPerformance: Array<{
    chainId: number;
    chainName: string;
    volume: string;
    paymentCount: number;
  }>;
  assetPerformance: Array<{
    tokenSymbol: string;
    tokenAddress: string | null;
    assetType: string;
    volume: string;
    paymentCount: number;
  }>;
  recentPayments: Array<{
    id: string;
    status: string;
    chainId: number;
    tokenSymbol?: string;
    txHash: string | null;
    payerWallet: string;
    createdAt: string;
    confirmedAt: string | null;
  }>;
  readiness: {
    activeWallets: number;
    verifiedWallets: number;
    activeAssets: number;
    unverifiedAssets: number;
    highRiskAssets: number;
  };
  webhookHealth: {
    enabledEndpoints: number;
    failedDeliveries: number;
    retryingDeliveries: number;
    recentSuccessRate: number;
  };
  settlement: {
    currentStatus: string | null;
    grossVolume: string;
    fees: string;
    refunds: string;
    netVolume: string;
  } | null;
};
```

## Frontend Component Plan

After approval, build the dashboard in `src/components/marchentData/Dashboard.tsx`.

Suggested internal sections:

- `DashboardHeader`
- `MetricCard`
- `VolumeTrend`
- `StatusBreakdown`
- `ChainAssetPerformance`
- `RecentPaymentsPreview`
- `ReadinessPanel`
- `WebhookHealth`
- `SettlementSnapshot`

Use mock data first if the backend endpoint is not ready, but keep the component data shape close to the proposed API response.

## Empty and Loading States

For a new merchant, the dashboard should still feel useful.

- No payments yet: show zeroed KPI cards and a "Create payment link" action.
- No wallet: show wallet readiness warning and link to wallet page.
- No assets: show asset readiness warning and link to assets page.
- No webhooks: show integration health as not configured, not as an error.
- Test mode: show an environment badge so merchants do not confuse test analytics with live revenue.

## Approval Questions

Before implementation, confirm these choices:

1. Should the first dashboard version use mock data in the frontend, or should we build the backend analytics endpoint first?
2. Should we add a chart library such as `recharts`, or keep charts lightweight with custom CSS/SVG?
3. Should the dashboard prioritize payment/revenue analytics, integration health, or merchant setup readiness in the first viewport?
