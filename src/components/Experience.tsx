import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "USC Mann School of Pharmacy",
      role: "Data Analyst & Salesforce QA Analyst",
      duration: "2023 - Present",
      location: "Los Angeles, CA",
      description: [
        "Built comprehensive Tableau dashboards for academic performance insights",
        "Implemented Salesforce QA processes, reducing data errors by 40%",
        "Streamlined data pipelines connecting multiple academic systems"
      ],
      technologies: ["Salesforce", "Tableau", "SQL", "Python", "Excel"],
      color: "cardinal"
    },
    {
      company: "CARE-SC",
      role: "Graduate Assistant Facilitator",
      duration: "2023 - Present",
      location: "Los Angeles, CA",
      description: [
        "Facilitate educational workshops for underrepresented communities",
        "Develop curriculum materials and assessment frameworks",
        "Lead outreach initiatives reaching 500+ students annually"
      ],
      technologies: ["Workshop Design", "Curriculum Development", "Community Outreach"],
      color: "usc-gold"
    },
    {
      company: "ADP",
      role: "Full Stack Developer",
      duration: "2021 - 2023",
      location: "Hyderabad, India",
      description: [
        "Developed Python ETL pipelines processing 10M+ records daily",
        "Built interactive HR dashboards using React and D3.js",
        "Optimized database queries, improving performance by 60%"
      ],
      technologies: ["Python", "React", "ETL", "PostgreSQL", "D3.js"],
      color: "cardinal"
    },
    {
      company: "Karsun Solutions",
      role: "Product Intern",
      duration: "2020 - 2021",
      location: "Herndon, VA",
      description: [
        "Led sprint planning and backlog management for 3 development teams",
        "Optimized MySQL database performance and query efficiency",
        "Coordinated cross-functional product development initiatives"
      ],
      technologies: ["MySQL", "Agile", "Product Management", "Jira", "Confluence"],
      color: "usc-gold"
    }
  ];

  return (
    <section id="experience" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-garamond font-bold text-foreground mb-6">
              Experience Timeline
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cardinal to-usc-gold mx-auto mb-8"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cardinal via-usc-gold to-cardinal hidden lg:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-br from-cardinal to-usc-gold rounded-full border-4 border-background shadow-lg hidden lg:block"></div>

                  {/* Experience Card */}
                  <Card className={`lg:ml-20 shadow-lg hover:shadow-xl smooth-transition border-l-4 ${
                    exp.color === 'cardinal' ? 'border-l-cardinal' : 'border-l-usc-gold'
                  }`}>
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Building className={`h-5 w-5 ${exp.color === 'cardinal' ? 'text-cardinal' : 'text-usc-gold'}`} />
                            <h3 className="text-xl font-garamond font-bold text-foreground">
                              {exp.company}
                            </h3>
                          </div>
                          <h4 className={`text-lg font-semibold mb-3 ${exp.color === 'cardinal' ? 'text-cardinal' : 'text-usc-gold'}`}>
                            {exp.role}
                          </h4>
                        </div>
                        <div className="flex flex-col lg:items-end space-y-2">
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">{exp.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-6">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <div className={`w-2 h-2 rounded-full ${exp.color === 'cardinal' ? 'bg-cardinal' : 'bg-usc-gold'} mt-2 flex-shrink-0`}></div>
                            <span className="text-muted-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary" 
                            className={`${exp.color === 'cardinal' ? 'bg-cardinal/10 text-cardinal hover:bg-cardinal/20' : 'bg-usc-gold/10 text-usc-gold hover:bg-usc-gold/20'} border-none`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;