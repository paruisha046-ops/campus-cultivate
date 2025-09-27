import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, BookOpen, TrendingUp, Plus, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>;
  }

  const quickActions = [
    {
      title: "Submit New Idea",
      description: "Share your startup idea and get an AI-generated roadmap",
      icon: <Lightbulb className="w-6 h-6" />,
      action: () => navigate('/ideas/new'),
      variant: "hero" as const,
    },
    {
      title: "Connect with Mentors",
      description: "Find experienced mentors in your domain",
      icon: <Users className="w-6 h-6" />,
      action: () => navigate('/connections'),
      variant: "default" as const,
    },
    {
      title: "Learning Resources",
      description: "Access courses and materials for entrepreneurs",
      icon: <BookOpen className="w-6 h-6" />,
      action: () => navigate('/learning'),
      variant: "default" as const,
    },
  ];

  const stats = [
    { label: "Ideas Submitted", value: "3", icon: <Lightbulb className="w-5 h-5" /> },
    { label: "Connections", value: "12", icon: <Users className="w-5 h-5" /> },
    { label: "Courses Completed", value: "5", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Progress Score", value: "85%", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated={true} 
        user={user} 
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue building your entrepreneurial journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-primary transition-all hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  {action.icon}
                </div>
                <CardTitle className="text-foreground">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant={action.variant}
                  onClick={action.action}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Ideas</CardTitle>
              <CardDescription>Your latest startup concepts and roadmaps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "AI-Powered Study Assistant", status: "Roadmap Generated", date: "2 days ago" },
                  { title: "Sustainable Food Delivery", status: "Under Review", date: "1 week ago" },
                  { title: "Student Marketplace", status: "Draft", date: "2 weeks ago" },
                ].map((idea, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{idea.title}</p>
                      <p className="text-sm text-muted-foreground">{idea.status} • {idea.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Connections</CardTitle>
              <CardDescription>Your mentor and peer network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Chen", role: "Tech Entrepreneur", type: "Mentor", status: "Connected" },
                  { name: "Alex Rodriguez", role: "Marketing Expert", type: "Mentor", status: "Pending" },
                  { name: "Maya Patel", role: "Student", type: "Peer", status: "Connected" },
                ].map((connection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{connection.name}</p>
                        <p className="text-sm text-muted-foreground">{connection.role} • {connection.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}