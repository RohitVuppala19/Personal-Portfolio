import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, BarChart3, Bot, TestTube, Globe, Zap, Brain } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Analytics", "Product", "Automation"];

  const projects = [
    {
      title: "Academic Performance Insights",
      description: "Comprehensive Tableau dashboard analyzing student performance patterns across USC Mann School programs, identifying key success factors and intervention opportunities.",
      category: "Analytics",
      icon: <BarChart3 className="h-6 w-6" />,
      technologies: ["Tableau", "SQL", "Python", "Salesforce"],
      features: ["Interactive Dashboards", "Predictive Analytics", "Automated Reports"],
      metrics: "Improved student success rate by 25%",
      color: "cardinal"
    },
    {
      title: "Tweet Analyzer (LLM + Streamlit)",
      description: "AI-powered sentiment analysis tool using Large Language Models to analyze Twitter data, built with Streamlit for real-time insights and trend detection.",
      category: "Product",
      icon: <Bot className="h-6 w-6" />,
      technologies: ["Streamlit", "Python", "OpenAI API", "NLP"],
      features: ["Real-time Analysis", "Sentiment Scoring", "Trend Visualization"],
      metrics: "Processed 10K+ tweets with 92% accuracy",
      color: "usc-gold"
    },
    {
      title: "AACP Survey Dashboards",
      description: "Multi-dimensional survey analysis platform for the American Association of Colleges of Pharmacy, providing actionable insights for academic decision-making.",
      category: "Analytics",
      icon: <TestTube className="h-6 w-6" />,
      technologies: ["Tableau", "R", "Survey Analytics", "Statistical Modeling"],
      features: ["Statistical Analysis", "Custom Visualizations", "Automated Reporting"],
      metrics: "Analyzed 5K+ survey responses across 50+ institutions",
      color: "cardinal"
    },
    {
      title: "Visa Sponsorship Filter for LinkedIn",
      description: "Chrome extension helping international students efficiently filter LinkedIn job postings by visa sponsorship availability, streamlining the job search process.",
      category: "Product",
      icon: <Globe className="h-6 w-6" />,
      technologies: ["JavaScript", "Chrome API", "LinkedIn API", "Web Scraping"],
      features: ["Browser Extension", "Real-time Filtering", "Job Alerts"],
      metrics: "2K+ active users, 4.8★ rating",
      color: "usc-gold"
    },
    {
      title: "10-min Delivery Model (QuickServe)",
      description: "Optimization model for ultra-fast delivery services, analyzing route efficiency, demand patterns, and resource allocation for urban logistics.",
      category: "Analytics",
      icon: <Zap className="h-6 w-6" />,
      technologies: ["Python", "Optimization", "Geospatial Analysis", "Machine Learning"],
      features: ["Route Optimization", "Demand Forecasting", "Performance Metrics"],
      metrics: "Reduced delivery time by 40% in pilot program",
      color: "cardinal"
    },
    {
      title: "Daily Competitive Intel Agent",
      description: "Automated intelligence gathering system using n8n workflows and Slack integration to track competitor activities and market trends for strategic insights.",
      category: "Automation",
      icon: <Brain className="h-6 w-6" />,
      technologies: ["n8n", "Slack API", "Web Scraping", "Python", "Automation"],
      features: ["Automated Monitoring", "Slack Integration", "Custom Alerts"],
      metrics: "Monitors 20+ competitors, saves 10 hours/week",
      color: "usc-gold"
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-garamond font-bold text-foreground mb-6">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cardinal to-usc-gold mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of data-driven solutions, automation tools, and product innovations 
              that have delivered measurable impact across academic and industry settings.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={activeFilter === filter ? "cardinal" : "outline"}
                className="rounded-full px-6"
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl smooth-transition cursor-pointer border-l-4 border-l-cardinal hover:border-l-usc-gold"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg ${project.color === 'cardinal' ? 'bg-cardinal/10 text-cardinal' : 'bg-usc-gold/10 text-usc-gold'}`}>
                      {project.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="font-garamond text-xl group-hover:text-cardinal smooth-transition">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-cardinal rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact Metric */}
                  <div className={`p-3 rounded-lg ${project.color === 'cardinal' ? 'bg-cardinal/5' : 'bg-usc-gold/5'} border-l-2 ${project.color === 'cardinal' ? 'border-l-cardinal' : 'border-l-usc-gold'}`}>
                    <p className="text-sm font-medium text-foreground">{project.metrics}</p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="text-xs border-muted hover:border-cardinal"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;