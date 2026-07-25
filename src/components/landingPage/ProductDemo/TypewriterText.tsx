"use client";

import { useEffect, useState } from "react";

const messages = [
  "Create a checkout. Confirm the payment. Keep building.",
  "One integration. Every transaction in clear view.",
  "Stablecoin payments made practical for modern teams."
];

export function TypewriterText({ active }: { active: boolean }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!active) {
      setMessageIndex(0);
      setCharacterCount(0);
      setDeleting(false);
      return;
    }

    if (reducedMotion) {
      setCharacterCount(messages[0].length);
      return;
    }

    const message = messages[messageIndex];
    const atEnd = characterCount === message.length;
    const atStart = characterCount === 0;
    const delay = atEnd && !deleting ? 1500 : deleting ? 32 : 58;

    const timer = window.setTimeout(() => {
      if (atEnd && !deleting) {
        setDeleting(true);
        return;
      }

      if (atStart && deleting) {
        setDeleting(false);
        setMessageIndex((current) => (current + 1) % messages.length);
        return;
      }

      setCharacterCount((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [active, characterCount, deleting, messageIndex, reducedMotion]);

  return (
    <div
      className={`mx-auto min-h-24 max-w-4xl px-4 text-center transition duration-500 sm:px-7 ${
        active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">
        Designed for momentum
      </p>
      <p className="mx-auto mt-3 min-h-[2.3em] text-balance text-[clamp(1.15rem,2.2vw,2rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-white">
        <span aria-hidden="true">{messages[messageIndex].slice(0, characterCount)}</span>
        <span aria-hidden="true" className="ml-0.5 inline-block h-[0.9em] w-0.5 animate-pulse bg-[#b8ff3c] align-[-0.05em]" />
        <span className="sr-only">{messages.join(" ")}</span>
      </p>
    </div>
  );
}
