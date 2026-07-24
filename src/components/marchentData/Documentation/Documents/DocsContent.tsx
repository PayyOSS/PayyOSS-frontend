import { ArrowRight, BookOpen, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { codeSample, featureCards, keyFeatures } from "./docs-data";
import type { DocumentationPage } from "./docs-data";

type DocsContentProps = {
  page: DocumentationPage;
};

export function DocsContent({ page }: DocsContentProps) {
  if (page !== "introduction") {
    return <GuideContent page={page} />;
  }

  return (
    <main className="min-w-0 flex-1 bg-[#020a0f] px-6 py-6 text-white lg:h-screen lg:overflow-y-auto lg:px-9">
      <div className="mb-3 flex justify-end">
        <a
          className="inline-flex h-11 items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-4 font-medium shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition hover:border-[#b8ff00]/60"
          href="/"
        >
          Go to Dashboard
          <ExternalLink className="size-4" />
        </a>
      </div>

      <section className="relative rounded-xl border border-white/10 bg-[#071119]/80 p-7 shadow-[0_28px_90px_rgba(0,0,0,0.32)] lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_4%,rgba(184,255,0,0.09),transparent_22rem),linear-gradient(180deg,rgba(255,255,255,0.025),transparent)]" />

        <div className="relative">
          <div className="mb-8 grid gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:items-start">
            <div>
              <h1 className="mb-5 text-4xl font-bold tracking-tight lg:text-[42px]">
                Introduction
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/70">
                Welcome to PayyOSS API documentation. Build, integrate and scale seamlessly
                with our powerful payment infrastructure.
              </p>
            </div>

            <div className="hidden rounded-xl border border-white/10 bg-[#07131b] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:block">
              <div className="relative h-[120px] overflow-hidden rounded-lg border border-white/5 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:24px_24px]">
                <div className="absolute left-12 top-6 h-20 w-28 rounded-md border border-[#b8ff00] bg-[#b8ff00]/5 shadow-[0_0_50px_rgba(184,255,0,0.25)]">
                  <div className="flex h-6 items-center gap-1 border-b border-[#b8ff00]/60 px-2">
                    <span className="size-1.5 rounded-full bg-[#b8ff00]" />
                    <span className="size-1.5 rounded-full bg-[#b8ff00]" />
                    <span className="size-1.5 rounded-full bg-[#b8ff00]" />
                  </div>
                  <CodeGraphic />
                </div>
                <span className="absolute right-16 top-10 h-1.5 w-28 rounded-full bg-[#b8ff00]/25" />
                <span className="absolute right-24 top-16 h-1.5 w-20 rounded-full bg-[#b8ff00]/20" />
                <span className="absolute right-24 top-[88px] h-1.5 w-20 rounded-full bg-[#b8ff00]/10" />
              </div>
            </div>
          </div>

          <div className="mb-10 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
                  key={feature.title}
                >
                  <div className="mb-4 flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#b8ff00]/10 text-[#b8ff00]">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h2 className="mb-2 text-lg font-semibold">{feature.title}</h2>
                      <p className="leading-7 text-white/70">{feature.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="grid gap-8 xl:grid-cols-[1fr_0.78fr]">
            <div>
              <section className="border-b border-white/10 pb-5">
                <h2 className="mb-5 text-2xl font-bold">What is PayyOSS?</h2>
                <div className="space-y-4 text-base leading-8 text-white/70">
                  <p>
                    PayyOSS provides a simple and powerful API for businesses to accept
                    crypto payments, manage transactions and receive real-time notifications
                    via webhooks.
                  </p>
                  <p>
                    Whether you're building a marketplace, SaaS product, or any
                    blockchain-powered solution, we've got you covered.
                  </p>
                </div>
              </section>

              <section className="pt-8">
                <h2 className="mb-5 text-2xl font-bold">Key Features</h2>
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {keyFeatures.map((feature) => (
                    <p className="flex items-center gap-3 text-sm text-white/75" key={feature}>
                      <CheckCircle2 className="size-5 shrink-0 text-[#b8ff00]" />
                      {feature}
                    </p>
                  ))}
                </div>
              </section>
            </div>

            <CodePanel />
          </div>

          <div className="mt-7 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <BookOpen className="size-6 text-[#b8ff00]" />
              <p className="text-white/90">
                New to PayyOSS? Start with{" "}
                <a className="text-[#b8ff00]" href="/Documentation/sdk/typescript">
                  SDK Setup
                </a>{" "}
                to make your first API call.
              </p>
            </div>
            <a
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-[#b8ff00] px-5 font-semibold text-[#b8ff00] transition hover:bg-[#b8ff00] hover:text-[#061016]"
              href="/Documentation/sdk/typescript"
            >
              Get Started
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const guidePages = {
  "sdk-typescript": {
    eyebrow: "SDK Setup",
    title: "TypeScript SDK",
    description:
      "Install and configure the PayyOSS TypeScript SDK, then make your first API request.",
    sections: [
      {
        title: "Install the SDK",
        body: "Add the PayyOSS package to your application with your preferred package manager.",
        code: "npm install payyoss"
      },
      {
        title: "Create a client",
        body: "Initialize one reusable server-side client with your PayyOSS API key. Keep the key in an environment variable and never expose it in browser code.",
        code: codeSample
      },
      {
        title: "Send the customer to checkout",
        body: "checkout.create returns the hosted checkout URL. Redirect the customer to this URL to complete the payment.",
        code: `const payment = await payyoss.checkout.create({
  amount: "25.00",
  successUrl: "https://merchant.com/payment/success",
  cancelUrl: "https://merchant.com/payment/cancel",
  metadata: { orderId: "order_123" },
});

response.redirect(303, payment.checkoutUrl);`
      }
    ],
    nextHref: "/Documentation/webhook/overview",
    nextLabel: "Continue to Webhooks"
  },
  "webhook-overview": {
    eyebrow: "Webhook",
    title: "Webhook Overview",
    description:
      "Receive real-time notifications when payments and transactions change state.",
    sections: [
      {
        title: "Verify signed events",
        body: "PayyOSS signs the exact request bytes. Use express.raw for this route and verify the raw body before reading or processing the event.",
        code: `import express from "express";
import PayyOSS, { WebhookEventTypes } from "payyoss";

const app = express();
const payyoss = new PayyOSS({
  apiKey: process.env.PAYYOSS_API_KEY!,
});

app.post(
  "/webhooks/payyoss",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    try {
      const event = payyoss.webhooks.verify(
        request.body,
        request.headers["payyoss-signature"] as string,
        request.headers["payyoss-timestamp"] as string,
        process.env.PAYYOSS_WEBHOOK_SECRET!,
      );

      switch (event.type) {
        case WebhookEventTypes.PAYMENT_CONFIRMED:
          await markOrderAsPaid(event.data);
          break;
        case WebhookEventTypes.PAYMENT_FAILED:
          await markOrderAsFailed(event.data);
          break;
      }

      return response.json({ received: true });
    } catch {
      return response.sendStatus(400);
    }
  },
);`
      },
      {
        title: "Process events safely",
        body: "Verification checks the HMAC signature, timestamp tolerance, JSON payload, and supported event type. Store event.id and make processing idempotent because the same delivery can arrive more than once."
      }
    ],
    nextHref: "/Documentation/webhook/retry-policy",
    nextLabel: "Read the Retry Policy"
  },
  "webhook-retry-policy": {
    eyebrow: "Webhook",
    title: "Retry Policy",
    description:
      "PayyOSS automatically retries webhook deliveries when your endpoint cannot accept an event.",
    sections: [
      {
        title: "How retries work",
        body: "The PayyOSS gateway stores each webhook delivery and sends it through a Redis-backed queue. The first delivery is attempted immediately. If it fails, PayyOSS retries after 1 minute, 5 minutes, 30 minutes, and 2 hours, for a maximum of five delivery attempts.",
        code: undefined
      },
      {
        title: "When PayyOSS retries",
        body: "A delivery is retried when the merchant endpoint cannot be reached, takes longer than 10 seconds to respond, or returns a non-2xx HTTP status. A successful 2xx response marks the delivery as delivered and stops further attempts. Disabled webhook endpoints are not retried.",
        code: undefined
      },
      {
        title: "What the SDK handles",
        body: "The TypeScript SDK does not schedule deliveries, retry failed requests, or store duplicate event IDs. Creating a PayyOSS client automatically initializes its webhook verifier. The verifier validates the signature, timestamp, payload shape, and supported event type before returning the event to your handler. Its timestamp tolerance defaults to 300 seconds and can be changed with the webhookToleranceSeconds client option.",
        code: undefined
      },
      {
        title: "Merchant endpoint responsibility",
        body: "Return a 2xx response only after accepting the event. Return a non-2xx response when processing cannot continue and you want the gateway to retry. Because retries deliver the same event ID again, merchants should ensure that processing the same event more than once does not repeat a payment-related action.",
        code: undefined
      }
    ],
    nextHref: "/Documentation/sdk/typescript",
    nextLabel: "View TypeScript SDK"
  }
} satisfies Record<
  Exclude<DocumentationPage, "introduction">,
  {
    eyebrow: string;
    title: string;
    description: string;
    sections: Array<{ title: string; body: string; code?: string }>;
    nextHref: string;
    nextLabel: string;
  }
>;

function GuideContent({
  page
}: {
  page: Exclude<DocumentationPage, "introduction">;
}) {
  const guide = guidePages[page];

  return (
    <main className="min-w-0 flex-1 bg-[#020a0f] px-6 py-6 text-white lg:h-screen lg:overflow-y-auto lg:px-9">
      <div className="mb-3 flex justify-end">
        <a
          className="inline-flex h-11 items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-4 font-medium shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition hover:border-[#b8ff00]/60"
          href="/"
        >
          Go to Dashboard
          <ExternalLink className="size-4" />
        </a>
      </div>

      <article className="relative rounded-xl border border-white/10 bg-[#071119]/80 p-7 shadow-[0_28px_90px_rgba(0,0,0,0.32)] lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_4%,rgba(184,255,0,0.09),transparent_22rem)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b8ff00]">
            {guide.eyebrow}
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight lg:text-[42px]">
            {guide.title}
          </h1>
          <p className="mb-10 max-w-3xl text-base leading-8 text-white/70">
            {guide.description}
          </p>

          <div className="space-y-6">
            {guide.sections.map((section, index) => (
              <section
                className="rounded-lg border border-white/10 bg-white/[0.03] p-6"
                key={section.title}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-[#b8ff00]/10 text-sm font-bold text-[#b8ff00]">
                    {index + 1}
                  </span>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <p className="leading-7 text-white/70">{section.body}</p>
                {section.code ? (
                  <pre className="mt-5 overflow-x-auto rounded-lg border border-white/10 bg-[#020a0f] p-5 text-sm leading-6 text-white">
                    <code>{section.code}</code>
                  </pre>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <a
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-[#b8ff00] px-5 font-semibold text-[#b8ff00] transition hover:bg-[#b8ff00] hover:text-[#061016]"
              href={guide.nextHref}
            >
              {guide.nextLabel}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

function CodePanel() {
  return (
    <section className="self-end overflow-hidden rounded-lg border border-white/10 bg-[#071119]/95">
      <div className="flex h-12 items-center justify-between border-b border-white/10 px-5">
        <span className="border-b border-[#b8ff00] pb-3 text-sm font-semibold text-[#b8ff00]">
          TypeScript
        </span>
        <Copy className="size-5 text-white/70" />
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-6 text-white">
        <code>{codeSample}</code>
      </pre>
    </section>
  );
}

function CodeGraphic() {
  return (
    <div className="grid h-14 place-items-center text-[#b8ff00]">
      <span className="text-4xl font-semibold tracking-tight">&lt;/&gt;</span>
    </div>
  );
}
