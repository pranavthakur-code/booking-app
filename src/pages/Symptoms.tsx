import Navbar from "@/components/Navbar";
import SymptomChatbot from "@/components/SymptomChatbot";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pill, Stethoscope, Shield, Clock, Search } from "lucide-react";

const Symptoms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  AI <span className="text-gradient">Symptom Checker</span>
                </h1>
                <p className="text-muted-foreground">
                  Get instant health guidance powered by AI. Describe your symptoms
                  and receive personalized recommendations.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <FeatureItem
                  icon={<Pill className="w-5 h-5" />}
                  title="Medicine Suggestions"
                  description="Get over-the-counter medicine recommendations"
                  color="primary"
                />
                <FeatureItem
                  icon={<Stethoscope className="w-5 h-5" />}
                  title="Symptom Analysis"
                  description="AI-powered analysis of your symptoms"
                  color="blue"
                />
                <FeatureItem
                  icon={<Shield className="w-5 h-5" />}
                  title="Privacy First"
                  description="Your health data is secure and private"
                  color="green"
                />
                <FeatureItem
                  icon={<Clock className="w-5 h-5" />}
                  title="Instant Response"
                  description="Get immediate health guidance 24/7"
                  color="orange"
                />
              </div>

              {/* CTA */}
              <div className="p-6 gradient-card rounded-2xl border border-border">
                <h3 className="font-semibold text-foreground mb-2">
                  Need Professional Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with verified doctors for personalized consultation.
                </p>
                <Button variant="hero" asChild className="w-full">
                  <Link to="/doctors" className="gap-2">
                    <Search className="w-4 h-4" />
                    Find a Doctor
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Chatbot */}
            <div className="lg:col-span-2">
              <SymptomChatbot />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "blue" | "green" | "orange";
}

const FeatureItem = ({ icon, title, description, color }: FeatureItemProps) => {
  const colorClasses = {
    primary: "bg-healthcare-teal-light text-primary",
    blue: "bg-healthcare-blue-light text-healthcare-blue",
    green: "bg-healthcare-green-light text-healthcare-green",
    orange: "bg-healthcare-orange-light text-healthcare-orange",
  };

  return (
    <div className="flex items-start gap-4">
      <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>{icon}</div>
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Symptoms;
