# SOURCE OF TRUTH

# Project Overview

PayyOSS Dashboard is the merchant portal and landing page for the PayyOSS crypto payment gateway.

The application allows merchants to:
- Create an account
- Connect wallets
- Create payment intents
- Manage API keys
- View transactions
- View analytics
- Manage settings

This repository DOES NOT process payments or verify blockchain transactions.

---

# Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form

---

# Architecture

- Pages should remain lightweight.
- Business logic belongs in services/hooks.
- API communication only through the backend.
- UI components must be reusable.
- Dashboard and Landing Page are separate modules.

---

# Dashboard Features

- Merchant authentication
- Wallet management
- Payment Intent management
- API Key management
- Transaction history
- Analytics
- Merchant profile

---

# Landing Page Features

- Pricing
- Features
- Documentation links
- Contact
- Authentication entry points

---

# Security Rules

- Never expose API keys.
- Never expose private keys.
- Never hardcode secrets.
- All authenticated requests require JWT.
- Validate every backend response.

---

# Coding Standards

- No `any` in TypeScript.
- Prefer reusable components.
- Use server actions/API routes where appropriate.
- Keep hooks reusable.
- Avoid duplicated logic.

---

# UI Standards

- Responsive on mobile and desktop.
- Loading states for async operations.
- Error states for failed requests.
- Consistent spacing and typography.
- Dark theme is the default.

---

# Performance

- Lazy load heavy components.
- Optimize images.
- Avoid unnecessary re-renders.
- Minimize bundle size.

---

# Acceptance Criteria

Every PR should ensure:

- No broken navigation.
- No TypeScript errors.
- No hydration errors.
- Dashboard works after authentication.
- Landing page remains responsive.
- Existing functionality is not broken.