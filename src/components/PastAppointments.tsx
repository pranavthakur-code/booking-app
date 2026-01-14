import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useAppointments } from "@/contexts/AppointmentContext";

interface PastAppointmentsProps {
  open: boolean;
  onClose: () => void;
}

const PastAppointments = ({ open, onClose }: PastAppointmentsProps) => {
  const { getPastAppointments } = useAppointments();
  const pastAppointments = getPastAppointments();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Previous Appointments
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          {pastAppointments.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No previous appointments</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 rounded-xl border border-border bg-secondary/50"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={appointment.doctor.image}
                      alt={appointment.doctor.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">
                          {appointment.doctor.name}
                        </h4>
                        <Badge
                          variant={appointment.status === "cancelled" ? "destructive" : "secondary"}
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-primary">{appointment.doctor.specialty}</p>
                      
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(appointment.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.doctor.hospital}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{appointment.patientName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PastAppointments;
