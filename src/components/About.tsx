import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Users } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: <GraduationCap className="h-8 w-8 text-cardinal" />,
      title: "Education",
      value: "Master of Engineering Management",
      subtitle: "USC Viterbi School",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-usc-gold" />,
      title: "Experience",
      value: "3+ Years",
      subtitle: "Data & Product Analytics",
    },
    {
      icon: <Users className="h-8 w-8 text-cardinal" />,
      title: "Impact",
      value: "15+ Projects",
      subtitle: "Cross-functional Leadership",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-garamond font-bold text-foreground mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cardinal to-usc-gold mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-garamond font-bold text-cardinal mb-4">
                My Journey in Building with Purpose
              </h3>
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="mb-6 leading-relaxed">
                  I'm a USC Master's student in Engineering Management, currently a Data Analyst & 
                  Salesforce QA Analyst at the USC Mann School of Pharmacy. I build dashboards, 
                  streamline data pipelines, and help academic teams make smarter decisions.
                </p>
                <p className="leading-relaxed">
                  Beyond data, I facilitate education workshops with CARE-SC and previously worked 
                  at ADP and Karsun Solutions in full-stack and product roles. My passion lies in 
                  transforming complex data into actionable insights that drive meaningful impact.
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl smooth-transition">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-muted rounded-lg">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                        <h4 className="text-xl font-garamond font-bold text-foreground">
                          {stat.value}
                        </h4>
                        <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;