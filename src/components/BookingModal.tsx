import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, CheckCircle2, User, Phone, Mail, QrCode } from "lucide-react";
import { Doctor } from "@/data/doctors";
import { toast } from "sonner";
import { useAppointments } from "@/contexts/AppointmentContext";
import { QRCodeSVG } from "qrcode.react";

interface BookingModalProps {
  doctor: Doctor;
  open: boolean;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const BookingModal = ({ doctor, open, onClose }: BookingModalProps) => {
  const { addAppointment } = useAppointments();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAppointment = addAppointment({
      doctor,
      date: selectedDate,
      time: selectedTime,
      patientName: formData.name,
      patientPhone: formData.phone,
      patientEmail: formData.email,
      reason: formData.reason,
      status: "upcoming",
    });

    setAppointmentId(newAppointment.id);
    setStep(3);
    toast.success("Appointment booked successfully!");
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setAppointmentId("");
    setFormData({ name: "", phone: "", email: "", reason: "" });
    onClose();
  };

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Generate QR code data
  const qrData = JSON.stringify({
    appointmentId,
    doctor: doctor.name,
    specialty: doctor.specialty,
    hospital: doctor.hospital,
    date: selectedDate,
    time: selectedTime,
    patient: formData.name,
    phone: formData.phone,
  });

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {step === 3 ? "Booking Confirmed!" : `Book Appointment with ${doctor.name}`}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 py-4">
            {/* Doctor Info */}
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                <p className="text-sm text-primary">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground">Consultation Fee: ₹{doctor.fee}</p>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Select Date
              </Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {dates.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date.toISOString().split("T")[0])}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedDate === date.toISOString().split("T")[0]
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="text-xs text-muted-foreground">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <p className="font-semibold">{date.getDate()}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Select Time
              </Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedTime === time
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="hero"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!selectedDate || !selectedTime}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-secondary rounded-xl text-sm">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Date:</strong>{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Time:</strong> {selectedTime}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name *
                </Label>
                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number *
                </Label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address *
                </Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Label className="mb-2">Reason for Visit (Optional)</Label>
                <Input
                  placeholder="Brief description of your symptoms"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="hero" className="flex-1" onClick={handleSubmit}>
                Confirm Booking
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="py-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-healthcare-green-light flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-healthcare-green" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Appointment Confirmed!
              </h3>
              <p className="text-muted-foreground">
                Your appointment with {doctor.name} has been booked.
              </p>
            </div>

            {/* QR Code */}
            <div className="p-6 bg-secondary rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Your Appointment QR Code</span>
              </div>
              <div className="bg-card p-4 rounded-xl inline-block">
                <QRCodeSVG
                  value={qrData}
                  size={160}
                  level="H"
                  includeMargin
                  fgColor="hsl(173, 58%, 39%)"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Show this QR code at the reception
              </p>
            </div>

            <div className="p-4 bg-secondary rounded-xl text-left space-y-2">
              <p className="text-sm">
                <strong className="text-foreground">Date:</strong>{" "}
                <span className="text-muted-foreground">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p className="text-sm">
                <strong className="text-foreground">Time:</strong>{" "}
                <span className="text-muted-foreground">{selectedTime}</span>
              </p>
              <p className="text-sm">
                <strong className="text-foreground">Location:</strong>{" "}
                <span className="text-muted-foreground">{doctor.hospital}</span>
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to {formData.email}
            </p>

            <Button variant="hero" className="w-full" onClick={resetAndClose}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
