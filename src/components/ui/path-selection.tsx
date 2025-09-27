import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { ArrowRight, Code, Users, HelpCircle } from "lucide-react";
import technicalIcon from "@/assets/technical-icon.png";
import nonTechnicalIcon from "@/assets/non-technical-icon.png";
import assessmentIcon from "@/assets/assessment-icon.png";

interface PathSelectionProps {
  onSelectPath: (path: 'technical' | 'non-technical' | 'assessment') => void;
}

export function PathSelection({ onSelectPath }: PathSelectionProps) {
  const paths = [
    {
      id: 'technical' as const,
      title: 'Technical Path',
      description: 'Perfect for students with coding skills who want to build tech startups',
      icon: technicalIcon,
      iconFallback: <Code className="w-12 h-12" />,
      features: ['AI-powered roadmaps', 'Technical skill development', 'Product building guides'],
      gradient: 'bg-gradient-primary',
    },
    {
      id: 'non-technical' as const,
      title: 'Business Path',
      description: 'Ideal for students focused on business strategy, marketing, and operations',
      icon: nonTechnicalIcon,
      iconFallback: <Users className="w-12 h-12" />,
      features: ['Business strategy', 'Marketing expertise', 'Leadership skills'],
      gradient: 'bg-gradient-secondary',
    },
    {
      id: 'assessment' as const,
      title: 'Find My Path',
      description: 'Not sure which path fits you? Take our assessment to discover your strengths',
      icon: assessmentIcon,
      iconFallback: <HelpCircle className="w-12 h-12" />,
      features: ['Skill assessment', 'Personalized recommendations', 'Career guidance'],
      gradient: 'bg-gradient-card',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Entrepreneurial Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every entrepreneur is unique. Select the path that aligns with your skills and interests, 
            or let our assessment guide you to the perfect starting point.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paths.map((path) => (
            <Card 
              key={path.id} 
              className="relative overflow-hidden hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <img 
                    src={path.icon} 
                    alt={`${path.title} icon`}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden text-white">
                    {path.iconFallback}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {path.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {path.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {path.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => onSelectPath(path.id)}
                  variant={path.id === 'assessment' ? 'gradient' : 'default'}
                  className="w-full group"
                >
                  {path.id === 'assessment' ? 'Take Assessment' : 'Choose Path'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}