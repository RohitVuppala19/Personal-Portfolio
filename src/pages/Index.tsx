import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  useScrollReveal();
  const { hash } = useLocation();

  // Arriving as /#about from another route: scroll once the sections exist.
  useEffect(() => {
    if (!hash) return;
    const id = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(id);
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
