import { Calendar, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppointments, Appointment } from "@/contexts/AppointmentContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface AppointmentCardProps {
  appointment: Appointment;
}

const UpcomingAppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { cancelAppointment } = useAppointments();

  const handleCancel = () => {
    cancelAppointment(appointment.id);
    toast.success("Appointment cancelled successfully");
  };

  return (
    <div className="gradient-card rounded-xl border border-border p-4 shadow-md animate-fade-in">
      <div className="flex items-start gap-4">
        <img
          src={appointment.doctor.image}
          alt={appointment.doctor.name}
          className="w-14 h-14 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-foreground">{appointment.doctor.name}</h4>
              <p className="text-sm text-primary">{appointment.doctor.specialty}</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                  <X className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel your appointment with {appointment.doctor.name}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Cancel Appointment
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(appointment.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{appointment.doctor.hospital}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingAppointments = () => {
  const { getUpcomingAppointments } = useAppointments();
  const upcomingAppointments = getUpcomingAppointments();

  if (upcomingAppointments.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Your <span className="text-gradient">Upcoming Appointments</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingAppointments.map((appointment) => (
            <UpcomingAppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAppointments;
