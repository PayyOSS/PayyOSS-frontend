import {
  BellRing,
  BookOpen,
  CheckCircle2,
  Code2,
  Headphones,
  Home,
  Rocket,
  ShieldCheck,
  Webhook,
  Zap
} from "lucide-react";

export const sidebarSections = [
  {
    title: "Introduction",
    icon: Home,
    href: "/Documentation/introcuction",
    items: []
  },
  {
    title: "SDK Setup",
    icon: Code2,
    href: "/Documentation/sdk/typescript",
    items: [{ title: "TypeScript", href: "/Documentation/sdk/typescript" }]
  },
  {
    title: "Webhook",
    icon: Webhook,
    href: "/Documentation/webhook/overview",
    items: [
      { title: "Overview", href: "/Documentation/webhook/overview" },
      { title: "Retry Policy", href: "/Documentation/webhook/retry-policy" }
    ]
  }
];

export type DocumentationPage =
  | "introduction"
  | "sdk-typescript"
  | "webhook-overview"
  | "webhook-retry-policy";

export const featureCards = [
  {
    title: "Fast Integration",
    description: "Get up and running in minutes with our easy-to-use SDKs and clear guides.",
    icon: Rocket
  },
  {
    title: "Secure by Design",
    description: "Enterprise-grade security and best practices to keep your integrations safe.",
    icon: ShieldCheck
  },
  {
    title: "Reliable Infrastructure",
    description: "Built for scale with 99.9% uptime and real-time monitoring.",
    icon: Zap
  }
];

export const keyFeatures = [
  "Accept crypto payments",
  "Developer-friendly SDKs",
  "Real-time transaction status",
  "Secure & reliable infrastructure",
  "Webhook notifications",
  "Comprehensive documentation",
  "Multi-chain support",
  "Dedicated support"
];

export const supportCards = [
  {
    title: "Need help?",
    description: "Can't find what you're looking for?",
    action: "Contact Support",
    icon: Headphones
  },
  {
    title: "API Status",
    description: "All Systems Operational",
    icon: BellRing
  }
];

export const codeSample = `import PayyOSS from "payyoss";

const payyoss = new PayyOSS({
  apiKey: process.env.PAYYOSS_API_KEY!,
});

const payment = await payyoss.checkout.create({
  amount: "25.00",
  successUrl: "https://merchant.com/payment/success",
  cancelUrl: "https://merchant.com/payment/cancel",
  customerEmail: "customer@example.com",
  metadata: {
    orderId: "order_123",
  },
});

console.log(payment.checkoutUrl);`;

export const BookIcon = BookOpen;
export const CheckIcon = CheckCircle2;
