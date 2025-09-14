import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Building2, 
  Database, 
  Lightbulb, 
  Bot, 
  Navigation, 
  TestTube 
} from "lucide-react";

const Framework = () => {
  const frameworkItems = [
    {
      letter: "R",
      title: "Rapid Analysis",
      description: "Quick data assessment and pattern recognition to identify key insights and opportunities.",
      icon: <Zap className="h-6 w-6" />,
      color: "text-cardinal"
    },
    {
      letter: "A",
      title: "Architecture & Design",
      description: "Structured approach to system design and technical solution architecture.",
      icon: <Building2 className="h-6 w-6" />,
      color: "text-usc-gold"
    },
    {
      letter: "D",
      title: "Data Modeling & Dashboards",
      description: "Creating robust data models and intuitive visualization dashboards.",
      icon: <Database className="h-6 w-6" />,
      color: "text-cardinal"
    },
    {
      letter: "I",
      title: "Insights & Iteration",
      description: "Extracting actionable insights and continuously improving solutions.",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "text-usc-gold"
    },
    {
      letter: "A",
      title: "Automation",
      description: "Streamlining workflows through intelligent automation and optimization.",
      icon: <Bot className="h-6 w-6" />,
      color: "text-cardinal"
    },
    {
      letter: "N",
      title: "Navigation Experience (UX)",
      description: "Designing intuitive user experiences and seamless navigation flows.",
      icon: <Navigation className="h-6 w-6" />,
      color: "text-usc-gold"
    },
    {
      letter: "T",
      title: "Testing & QA",
      description: "Comprehensive testing strategies to ensure quality and reliability.",
      icon: <TestTube className="h-6 w-6" />,
      color: "text-cardinal"
    }
  ];

  return (
    <section id="framework" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-garamond font-bold text-foreground mb-6">
              My Framework: <span className="bg-gradient-to-r from-cardinal to-usc-gold bg-clip-text text-transparent">RADIANT</span>
            </h2>
            <div className="ornate-divider w-32 mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I developed RADIANT to guide my workflow—balancing design, data, and user empathy. 
              Whether I'm QA testing a Tableau dashboard or automating Excel workflows, I rely on 
              this process to create scalable, impactful tools.
            </p>
          </div>

          {/* Framework Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {frameworkItems.map((item, index) => (
              <Card 
                key={index} 
                className="group luxury-card hover:shadow-2xl smooth-transition cursor-pointer border-2 hover:border-usc-gold/40 greek-key-border"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cardinal via-deep-cardinal to-cardinal flex items-center justify-center text-white font-garamond font-bold text-xl shadow-lg animate-versace-pulse">
                      {item.letter}
                    </div>
                    <div className={`${item.color} p-2 rounded-lg bg-gradient-to-br from-usc-gold/10 to-cardinal/5`}>
                      {item.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-garamond group-hover:bg-gradient-to-r group-hover:from-cardinal group-hover:to-usc-gold group-hover:bg-clip-text group-hover:text-transparent smooth-transition">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* RADIANT Acronym Display */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cardinal via-usc-gold to-cardinal p-8 rounded-2xl shadow-2xl versace-glow luxury-card">
              {frameworkItems.map((item, index) => (
                <span 
                  key={index}
                  className="text-4xl font-garamond font-bold text-white animate-versace-pulse"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {item.letter}
                  {index < frameworkItems.length - 1 && (
                    <span className="text-white/60 mx-2 text-2xl">◆</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Framework;