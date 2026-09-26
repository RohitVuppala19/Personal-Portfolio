import { BarChart3, Bot, Building2, TestTube, Zap, Brain, type LucideIcon } from "lucide-react";

/**
 * Long-form detail shown in the project modal. Every field is optional so a
 * project can be listed before its write-up exists — the modal falls back to
 * the card's own description, stack and metric rather than rendering an empty
 * shell.
 */
export type CaseStudy = {
  /** The four-column rail under the title. Any pair may be omitted. */
  meta?: { label: string; value: string }[];
  /**
   * Each section is one row: the label and its one-line statement sit in the
   * left column, the paragraphs in the right.
   */
  sections?: { label: string; statement?: string; body?: string[] }[];
  /** Short factual lines — decisions, constraints, numbers. */
  highlights?: string[];
  links?: { label: string; href: string }[];
};

export type Project = {
  title: string;
  /** URL segment: /project/<slug>. Explicit so titles can change freely. */
  slug: string;
  description: string;
  category: string;
  icon: LucideIcon;
  technologies: string[];
  metrics: string;
  /** Shown on the home page; the rest live on /work */
  featured?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    title: "LA Window",
    slug: "la-window",
    description:
      "A free renter's lookup for any address in the City of LA — rent-escrow status, complaint history, evictions and likely rent-stabilization coverage over a 3D city map. Built so that missing records read as “never inspected” rather than a clean bill of health, since LA inspects only ~12% of its parcels.",
    category: "Product",
    icon: Building2,
    technologies: ["React 19", "TypeScript", "FastAPI", "MapLibre GL", "PMTiles", "Socrata / ArcGIS"],
    metrics: "1.03M parcels searchable, 84,705 buildings in 3D, $0/month to run",
    featured: true,
    caseStudy: {
      meta: [
        { label: "Year", value: "2026" },
        { label: "Role", value: "Product, data & engineering" },
        { label: "Scope", value: "Frontend, backend, data pipeline" },
        { label: "Built", value: "Solo" },
      ],
      sections: [
        {
          label: "The mission",
          statement: "Put everything the public record knows about an LA rental on one page, for free.",
          body: [
            "Before signing a lease, almost nothing a renter needs is in the listing. Los Angeles publishes it — habitability complaints, escrow cases, eviction notices, permits, seismic retrofit status — but it is split across eleven datasets on two unrelated platforms and keyed by three different parcel identifiers.",
            "LA Window resolves an address to a parcel once, bridges the city's parcel id to the county's, and renders the whole record as one profile over a full-bleed city map.",
          ],
        },
        {
          label: "The hard part",
          statement: "Missing records are not a clean bill of health.",
          body: [
            "The tool began as a port of a San Francisco build that started every building at 100 and deducted for violations. That model is quietly wrong in LA: enforcement data covers about 123,000 of the city's 1.03 million parcels, so for most buildings a clean record means the city has never looked.",
            "Ported as written, it would have printed a perfect score for roughly 88% of the city on no evidence at all. I inverted the burden of proof instead. Below an evidence threshold the app refuses to score and says plainly why; above it, the ceiling a building can reach is capped by how much evidence exists. A thin record cannot earn a 100.",
          ],
        },
        {
          label: "The signal",
          statement: "One public record is louder than any score.",
          body: [
            "Under the Rent Escrow Account Program, when a landlord leaves habitability violations uncorrected through inspection, citation and hearing, the city authorizes tenants to pay rent into escrow instead of to the landlord. About 9,600 parcels have ever entered REAP and roughly 3,600 are open today.",
            "It reads as the loudest fact on any building that has it — placed above the numeric score rather than folded into it.",
          ],
        },
        {
          label: "The constraint",
          statement: "$0 to run, permanently.",
          body: [
            "A paywall would defeat the point, so the running cost had to start at zero and stay there. Geocoding runs on the city's own address points with the US Census as fallback, parcels come from the county assessor's ArcGIS layer, housing records from Socrata, tiles from CARTO, and street imagery from Mapillary — chosen over Google's Street View Static API precisely because it needs no billing account.",
            "The one paid dependency in the original stack was designed out rather than budgeted for.",
          ],
        },
        {
          label: "At city scale",
          statement: "84,705 buildings, extruded, in 5.2 MB.",
          body: [
            "Building footprints are extruded to their surveyed heights from a self-hosted PMTiles archive, so the 3D flyover needs no paid tile provider. Heights come from LA County's own aerial survey rather than the global dataset the SF build used — more authoritative locally, and free of the non-commercial licence that would have travelled with every tileset derived from it.",
          ],
        },
      ],
      highlights: [
        "Eleven public datasets across two platforms, unified behind one parcel key",
        "Declines to score ~88% of parcels on purpose, and explains the refusal in plain language",
        "REAP escrow status surfaced above the score — the strongest signal the city publishes",
        "No paid geocoder, no tile billing, no per-request pricing anywhere in the stack",
        "Choropleth shaded by real dwelling-unit density across all 114 LA neighborhoods",
        "Crime, 311 and transit data deliberately excluded — no usable per-building habitability signal",
      ],
    },
  },
  {
    title: "Academic Performance Insights",
    slug: "academic-performance-insights",
    description:
      "Comprehensive Tableau dashboard analyzing student performance patterns across USC Mann School programs, identifying key success factors and intervention opportunities.",
    category: "Analytics",
    icon: BarChart3,
    technologies: ["Tableau", "SQL", "Python", "Salesforce"],
    metrics: "Improved student success rate by 25%",
    featured: true,
  },
  {
    title: "Tweet Analyzer (LLM + Streamlit)",
    slug: "tweet-analyzer",
    description:
      "AI-powered sentiment analysis tool using Large Language Models to analyze Twitter data, built with Streamlit for real-time insights and trend detection.",
    category: "Product",
    icon: Bot,
    technologies: ["Streamlit", "Python", "OpenAI API", "NLP"],
    metrics: "Processed 10K+ tweets with 92% accuracy",
    featured: true,
  },
  {
    title: "AACP Survey Dashboards",
    slug: "aacp-survey-dashboards",
    description:
      "Multi-dimensional survey analysis platform for the American Association of Colleges of Pharmacy, providing actionable insights for academic decision-making.",
    category: "Analytics",
    icon: TestTube,
    technologies: ["Tableau", "R", "Survey Analytics", "Statistical Modeling"],
    metrics: "Analyzed 5K+ survey responses across 50+ institutions",
    featured: true,
  },
  {
    title: "10-min Delivery Model (QuickServe)",
    slug: "quickserve-delivery-model",
    description:
      "Optimization model for ultra-fast delivery services, analyzing route efficiency, demand patterns, and resource allocation for urban logistics.",
    category: "Analytics",
    icon: Zap,
    technologies: ["Python", "Optimization", "Geospatial Analysis", "Machine Learning"],
    metrics: "Reduced delivery time by 40% in pilot program",
  },
  {
    title: "Daily Competitive Intel Agent",
    slug: "competitive-intel-agent",
    description:
      "Automated intelligence gathering system using n8n workflows and Slack integration to track competitor activities and market trends for strategic insights.",
    category: "Automation",
    icon: Brain,
    technologies: ["n8n", "Slack API", "Web Scraping", "Python", "Automation"],
    metrics: "Monitors 20+ competitors, saves 10 hours/week",
    featured: true,
  },
];

export const categories = ["All", "Analytics", "Product", "Automation"];

export const featuredProjects = projects.filter((p) => p.featured);

export const findProjectBySlug = (slug?: string) =>
  projects.find((p) => p.slug === slug) ?? null;
