import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Maximize2, Minimize2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

/** Enter/exit duration. Kept in sync with the [transition-duration:400ms] classes below. */
const TRANSITION_MS = 400;

/**
 * Project write-up, opened over whatever page the card was clicked from.
 *
 * Driven by the URL (/project/:slug) rather than local state, so a write-up can
 * be linked to directly and the browser's back button closes it. Radix supplies
 * the focus trap, Escape handling, outside-click and body scroll lock; the
 * transitions are ours, because Radix's own presence detection waits on CSS
 * animations and these are transitions.
 *
 * `project` going null starts the exit: the last-open project is held in a ref
 * and stays rendered for one transition so there is something to animate out.
 */
const ProjectModal = ({
  project,
  fullscreen,
  onClose,
  onToggleFullscreen,
}: {
  project: Project | null;
  fullscreen: boolean;
  onClose: () => void;
  onToggleFullscreen: () => void;
}) => {
  const last = useRef<Project | null>(null);
  if (project) last.current = project;

  const [mounted, setMounted] = useState(!!project);
  const [visible, setVisible] = useState(false);

  // Radix's portal mounts its children a render after this component commits,
  // so a plain ref is still null in the effect below. A callback ref reports
  // the node the moment it exists, which is what the observer keys off.
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);
  const attachScroll = useCallback((node: HTMLDivElement | null) => {
    scrollRef.current = node;
    setScrollEl(node);
  }, []);

  useEffect(() => {
    if (project) {
      setMounted(true);
      // A frame between mount and the visible class, or the browser has no
      // starting value to transition from and the panel simply appears.
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = setTimeout(() => setMounted(false), TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [project]);

  // Sections fade up as they enter the panel's own scroll viewport, which is
  // why this can't reuse the page-level scroll reveal — the root is the panel.
  useEffect(() => {
    const root = scrollEl;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-modal-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { root, rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scrollEl, project]);

  // The scrollbar stays invisible until the panel is actually being scrolled.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.classList.add("is-scrolling");
    window.clearTimeout(Number(el.dataset.scrollTimer));
    el.dataset.scrollTimer = String(
      window.setTimeout(() => el.classList.remove("is-scrolling"), 800)
    );
  };

  const shown = project ?? last.current;
  if (!mounted || !shown) return null;

  const Icon = shown.icon;
  const study = shown.caseStudy;
  const meta = study?.meta ?? [];

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center transition-all [transition-duration:400ms] ease-out",
            fullscreen ? "px-0" : "px-4 sm:px-8"
          )}
        >
          <Dialog.Overlay
            className={cn(
              "absolute inset-0 bg-zinc-900/20 transition-opacity [transition-duration:400ms] ease-out",
              visible ? "opacity-100" : "opacity-0"
            )}
          />

          <Dialog.Content
            aria-describedby={undefined}
            // Radix focuses the first control on open, which leaves a focus
            // ring sitting on the expand button. Focus the panel itself instead:
            // the trap and Escape still work, without the stray ring.
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              if (event.currentTarget instanceof HTMLElement) event.currentTarget.focus();
            }}
            className={cn(
              "relative flex flex-col overflow-hidden bg-background transition-all [transition-duration:400ms] ease-out focus:outline-none",
              fullscreen
                ? "h-full w-full rounded-none"
                : "max-h-[80vh] min-h-[80vh] w-[calc(100%*10/12)] rounded-[26px] max-md:w-full sm:max-h-[90vh] sm:min-h-[90vh]",
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {/* Softens the top edge of the scrolling content as it passes under
                the floating controls. Desktop only — on a phone it would eat
                the first line of the header rather than whitespace. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden h-32 bg-gradient-to-b from-background via-background/40 to-transparent md:block"
            />

            <div className="relative flex min-h-0 flex-1 flex-col">
              <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pb-3 pt-6">
                <button
                  type="button"
                  onClick={onToggleFullscreen}
                  aria-label={fullscreen ? "Exit full screen" : "Expand to full screen"}
                  className="flex size-6 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 ease-out hover:bg-muted hover:text-foreground"
                >
                  {fullscreen ? (
                    <Minimize2 className="size-[18px]" strokeWidth={1.75} />
                  ) : (
                    <Maximize2 className="size-[18px]" strokeWidth={1.75} />
                  )}
                </button>

                <Dialog.Close
                  aria-label="Close"
                  className="flex size-6 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 ease-out hover:bg-muted hover:text-foreground"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden>
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </Dialog.Close>
              </div>

              <div
                ref={attachScroll}
                onScroll={handleScroll}
                className="modal-scroll-container min-h-0 flex-1 overflow-y-auto overflow-x-hidden rounded-t-[26px]"
              >
                <div className="flex w-full flex-col pb-16">
                  {/* Header: icon tile, title, metadata rail, rule, hero */}
                  <div className="mx-auto w-full max-w-[800px]">
                    <div className="flex w-full flex-col items-start gap-8 px-6 pb-16 pt-24 sm:px-8 md:pt-32">
                      <div data-modal-reveal className="modal-reveal">
                        <div className="flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-muted">
                          <Icon className="size-9 text-foreground/25" strokeWidth={1.25} />
                        </div>
                      </div>

                      <div className="flex w-full flex-col items-start gap-10">
                        <div data-modal-reveal className="modal-reveal">
                          <Dialog.Title className="font-taviraj text-4xl font-light leading-tight tracking-tight text-foreground">
                            {shown.title}
                          </Dialog.Title>
                        </div>

                        {meta.length > 0 && (
                          <div className="flex w-full items-start gap-5 max-md:grid max-md:grid-cols-2 max-md:gap-4">
                            {meta.map((item) => (
                              <div
                                key={item.label}
                                data-modal-reveal
                                className="modal-reveal min-w-px flex-[1_0_0]"
                              >
                                <div className="flex flex-col items-start gap-3 font-manrope text-base leading-normal">
                                  <p className="font-medium text-muted-foreground">{item.label}</p>
                                  <p className="font-light text-foreground">{item.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div data-modal-reveal className="modal-reveal w-full">
                        <div className="h-px w-full bg-border" />
                      </div>

                      <div data-modal-reveal className="modal-reveal w-full">
                        <div className="flex aspect-[1090/591] w-full items-center justify-center overflow-hidden rounded-[26px] bg-muted">
                          <Icon className="size-16 text-foreground/15" strokeWidth={1} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body: label + statement on the left, paragraphs on the right */}
                  {study?.sections?.map((section) => (
                    <div key={section.label} className="mx-auto w-full max-w-[800px]">
                      <div data-modal-reveal className="modal-reveal">
                        <div className="grid w-full grid-cols-[2fr_1fr_2fr] items-start px-6 py-14 max-md:flex max-md:flex-col max-md:gap-6 sm:px-8 md:py-16">
                          <div className="flex flex-col gap-5">
                            <p className="font-manrope text-xs uppercase tracking-[0.18em] text-muted-foreground">
                              {section.label}
                            </p>
                            {section.statement && (
                              <p className="font-manrope text-xl font-light leading-snug text-foreground">
                                {section.statement}
                              </p>
                            )}
                          </div>

                          <div aria-hidden className="max-md:hidden" />

                          <div className="flex flex-col gap-5">
                            {section.body?.map((paragraph) => (
                              <p
                                key={paragraph.slice(0, 32)}
                                className="font-manrope text-base font-light leading-[1.7] text-muted-foreground"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Outcome + stack, in the same two-column rhythm */}
                  <div className="mx-auto w-full max-w-[800px]">
                    <div data-modal-reveal className="modal-reveal">
                      <div className="grid w-full grid-cols-[2fr_1fr_2fr] items-start border-t border-border px-6 py-14 max-md:flex max-md:flex-col max-md:gap-6 sm:px-8 md:py-16">
                        <div className="flex flex-col gap-5">
                          <p className="font-manrope text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Outcome
                          </p>
                          <p className="font-taviraj text-xl font-light italic leading-snug text-foreground">
                            {shown.metrics}
                          </p>
                        </div>

                        <div aria-hidden className="max-md:hidden" />

                        <div className="flex flex-col gap-5">
                          <p className="font-manrope text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Stack
                          </p>
                          <p className="font-manrope text-base font-light leading-[1.7] text-muted-foreground">
                            {shown.technologies.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {study?.highlights && study.highlights.length > 0 && (
                    <div className="mx-auto w-full max-w-[800px]">
                      <div data-modal-reveal className="modal-reveal">
                        <div className="grid w-full grid-cols-[2fr_1fr_2fr] items-start border-t border-border px-6 py-14 max-md:flex max-md:flex-col max-md:gap-6 sm:px-8 md:py-16">
                          <p className="font-manrope text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Notes
                          </p>

                          <div aria-hidden className="max-md:hidden" />

                          <ul className="flex flex-col gap-4">
                            {study.highlights.map((item) => (
                              <li
                                key={item}
                                className="flex gap-4 font-manrope text-sm font-light leading-relaxed text-muted-foreground"
                              >
                                <span aria-hidden className="shrink-0 text-muted-foreground/40">
                                  —
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {study?.links && study.links.length > 0 && (
                    <div className="mx-auto w-full max-w-[800px]">
                      <div data-modal-reveal className="modal-reveal">
                        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border px-6 py-10 sm:px-8">
                          {study.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="group flex items-center gap-1.5 font-manrope text-sm text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-muted-foreground"
                            >
                              {link.label}
                              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Nothing written up yet — say so rather than ending abruptly. */}
                  {!study && (
                    <div className="mx-auto w-full max-w-[800px]">
                      <div data-modal-reveal className="modal-reveal">
                        <p className="border-t border-border px-6 py-14 font-manrope text-sm font-light italic text-muted-foreground/70 sm:px-8">
                          A longer write-up of this project is in progress.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProjectModal;
