import { Button } from "@/components/ui/button";
import { Download, ArrowDown } from "lucide-react";
import versaceBackground from "@/assets/versace-usc-bg.jpg";

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadResume = () => {
    // Placeholder for resume download functionality
    console.log("Downloading resume...");
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden versace-hero">
      {/* Versace-USC Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${versaceBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cardinal/85 via-deep-cardinal/80 to-usc-gold/15" />
        {/* Luxury overlay pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-usc-gold/10 to-transparent animate-luxury-glow"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image with Greek Key Border */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-usc-gold via-warm-gold to-secondary p-2 greek-key-border animate-versace-pulse">
                <div className="w-full h-full rounded-full bg-card/95 backdrop-blur-sm flex items-center justify-center luxury-card">
                  <div className="text-6xl font-garamond text-cardinal font-bold tracking-wider">RV</div>
                </div>
              </div>
              {/* Ornate decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-usc-gold/30 to-cardinal/20 rounded-full blur-2xl animate-luxury-glow"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-cardinal/25 to-usc-gold/15 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Greek key corner decorations */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-usc-gold"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-cardinal"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-cardinal"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-usc-gold"></div>
            </div>
          </div>

          {/* Hero Content with Luxury Styling */}
          <div className="text-center lg:text-left order-1 lg:order-2 text-white">
            <div className="relative">
              <p className="text-usc-gold font-medium mb-4 tracking-[0.3em] uppercase text-sm animate-fade-in">
                Hello, I'm
              </p>
              <h1 className="text-5xl lg:text-7xl font-garamond font-bold mb-6 leading-tight bg-gradient-to-r from-white via-usc-gold to-white bg-clip-text text-transparent animate-scale-in">
                Rohit Vuppala
              </h1>
              <div className="ornate-divider w-32 mx-auto lg:mx-0 mb-6"></div>
              <h2 className="text-xl lg:text-2xl text-gray-200 mb-6 font-lato tracking-wide">
                USC Engineering Management | Data & Product Analyst
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
                Building data tools and product workflows that drive real-world decisions.
              </p>

              {/* Luxury CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button
                  onClick={scrollToProjects}
                  variant="gold"
                  size="xl"
                  className="text-lg px-10 py-7 rounded-full font-medium shadow-2xl hover:shadow-luxury versace-glow bounce-transition relative overflow-hidden group"
                >
                  <span className="relative z-10">View Projects</span>
                  <ArrowDown className="ml-3 h-6 w-6 relative z-10 group-hover:animate-bounce" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cardinal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
                <Button
                  onClick={downloadResume}
                  variant="outline"
                  size="xl"
                  className="text-lg px-10 py-7 rounded-full font-medium border-2 border-usc-gold/80 text-usc-gold hover:bg-usc-gold hover:text-foreground shadow-2xl hover:shadow-versace bounce-transition backdrop-blur-sm bg-white/5"
                >
                  <span className="relative z-10">Download Resume</span>
                  <Download className="ml-3 h-6 w-6 relative z-10" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Ornate Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="w-1 h-8 bg-gradient-to-b from-usc-gold to-transparent rounded-full"></div>
            <ArrowDown className="h-6 w-6 text-usc-gold animate-pulse" />
          </div>
        </div>
      </div>

      {/* Luxury corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-usc-gold/30 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-cardinal/30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-cardinal/30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-usc-gold/30 pointer-events-none"></div>
    </section>
  );
};

export default Hero;