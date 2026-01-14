import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DoctorCard from "@/components/DoctorCard";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { doctors } from "@/data/doctors";
import { ArrowRight, MessageCircle, Users, Calendar, Heart } from "lucide-react";

const Index = () => {
  const featuredDoctors = doctors.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Upcoming Appointments - Only shows when there are appointments */}
      <UpcomingAppointments />

      {/* Stats Section */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<Users />} value="500+" label="Expert Doctors" />
            <StatCard icon={<Calendar />} value="50K+" label="Appointments" />
            <StatCard icon={<MessageCircle />} value="100K+" label="Consultations" />
            <StatCard icon={<Heart />} value="98%" label="Patient Satisfaction" />
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Top Rated <span className="text-gradient">Doctors</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Connect with our highly rated healthcare professionals
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/doctors" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="hero" asChild>
              <Link to="/doctors" className="gap-2">
                View All Doctors <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Not Sure About Your Symptoms?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI-powered symptom checker can help you understand your health
              concerns and suggest appropriate medicines or when to see a doctor.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/symptoms" className="gap-3">
                <MessageCircle className="w-5 h-5" />
                Start Symptom Check
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl gradient-primary">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">SpeedyDoc</span>
            </div>
            <p className="text-sm text-primary-foreground/60">
              © 2024 SpeedyDoc. All rights reserved. For informational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <div className="text-center text-primary-foreground">
    <div className="inline-flex p-3 rounded-xl bg-primary-foreground/10 mb-3">
      {icon}
    </div>
    <p className="text-3xl md:text-4xl font-bold">{value}</p>
    <p className="text-sm text-primary-foreground/80">{label}</p>
  </div>
);

export default Index;
