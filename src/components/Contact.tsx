import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Linkedin, Download, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission logic
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "rohitvuppala99@gmail.com",
      href: "mailto:rohitvuppala99@gmail.com",
      color: "cardinal"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/rohitvuppala",
      href: "https://linkedin.com/in/rohitvuppala",
      color: "usc-gold"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Los Angeles, CA",
      href: null,
      color: "cardinal"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Available for",
      value: "Full-time opportunities",
      href: null,
      color: "usc-gold"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-garamond font-bold text-foreground mb-6">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cardinal to-usc-gold mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to collaborate on your next data-driven project? Let's discuss how we can 
              create impactful solutions together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-garamond text-2xl text-cardinal">
                  Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="border-2 focus:border-cardinal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="border-2 focus:border-cardinal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      required
                      className="border-2 focus:border-cardinal resize-none"
                    />
                  </div>
                  <Button type="submit" variant="cardinal" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-garamond text-2xl text-cardinal">
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${info.color === 'cardinal' ? 'bg-cardinal/10 text-cardinal' : 'bg-usc-gold/10 text-usc-gold'}`}>
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground font-medium">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-cardinal smooth-transition"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Resume Download */}
              <Card className="shadow-lg border-2 border-dashed border-cardinal/20 hover:border-cardinal/40 smooth-transition">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cardinal to-usc-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-garamond font-bold text-foreground mb-2">
                    Download My Resume
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Get a comprehensive overview of my experience and qualifications.
                  </p>
                  <Button variant="outline" size="lg" className="border-2 border-cardinal text-cardinal hover:bg-cardinal hover:text-white">
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* USC Footer */}
      <div className="mt-24 border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg font-garamond text-cardinal font-semibold">
              Proud Trojan | USC Mann School of Pharmacy | Fight On ✌️
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              © 2024 Rohit Vuppala. Built with React, TypeScript & USC Pride.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;