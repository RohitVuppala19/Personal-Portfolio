import { useState, useEffect, useRef } from "react";
import { Menu, X, Clock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

// TODO: point this at the real resume PDF (e.g. a file in /public or a Drive link)
const RESUME_URL = "https://www.linkedin.com/in/rohitvuppala/";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/Los_Angeles",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll and stagger the links in while the overlay is open.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const links = overlayRef.current?.querySelectorAll("[data-mobile-link]");
    let tween: gsap.core.Tween | null = null;
    if (links?.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tween = gsap.from(links, {
        y: 24,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.06,
      });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      tween?.kill();
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Resume", href: RESUME_URL, external: true },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    // On sub-routes the section does not exist — go home and let the hash
    // handler there do the scrolling.
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center bg-background border-b-[0.5px] border-black/[0.07]">
        <div className="w-full flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
          {/* Logo + Live Time */}
          <div className="flex items-center gap-3">
            <div className="font-figtree font-normal text-black text-[18px] tracking-[-0.06em] leading-[25.2px]">
              RV
            </div>
            <div className="hidden sm:flex items-center gap-[5px] bg-[#f2f2f2] rounded-[4px] px-[10px] py-[6px]">
              <Clock className="h-3 w-3 text-[#696969]" />
              <span className="font-inter-display font-normal text-[#696969] text-[13px] tracking-[-0.04em] leading-[1em] tabular-nums whitespace-nowrap">
                {time} PT
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-[18px]">
            {navItems.map((item) => {
              const inner = (
                <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-[22.4px]">
                  <span className="font-manrope font-normal text-[#1a1a1a] text-[16px] tracking-[-0.01em] leading-[22.4px]">
                    {item.label}
                  </span>
                  <span className="font-taviraj italic font-light text-[#1a1a1a] text-[14px] tracking-[-0.03em] leading-[19.6px]">
                    {item.label}
                  </span>
                </span>
              );

              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-[22.4px] overflow-hidden"
                >
                  {inner}
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="group relative h-[22.4px] overflow-hidden"
                >
                  {inner}
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-md p-1 text-foreground md:hidden"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      {isMobileMenuOpen && (
        <div ref={overlayRef} className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-figtree font-normal text-black text-[18px] tracking-[-0.06em] leading-[25.2px]">
              RV
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-md p-1 text-foreground"
            >
              <X className="size-7" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-end justify-center gap-6 px-8 pb-24">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  data-mobile-link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-manrope text-right text-3xl font-semibold uppercase tracking-wide text-foreground transition-opacity hover:opacity-60"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  data-mobile-link
                  onClick={() => scrollToSection(item.href)}
                  className="font-manrope text-right text-3xl font-semibold uppercase tracking-wide text-foreground transition-opacity hover:opacity-60"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;
