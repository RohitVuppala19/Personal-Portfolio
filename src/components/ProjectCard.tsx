import type { Project } from "@/data/projects";

const ProjectCard = ({ project, onOpen }: { project: Project; onOpen?: () => void }) => {
  const Icon = project.icon;

  return (
    // A button rather than a div with a click handler, so the whole card is
    // reachable by keyboard and announced as activatable. `text-left` undoes the
    // centring buttons default to.
    <button
      type="button"
      onClick={onOpen}
      data-reveal
      className="group block w-full text-left focus-visible:outline-none"
    >
      <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-muted">
        <div className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <Icon className="h-12 w-12 text-foreground/15" strokeWidth={1.25} />
        </div>
        <div className="absolute bottom-3 right-3 rounded-full border border-border bg-background/80 px-3 py-1 font-manrope text-xs text-muted-foreground backdrop-blur-sm">
          {project.category}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-manrope text-lg text-foreground underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-foreground group-focus-visible:decoration-foreground">
          {project.title}
        </h3>

        <p className="font-manrope text-sm font-light leading-relaxed text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        <p className="font-taviraj text-base font-light italic leading-snug text-foreground">
          {project.metrics}
        </p>

        <div className="flex gap-4 pt-1">
          <span className="shrink-0 font-manrope text-xs text-muted-foreground/60">(stack)</span>
          <p className="font-manrope text-xs font-light leading-relaxed text-muted-foreground">
            {project.technologies.join(", ")}
          </p>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
