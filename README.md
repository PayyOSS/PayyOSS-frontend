# PayyOSS Crypto Gateway — Client

PayyOSS is a merchant-facing web application for a crypto payment gateway. It
contains the public marketing site, authentication flow, merchant onboarding,
documentation, and an authenticated dashboard for managing crypto-payment
infrastructure.

> This repository is the frontend only. It does **not** process payments,
> custody funds, or verify blockchain transactions. Those responsibilities
> belong to the PayyOSS backend and blockchain services.

## What the project provides

- Public landing page with product features, pricing, security information,
  FAQs, and developer-focused content
- Google and GitHub authentication through Better Auth
- Merchant workspace creation and profile management
- Separate test/live merchant environments
- Payment analytics and recent transaction history
- Settlement-wallet connection and management
- Accepted-asset configuration
- API-key creation and revocation
- Webhook creation, editing, and deletion
- Built-in API documentation
- Responsive, dark-themed dashboard

## Current blockchain support

The wallet client is currently configured for **Celo Sepolia Testnet**
(chain ID `11142220`) using an injected browser wallet. The product is
structured as a multi-chain payment gateway, but additional chains must be
added to `src/lib/wagmi.ts` before they can be selected by this client.

## Technology stack

- [Next.js](https://nextjs.org/) 15 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Axios for backend requests
- Better Auth and Better Auth UI
- Wagmi, Viem, and RainbowKit for wallet connections
- Zustand for client-side state
- TanStack Query for asynchronous state
- Recharts for dashboard charts
- Lucide React for icons
- React Hot Toast for notifications

## How the application works

1. A visitor lands on the public PayyOSS website.
2. The user signs in with Google or GitHub. Authentication is handled by the
   configured backend, and requests include credentials/cookies.
3. The user creates a merchant workspace.
4. PayyOSS redirects the user to a route shaped like
   `/{merchantId}/{mode}/dashboard`, where `mode` represents the merchant's
   environment (for example, `test` or `live`).
5. From the dashboard, the merchant can connect a settlement wallet, configure
   accepted assets, manage API keys and webhooks, and inspect payment activity.
6. The frontend sends all application operations to `NEXT_PUBLIC_API_URL`.

The authenticated dashboard is protected by `AuthGuard`. Axios is configured
with `withCredentials: true`, and merchant data is cached in Zustand stores.
Some persisted stores use a short time-to-live and refresh their data from the
backend after expiry.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/auth/sign-in` | Social sign-in |
| `/create_marchent` | Merchant onboarding |
| `/Documentation` | Developer documentation |
| `/Documentation/[...slug]` | Individual documentation pages |
| `/[marchentId]/[mode]/dashboard` | Analytics overview |
| `/[marchentId]/[mode]/transaction` | Transaction history |
| `/[marchentId]/[mode]/merchant` | Merchant profile management |
| `/[marchentId]/[mode]/wallet` | Settlement-wallet management |
| `/[marchentId]/[mode]/assets` | Accepted-asset management |
| `/[marchentId]/[mode]/api-key` | API-key management |
| `/[marchentId]/[mode]/webhook` | Webhook management |

The spellings `marchentId`, `create_marchent`, and `transection` are currently
part of the codebase and backend contract. Avoid renaming them without
coordinating a migration.

## Prerequisites

- Node.js `18.18+` (Node.js 20 LTS or newer is recommended)
- npm
- A running PayyOSS backend
- Google/GitHub OAuth configured on the backend
- A browser wallet for wallet-management features
- A WalletConnect project ID

## Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the PayyOSS backend and auth service |
| `CLIENT_URL` | Public origin of this frontend; commonly used by the backend/auth configuration |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID used by RainbowKit |

Variables prefixed with `NEXT_PUBLIC_` are included in the browser bundle.
Never place private keys, API secrets, or other server-only credentials in
them. Environment files are ignored by Git.

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The backend must be available at the URL configured in
`NEXT_PUBLIC_API_URL`. Because authentication uses cookies, the backend must
also allow the frontend origin and credentialed cross-origin requests when the
two services run on different origins.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |

Before submitting a change, run:

```bash
npm run typecheck
npm run build
```

## Project structure

```text
.
├── docs/                     # Architecture reference document
├── public/                   # Logos and static assets
├── src/
│   ├── app/                  # Next.js routes and layouts
│   │   ├── auth/             # Authentication pages
│   │   ├── Documentation/    # Public developer documentation
│   │   └── [marchentId]/     # Authenticated merchant dashboard routes
│   ├── components/
│   │   ├── common/           # Navigation, auth guard, and onboarding
│   │   ├── landingPage/      # Public website sections
│   │   └── marchentData/     # Dashboard feature components
│   ├── config/               # Shared Axios client
│   ├── hooks/                # Reusable React hooks
│   ├── lib/                  # Auth, Wagmi, and token helpers
│   └── stores/               # Zustand merchant/dashboard stores
├── SOURCE_OF_TRUTH.md        # Product boundaries and engineering rules
├── design.md                 # UI/design reference
└── package.json              # Dependencies and npm scripts
```

## Backend integration

The client expects backend endpoints for these resource groups:

- authentication and sessions
- merchants
- merchant wallets
- assets
- API keys
- webhooks
- transactions (spelled `transection` in the current API paths)
- payment analytics

The shared Axios client is defined in `src/config/axios.ts`. Keep backend
communication centralized through this client so credentials and the base URL
are applied consistently.

## Security boundaries

- Do not expose merchant API keys in logs or committed files.
- Never store wallet private keys or seed phrases in this application.
- Treat all `NEXT_PUBLIC_*` values as public.
- Keep authenticated API calls credentialed and validate backend responses.
- Wallet connection gives the app access to a public address and signing
  requests; it must never ask users to reveal recovery phrases.
- Payment verification must remain on trusted backend/blockchain
  infrastructure, not in browser code.

## Production

Create and run a production build:

```bash
npm run build
npm run start
```

For deployment, configure the production frontend URL, backend URL, OAuth
callback URLs, CORS policy, cookie domain, HTTPS, and WalletConnect project
settings together. Authentication cookies generally require secure production
settings and matching trusted origins.
