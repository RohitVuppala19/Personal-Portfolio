import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAME = "rohit";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const columns: { label: string; links: FooterLink[] }[] = [
  {
    label: "Menu",
    links: [
      { label: "About", href: "/#about" },
      { label: "Projects", href: "/#projects" },
      { label: "All work", href: "/work" },
    ],
  },
  {
    label: "Say hello",
    links: [
      { label: "Email", href: "mailto:rohitvuppala99@gmail.com", external: true },
      {
        label: "Resume",
        href: "https://www.linkedin.com/in/rohitvuppala/",
        external: true,
      },
    ],
  },
  {
    label: "Socials",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/rohitvuppala/", external: true },
      { label: "GitHub", href: "https://github.com/RohitVuppala19", external: true },
    ],
  },
];

const Footer = () => {
  const [typed, setTyped] = useState("");
  const markRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const mark = markRef.current;
    const caret = caretRef.current;
    if (!mark || !caret) return;

    // Blinking caret, running independently of the typing tween.
    const blink = gsap.to(caret, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
    });

    // Respect users who prefer reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(NAME);
      return () => {
        blink.kill();
      };
    }

    const counter = { chars: 0 };
    let tween: gsap.core.Tween | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasRun.current) return;
          hasRun.current = true;
          tween = gsap.to(counter, {
            chars: NAME.length,
            duration: NAME.length * 0.13,
            ease: "none",
            onUpdate: () => setTyped(NAME.slice(0, Math.round(counter.chars))),
            onComplete: () => setTyped(NAME),
          });
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(mark);

    return () => {
      observer.disconnect();
      blink.kill();
      tween?.kill();
    };
  }, []);

  return (
    <footer id="contact" className="flex flex-col gap-20 px-6 pb-16 sm:px-[60px] sm:pb-20">
      {/* Hairline divider */}
      <div className="h-px w-full bg-[#f2f2f2]" />

      <div data-reveal className="flex flex-col gap-6">
        {/* Signature mark — types itself in on first scroll into view */}
        <div
          ref={markRef}
          aria-label={NAME}
          className="flex h-[48px] items-center font-taviraj text-[48px] font-light italic leading-none tracking-[-0.04em] text-foreground"
        >
          <span aria-hidden="true">{typed}</span>
          <span
            ref={caretRef}
            aria-hidden="true"
            className="ml-1 inline-block h-[38px] w-[2px] bg-foreground/70"
          />
        </div>

        {/* Columns */}
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-0">
          <div className="flex flex-col gap-2 sm:w-1/4">
            <p className="font-inter-display text-[18px] leading-[1.4em] tracking-[-0.04em] text-[#969696]">
              ©2026
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.label} className="flex flex-col gap-2 sm:w-1/4">
              <p className="font-inter-display text-[18px] leading-[1.4em] tracking-[-0.04em] text-[#a6a6a6]">
                {column.label}
              </p>
              <div className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="font-manrope text-[18px] leading-[1.4em] tracking-[-0.04em] text-[#2e2e2e] transition-colors hover:text-[#969696]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
