import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Code, 
  Database, 
  MessageSquare,
  Palette,
  Settings,
  Users,
  FileText
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Analytics & Product Tools",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "cardinal",
      skills: [
        { name: "Tableau", level: 90 },
        { name: "Salesforce", level: 85 },
        { name: "Power Query", level: 80 },
        { name: "Figma", level: 75 },
        { name: "Miro", level: 70 }
      ]
    },
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      color: "usc-gold",
      skills: [
        { name: "SQL (DuckDB, MySQL)", level: 95 },
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "R", level: 70 },
      ]
    },
    {
      title: "Platforms & Tools",
      icon: <Settings className="h-6 w-6" />,
      color: "cardinal",
      skills: [
        { name: "Jira", level: 90 },
        { name: "Confluence", level: 85 },
        { name: "Streamlit", level: 80 },
        { name: "Selenium", level: 75 },
      ]
    },
    {
      title: "Soft Skills",
      icon: <Users className="h-6 w-6" />,
      color: "usc-gold",
      skills: [
        { name: "Public Speaking", level: 95 },
        { name: "QA Documentation", level: 90 },
        { name: "Stakeholder Alignment", level: 88 },
        { name: "Team Leadership", level: 85 },
      ]
    }
  ];

  const certifications = [
    "Tableau Desktop Specialist",
    "Salesforce Admin Certified",
    "Agile Project Management",
    "Google Analytics Certified",
    "Python Data Analysis",
    "USC Leadership Certificate"
  ];

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-garamond font-bold text-foreground mb-6">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cardinal to-usc-gold mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit spanning analytics, development, and leadership—developed through 
              hands-on experience across academic and industry environments.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl smooth-transition">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color === 'cardinal' ? 'bg-cardinal/10 text-cardinal' : 'bg-usc-gold/10 text-usc-gold'}`}>
                      {category.icon}
                    </div>
                    <span className="font-garamond">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className={`h-2 ${category.color === 'cardinal' ? '[&>div]:bg-cardinal' : '[&>div]:bg-usc-gold'}`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications & Achievements */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cardinal to-usc-gold text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="font-garamond">Certifications & Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {certifications.map((cert, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="justify-center py-2 px-4 bg-gradient-to-r from-cardinal/10 to-usc-gold/10 hover:from-cardinal/20 hover:to-usc-gold/20 border-none text-foreground"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;