import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectGrid from "@/components/ProjectGrid";
import { cn } from "@/lib/utils";
import { projects, categories } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  useScrollReveal();

  // Arriving from the home page's "View All" should start at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="px-4 pt-28 sm:px-6 md:px-8 md:pt-36 lg:px-12">
        <div className="flex justify-between mb-4">
          <Link
            to="/"
            className="group flex items-center gap-2 font-manrope text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </Link>
          <span className="font-manrope text-sm text-muted-foreground">
            (All work — {projects.length})
          </span>
        </div>

        {/* Category filters */}
        <div className="mb-16 flex flex-wrap items-baseline gap-x-3 gap-y-2 md:mb-20">
          {categories.map((category, i) => {
            const count =
              category === "All"
                ? projects.length
                : projects.filter((p) => p.category === category).length;
            const active = activeFilter === category;

            return (
              <span key={category} className="inline-flex items-baseline">
                {i > 0 && (
                  <span className="mr-3 font-taviraj italic text-2xl text-muted-foreground/30 sm:text-3xl md:text-4xl">
                    —
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={cn(
                    "font-taviraj italic tracking-tight text-2xl transition-colors duration-300 sm:text-3xl md:text-4xl lg:text-5xl",
                    active ? "text-foreground" : "text-muted-foreground/40 hover:text-foreground"
                  )}
                >
                  {category}
                  <sup className="ml-1 align-super font-manrope text-sm not-italic text-muted-foreground">
                    ({count})
                  </sup>
                </button>
              </span>
            );
          })}
        </div>

        {/* Full grid */}
        <ProjectGrid projects={filtered} className="pb-16 md:pb-24" />
      </main>
      <Footer />
    </div>
  );
};

export default Work;
