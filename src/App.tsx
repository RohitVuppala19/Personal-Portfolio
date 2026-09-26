import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, type Location } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import ProjectRoute from "@/components/ProjectRoute";
import Index from "./pages/Index";
import Work from "./pages/Work";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Project write-ups are modal routes: /project/:slug renders over whichever page
 * the visitor was already on, which arrives in location state as `background`.
 * Landing on one of those URLs cold has no background, so the home page stands
 * in — the modal is never the whole page.
 */
const AppRoutes = () => {
  const location = useLocation();
  const background = (location.state as { background?: Location } | null)?.background;

  return (
    <>
      <Routes location={background ?? location}>
        <Route path="/" element={<Index />} />
        <Route path="/work" element={<Work />} />
        <Route path="/project/:slug" element={<Index />} />
        <Route path="/project/:slug/full" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ProjectRoute />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="rohit-portfolio-theme">
      <TooltipProvider>
        <CustomCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
