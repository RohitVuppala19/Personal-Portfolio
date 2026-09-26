import { useLocation, useMatch, useNavigate } from "react-router-dom";
import ProjectModal from "@/components/ProjectModal";
import { findProjectBySlug } from "@/data/projects";

/**
 * Turns /project/:slug (and /project/:slug/full) into an open modal.
 *
 * Rendered once, outside <Routes>, so it survives the navigation that closes it
 * — a route-mounted modal would be torn down on the frame the URL changes and
 * lose its exit transition.
 */
const ProjectRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // "/project/x/full" does not match the exact "/project/:slug" pattern, so
  // both are needed.
  const full = useMatch("/project/:slug/full");
  const base = useMatch("/project/:slug");
  const slug = full?.params.slug ?? base?.params.slug;
  const project = findProjectBySlug(slug);

  // Set when the modal was opened from a card; absent when someone landed on
  // the URL directly, in which case there is no history entry to go back to.
  const cameFromPage = Boolean((location.state as { background?: unknown } | null)?.background);

  const close = () => {
    if (cameFromPage) navigate(-1);
    else navigate("/", { replace: true });
  };

  // Replaces rather than pushes, so Back always closes the modal instead of
  // stepping through each fullscreen toggle.
  const toggleFullscreen = () => {
    if (!slug) return;
    navigate(full ? `/project/${slug}` : `/project/${slug}/full`, {
      replace: true,
      state: location.state,
    });
  };

  return (
    <ProjectModal
      project={project}
      fullscreen={Boolean(full)}
      onClose={close}
      onToggleFullscreen={toggleFullscreen}
    />
  );
};

export default ProjectRoute;
