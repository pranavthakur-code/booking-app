import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, MessageCircle, Calendar, Shield, Clock, Award } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-healthcare-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-healthcare-green animate-pulse" />
              <span className="text-sm font-medium text-primary">
                24/7 Healthcare Support
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Health,{" "}
              <span className="text-gradient">Our Priority</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Connect with top doctors instantly. Get AI-powered symptom analysis
              and personalized medicine recommendations from the comfort of your home.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/symptoms" className="gap-3">
                  <MessageCircle className="w-5 h-5" />
                  Check Symptoms
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/doctors" className="gap-3">
                  <Search className="w-5 h-5" />
                  Find Doctors
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-healthcare-green-light">
                  <Shield className="w-5 h-5 text-healthcare-green" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">100% Secure</p>
                  <p className="text-xs text-muted-foreground">Private & Safe</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-healthcare-blue-light">
                  <Clock className="w-5 h-5 text-healthcare-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Quick Response</p>
                  <p className="text-xs text-muted-foreground">Under 5 mins</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-healthcare-orange-light">
                  <Award className="w-5 h-5 text-healthcare-orange" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Verified Doctors</p>
                  <p className="text-xs text-muted-foreground">500+ Experts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative lg:pl-12">
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard
                icon={<MessageCircle className="w-6 h-6" />}
                title="AI Symptom Checker"
                description="Describe your symptoms and get instant analysis with medicine recommendations"
                color="primary"
                delay="0"
              />
              <FeatureCard
                icon={<Search className="w-6 h-6" />}
                title="Find Specialists"
                description="Search from 500+ verified doctors across all specialties"
                color="blue"
                delay="100"
              />
              <FeatureCard
                icon={<Calendar className="w-6 h-6" />}
                title="Book Appointments"
                description="Schedule consultations with your preferred doctors easily"
                color="orange"
                delay="200"
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6" />}
                title="Secure & Private"
                description="Your health data is encrypted and completely confidential"
                color="green"
                delay="300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "blue" | "orange" | "green";
  delay: string;
}

const FeatureCard = ({ icon, title, description, color, delay }: FeatureCardProps) => {
  const colorClasses = {
    primary: "bg-healthcare-teal-light text-primary",
    blue: "bg-healthcare-blue-light text-healthcare-blue",
    orange: "bg-healthcare-orange-light text-healthcare-orange",
    green: "bg-healthcare-green-light text-healthcare-green",
  };

  return (
    <div
      className="gradient-card p-6 rounded-2xl border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`p-3 rounded-xl w-fit mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default HeroSection;
