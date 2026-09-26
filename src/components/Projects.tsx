import { Link } from "react-router-dom";
import ProjectGrid from "@/components/ProjectGrid";
import { featuredProjects, projects } from "@/data/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12">
      <div data-reveal className="flex justify-between mb-16 md:mb-20">
        <span className="font-manrope text-sm text-foreground">(Selected work)</span>
        <div className="flex items-center gap-4">
          <span className="font-manrope text-sm text-muted-foreground">(Featured Projects)</span>
          <Link
            to="/work"
            className="font-manrope text-sm text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            View all ({projects.length})
          </Link>
        </div>
      </div>

      <ProjectGrid projects={featuredProjects} />
    </section>
  );
};

export default Projects;
