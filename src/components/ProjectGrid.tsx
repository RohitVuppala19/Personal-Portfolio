import { useLocation, useNavigate } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

/**
 * The project grid. Opening a card is a navigation, not local state: the write-up
 * lives at /project/:slug so it can be linked to and dismissed with Back.
 *
 * The page underneath is passed along as `background`, which keeps whichever
 * page the visitor was on rendered behind the modal (see App.tsx).
 */
const ProjectGrid = ({ projects, className }: { projects: Project[]; className?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-x-10 md:gap-y-20",
        className
      )}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          onOpen={() =>
            navigate(`/project/${project.slug}`, { state: { background: location } })
          }
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
