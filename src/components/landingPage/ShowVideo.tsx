"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ShowVideo = () => {
  useGSAP(() => {
    gsap.to(".VideoSec", {
      width: "85%",
      height: "85%",
      borderRadius: "20px",
      scrollTrigger: {
        trigger: ".main",
        start: "top 0%",
        end: "top -40%",
        pin: true,
        scrub: true,
      },
    });

    gsap.from(".word", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".word",
        start: "top 80%", // animation starts when heading reaches 80% of viewport
        toggleActions: "play none none none",
        // markers: true,
      },
    });
  });

  useGSAP(() => {
    gsap.to(".showInfo", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".main",
    start: "top top",
    end: "+=200",
    scrub: true,

    onLeave: () => {
      gsap.set(".showInfo", { display: "none" });
      gsap.set(".ShowVideo", { display: "block" });
    },

    onEnterBack: () => {
      gsap.set(".showInfo", { display: "block" });
      gsap.set(".ShowVideo", { display: "none" });
    },
  },
});
  })

  return (
    <>
      <h1 className="max-w-full text-center mb-35 px-10 text-balance text-[clamp(38px,5.8vw,74px)] font-[850] leading-[1.3] md:leading-[1.1] text-[#99d82b]/80 max-md:text-[clamp(32px,6.5vw,52px)] max-sm:text-[clamp(40px,8vw,42px)] max-sm:max-w-[90vw]">
        <span className="word inline-block">Let</span>{" "}
        <span className="word inline-block">us</span>{" "}
        <span className="word inline-block">to</span>{" "}
        <b className="word inline-block bg-[#b8ff3c]/70 text-black px-3 md:pb-2 rounded-lg leading-none align-middle">
          GROW
        </b>{" "}
        <span className="word inline-block">you!</span>
      </h1>

      <section className="main h-screen w-full flex items-center justify-center">
        <div className="VideoSec w-full h-full bg-[#99d82b]/80 flex justify-center items-center">
          <div className="showInfo block text-balance text-[clamp(38px,5.8vw,74px)] font-[850] leading-[1.3] md:leading-[1.1] text-black max-md:text-[clamp(32px,6.5vw,52px)] max-sm:text-[clamp(40px,8vw,42px)] max-sm:max-w-[90vw]">
            Avirup
          </div>

          <div className="ShowVideo rounded-3xl w-85 h-50 md:w-220 p-2.5 bg-black/25 md:h-110 hidden">
          <video
            src="https://cdn.pixabay.com/video/2026/03/02/337459_large.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full  rounded-2xl h-full object-cover"
          ></video>
        </div>
        </div>
      </section>
    </>
  );
};

export default ShowVideo;
