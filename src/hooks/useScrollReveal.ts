import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + lifts any element marked with `data-reveal` as it scrolls into view.
 *
 * Driven by attributes rather than wrapper components so it can be dropped onto
 * existing grid/flex children without disturbing their layout. Optional
 * `data-reveal-delay` (seconds) staggers siblings.
 */
export const useScrollReveal = () => {
  useLayoutEffect(() => {
    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: Number(el.dataset.revealDelay ?? 0),
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              // Replays every time the element is scrolled back into view
              // instead of firing once per page load.
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // Trigger positions are measured at setup, before the hero video/photo have
    // settled and before a client-side route change has finished painting.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);
};
