"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./ProductDemo.module.css";
import { TypewriterText } from "./TypewriterText";

gsap.registerPlugin(ScrollTrigger);

const videoUrl = "https://cdn.pixabay.com/video/2026/03/02/337459_large.mp4";

export function ProductDemo() {
  const section = useRef<HTMLElement>(null);
  const videoShown = useRef(false);
  const [showVideo, setShowVideo] = useState(false);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const updateVideoVisibility = (visible: boolean) => {
        if (videoShown.current === visible) return;
        videoShown.current = visible;
        setShowVideo(visible);
      };

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-video-word]", {
          y: 85,
          opacity: 0,
          stagger: 0.11,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-video-heading]",
            start: "top 82%",
            toggleActions: "play none none reverse"
          }
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-video-stage]",
            start: "top top",
            end: "+=500",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => updateVideoVisibility(self.progress >= 0.4)
          }
        });

        timeline.fromTo(
          "[data-video-shell]",
          {
            scale: 0.8,
            borderRadius: "32px"
          },
          {
            scale: 1,
            borderRadius: "20px",
            ease: "none"
          }
        );
      });

      media.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.from("[data-video-shell]", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-video-stage]", start: "top 80%" }
        });

        ScrollTrigger.create({
          trigger: "[data-video-stage]",
          start: "top 58%",
          onEnter: () => updateVideoVisibility(true),
          onLeaveBack: () => updateVideoVisibility(false)
        });
      });

      return () => {
        videoShown.current = false;
        media.revert();
      };
    },
    { scope: section }
  );

  return (
    <section ref={section} className="border-y border-white/[0.06] bg-[#030403] py-24 sm:py-32">
      <div data-video-heading className="mx-auto max-w-5xl px-4 text-center sm:px-7">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff3c]">
          See the experience
        </p>
        <h2 className="text-balance text-[clamp(2.7rem,6vw,5.6rem)] font-[850] leading-[1.02] tracking-[-0.055em] text-white">
          <span data-video-word className="inline-block">Built</span>{" "}
          <span data-video-word className="inline-block">to</span>{" "}
          <span data-video-word className="inline-block">help</span>{" "}
          <span
            data-video-word
            className="inline-block rounded-xl bg-[#b8ff3c] px-3 pb-2 text-black"
          >
            GROW
          </span>{" "}
          <span data-video-word className="inline-block">your business.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
          A focused payment experience for your customers and a clear operating view for your team.
        </p>
      </div>

      <div data-video-stage className="mt-12 flex min-h-[72vh] w-full flex-col items-center justify-center gap-8 md:mt-20 md:min-h-screen">
        <div
          data-video-shell
          className={`relative aspect-[2/1] h-auto w-[calc(100%_-_1.5rem)] transform-gpu overflow-hidden rounded-3xl border transition-[background-color,border-color,box-shadow,padding] duration-700 will-change-transform md:w-[68%] ${
            showVideo
              ? "border-[#b8ff3c]/15 bg-[#b8ff3c]/[0.08] p-0 shadow-[0_30px_90px_rgba(184,255,60,0.1)]"
              : "border-[#b8ff3c]/20 bg-[#9fdf30] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-3"
          }`}
        >
          {showVideo ? (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[8%] bg-[#b8ff3c]/45 blur-[55px]"
              />
              <div className={`relative h-full w-full overflow-hidden rounded-[18px] bg-black/70 ${styles.videoReveal}`}>
                <video
                  key="payyoss-video"
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="block h-full w-full object-cover"
                />
              </div>
            </>
          ) : (
            <div className="grid h-full w-full place-items-center rounded-[18px] bg-[#a8ed32] text-black">
              <div className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-black/15 bg-black text-[#b8ff3c] shadow-xl">
                  <Play className="ml-0.5 size-5 fill-current" />
                </span>
                <p className="mt-5 text-2xl font-[850] tracking-[-0.03em] sm:text-4xl">
                  PayyOSS in motion
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/50">
                  Scroll to explore
                </p>
              </div>
            </div>
          )}
        </div>

        <TypewriterText active={showVideo} />
      </div>
    </section>
  );
}
