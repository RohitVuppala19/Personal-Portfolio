import { useRef, useState } from "react";
import gsap from "gsap";
import profilePhoto from "@/assets/Rohit_Vuppala_Profile.jpg";

type Role = {
  company: string;
  org: string;
  role: string;
  year: string;
  description: string[];
  technologies: string[];
};

const roles: Role[] = [
  {
    company: "EMI Advisors",
    org: "SaaS Platform",
    role: "Technical PM Intern",
    year: "26'",
    description: [
      "Led MVP planning and phased launch strategy for a SaaS data modeling platform across 2 deployment environments (commercial and FedRAMP), translating stakeholder requirements into a prioritized product roadmap",
      "Built and organized a 500+ item Jira backlog by decomposing product architecture into epics, stories, tasks, and subtasks, enabling structured Agile planning and MVP execution",
      "Conducted competitive analysis of 30+ data modeling and ETL platforms, benchmarking pricing, feature gaps, integrations, and market positioning to inform MVP prioritization and product strategy",
      "Integrated GitHub, AWS, and Jira workflows to automate build failure alerts and ticket creation, increasing issue visibility and reducing manual issue tracking",
    ],
    technologies: ["Jira", "GitHub", "AWS", "Agile", "Product Management", "Competitive Analysis", "FedRAMP"],
  },
  {
    company: "USC Mann",
    org: "School of Pharmacy",
    role: "Data & QA Analyst",
    year: "25'",
    description: [
      "Cut faculty prep time by 30% by standardizing 10 years of AACP survey data (50K+ rows) using Python and Power Query, enabling reuse for annual reporting and accreditation",
      "Reduced dashboard request volume by 40% by developing 15+ interactive Tableau dashboards with filters and peer school comparisons, covering KPIs for faculty, students, and programs",
      "Improved roadmap alignment by 30% by converting 20+ stakeholder interviews and usage trends into clear success metrics and prioritized dashboard enhancements",
      "Shortened QA cycles by 25% by writing acceptance criteria and proactively identifying edge case filter bugs in collaboration with engineers and Huron consultants",
      "Boosted executive reporting confidence by 35% by validating YOY survey trends and surfacing USC vs. Big10 benchmarking insights to support data-driven planning",
    ],
    technologies: ["Salesforce", "Tableau", "SQL", "Python", "Excel"],
  },
  {
    company: "ADP",
    org: "HR Platform",
    role: "Software Developer",
    year: "24'",
    description: [
      "Reduced employee transfer time by 95% (3+ days → under 10 minutes) by developing core frontend workflows in a React-based HR platform used by 15+ enterprise clients",
      "Cut payroll errors by ~60% by implementing a Code Mapping engine and validating edge cases to ensure earnings and accumulator codes transferred correctly",
      "Decreased failed transfer rates by ~30% by partnering with PMs and QA to define validation rules and streamline pre-submission error handling",
      "Enabled 3x faster backend processing by developing REST APIs with Spring Boot and integrating Kafka for background job queues and async data handling",
      "Accelerated UI development by ~40% by building 15+ reusable components using ADP's internal React design system with accessibility standards",
      "Boosted sprint delivery confidence by contributing to demos, translating Jira tickets into testable code, and refining Confluence specs across 5 Agile squads",
    ],
    technologies: ["React", "Redux", "Spring Boot", "Kafka", "Oracle DB", "REST APIs", "Jira", "Confluence", "Agile"],
  },
  {
    company: "SS Medicals",
    org: "Oncology Supply",
    role: "Operations Intern",
    year: "22'",
    description: [
      "Improved hospital order fulfillment reliability by 17% through batch and expiry validation across 20+ oncology SKUs",
      "Reduced procurement turnaround by 11% through coordinating purchase orders and lead-time tracking with 10+ manufacturers, sales teams, and logistics partners",
      "Boosted picking efficiency by 8% through strategic cold-chain inventory placement for faster access of high-turn medicines",
    ],
    technologies: ["Supply Chain Operations", "Inventory Management", "Procurement", "Cold-Chain Logistics"],
  },
];

const certifications = [
  {
    name: "Certified Scrum Product Owner",
    link: "https://drive.google.com/file/d/1KLPpWIcbxbL1zJZDQ5ZfE-3bRzOB8Ntm/view",
  },
  {
    name: "Product Management Fellowship",
    link: "https://drive.google.com/file/d/1UcKZ8kidWen7HInrG8aY2plfpeh7DHA-/view",
  },
  {
    name: "Salesforce Virtual Internship",
    link: "https://drive.google.com/file/d/1UL34JlbHNdeCIXocWgUTJBZY9mZV5q5e/view",
  },
];

const ExperienceRow = ({ item }: { item: Role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openRef = useRef(false);
  // A click "pins" the row so it survives the pointer leaving.
  const pinnedRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  const setOpen = (opening: boolean) => {
    if (opening === openRef.current) return;
    const panel = panelRef.current;
    const marker = markerRef.current;
    if (!panel || !marker) return;

    openRef.current = opening;
    setIsOpen(opening);

    gsap.killTweensOf([panel, marker]);
    gsap.to(marker, { rotate: opening ? 90 : 0, duration: 0.3, ease: "power2.out" });

    if (opening) {
      gsap.set(panel, { display: "block" });
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }
  };

  // Touch devices report no hover — there, click stays the only way in.
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  return (
    <div
      className="border-b border-border last:border-0"
      onMouseEnter={() => canHover() && setOpen(true)}
      onMouseLeave={() => canHover() && !pinnedRef.current && setOpen(false)}
    >
      <button
        onClick={() => {
          const next = !openRef.current;
          pinnedRef.current = next;
          setOpen(next);
        }}
        aria-expanded={isOpen}
        className="grid w-full grid-cols-[1fr_auto_auto] items-start gap-3 py-3 text-left font-manrope text-sm transition-colors hover:bg-foreground/[0.03] sm:grid-cols-[0.8fr_1.4fr_1.2fr_0.35fr_auto] sm:gap-4"
      >
        <span className="min-w-0">
          <span className="block font-normal text-foreground sm:whitespace-nowrap">
            {item.company}
          </span>
          {/* Role/org collapse under the company name on small screens */}
          <span className="mt-0.5 block text-muted-foreground sm:hidden">{item.role}</span>
        </span>
        <span className="hidden whitespace-nowrap text-foreground sm:block">{item.org}</span>
        <span className="hidden whitespace-nowrap text-foreground sm:block">{item.role}</span>
        <span className="whitespace-nowrap text-right text-muted-foreground">{item.year}</span>
        <span ref={markerRef} className="shrink-0 text-muted-foreground">
          ▸
        </span>
      </button>

      <div ref={panelRef} className="hidden overflow-hidden">
        <div className="pb-6 pr-8 pt-1">
          <ul className="space-y-2">
            {item.description.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground/20" />
                <span className="font-manrope text-sm font-light leading-relaxed text-muted-foreground">
                  {line}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-4">
            <span className="shrink-0 font-manrope text-xs text-muted-foreground/60">(stack)</span>
            <p className="font-manrope text-xs font-light leading-relaxed text-muted-foreground">
              {item.technologies.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-[384px_1fr] gap-10 lg:gap-16">
        {/* Left column */}
        <div data-reveal className="max-w-sm">
          <div className="flex justify-between mb-4">
            <span className="font-manrope text-sm text-foreground">(About me)</span>
            <span className="font-manrope text-sm text-muted-foreground">(Product Manager)</span>
          </div>

          <div className="aspect-[3/4] relative overflow-hidden mb-6">
            <img src={profilePhoto} alt="Rohit Vuppala" className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-1 font-manrope text-sm text-foreground">
            <a
              href="https://github.com/RohitVuppala19"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              GitHub
            </a>
            <span className="text-muted-foreground">,</span>
            <a
              href="https://www.linkedin.com/in/rohitvuppala/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors ml-1"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right column — offset to line up with the top of the photo, not the label row */}
        <div className="lg:pt-9">
          <p data-reveal data-reveal-delay="0.1" className="font-manrope text-lg md:text-xl font-light leading-relaxed text-foreground mb-16 md:mb-24">
            Starting with full-stack builds at ADP, I grew a versatile skill set across software
            development, analytics, and{" "}
            <span className="font-taviraj italic underline decoration-1 underline-offset-4">
              product management
            </span>{" "}
            through enterprise work and client projects. Currently, I'm a technical product
            management intern at{" "}
            <a href="#projects" className="underline decoration-1 underline-offset-4">
              EMI Advisors
            </a>
            , while pursuing my Master's in Engineering Management at USC.
          </p>

          <div data-reveal data-reveal-delay="0.2">
            {roles.map((item) => (
              <ExperienceRow key={item.company} item={item} />
            ))}
          </div>

          {/* Certifications */}
          <div data-reveal className="mt-12">
            <span className="font-manrope text-sm text-muted-foreground">
              (Certifications &amp; achievements)
            </span>

            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {certifications.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-manrope text-sm font-light text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-muted-foreground"
                >
                  {cert.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
