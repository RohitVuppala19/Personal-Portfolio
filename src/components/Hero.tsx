import { Button } from "@/components/ui/button";
import { Download, ArrowDown } from "lucide-react";
import heroBackground from "@/assets/usc-hero-bg.jpg";

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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cardinal/90 via-deep-cardinal/85 to-usc-gold/20" />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-usc-gold via-warm-gold to-secondary p-1">
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                  <div className="text-6xl font-garamond text-cardinal font-bold">RV</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-usc-gold/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cardinal/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left order-1 lg:order-2 text-white">
            <p className="text-usc-gold font-medium mb-4 tracking-wide">Hello, I'm</p>
            <h1 className="text-5xl lg:text-7xl font-garamond font-bold mb-6 leading-tight">
              Rohit Vuppala
            </h1>
            <h2 className="text-xl lg:text-2xl text-gray-200 mb-6 font-lato">
              USC Engineering Management | Data & Product Analyst
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Building data tools and product workflows that drive real-world decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToProjects}
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-6 rounded-full font-medium shadow-xl hover:shadow-2xl bounce-transition"
              >
                View Projects
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={downloadResume}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-full font-medium border-2 border-white text-white hover:bg-white hover:text-cardinal shadow-xl hover:shadow-2xl bounce-transition"
              >
                Download Resume
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;