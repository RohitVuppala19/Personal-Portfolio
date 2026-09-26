import { useEffect, useRef } from "react";
import heroPoster from "@/assets/Rohit_Vuppala_Profile.jpg";

// Drop a looping clip at public/hero.mp4 and it takes over automatically.
// Until then (or if it fails to load) the poster image below is what shows.
const HERO_VIDEO = "/hero.mp4";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React can miss the muted property on first render, and autoplay is
    // blocked without it.
    video.muted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    // Some browsers reject the promise if the file is missing — the poster
    // stays up in that case, which is the fallback we want anyway.
    void video.play().catch(() => {});
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full px-[30px] pt-[85px] pb-[30px]">
      <div className="relative w-full h-[calc(100vh-115px)] rounded-[4px] overflow-hidden">
        {/* Full-bleed media */}
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/45" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between px-[30px] pt-[40px] pb-[30px]">
          {/* Top labels */}
          <div className="w-full flex items-start justify-between gap-[5px]">
            <button
              onClick={scrollToProjects}
              className="font-taviraj italic font-light text-white text-left text-[12px] tracking-[-0.04em] sm:text-[16px] sm:tracking-[-0.07em] leading-[1.6em]"
            >
              [Scroll to know me better]
            </button>
            <p className="font-taviraj italic font-light text-white text-right text-[12px] tracking-[-0.04em] sm:text-[16px] sm:tracking-[-0.07em] leading-[1.6em]">
              [Based in Los Angeles, CA]
            </p>
          </div>

          {/* Center wordmark */}
          <div className="flex flex-col items-center gap-2">
            <div className="py-1">
              <h1 className="font-taviraj italic font-light text-white text-center text-[clamp(40px,6vw,70px)] tracking-[-0.04em] leading-[0.9em]">
                rohit vuppala
              </h1>
            </div>
            <p className="font-taviraj italic font-light text-white text-center text-[clamp(15px,1.7vw,20px)] tracking-[-0.06em] leading-[1.6em]">
              turning data into decisions
            </p>
          </div>

          {/* Bottom label */}
          <p className="font-taviraj italic font-light text-white text-center text-[12px] tracking-[-0.03em] sm:text-[16px] sm:tracking-[-0.05em] leading-[1.5em]">
            [currently @ emi advisors, usc mann]
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
