import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, GraduationCap, Calendar } from "lucide-react";
import { Doctor } from "@/data/doctors";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <div className="gradient-card rounded-2xl border border-border p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
        <div className="flex gap-4">
          {/* Doctor Image */}
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover shadow-sm"
            />
            {doctor.available && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-healthcare-green rounded-full border-2 border-card" />
            )}
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground text-lg truncate">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium text-sm">
                  {doctor.specialty}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-healthcare-teal-light text-primary border-0 shrink-0"
              >
                ₹{doctor.fee}
              </Badge>
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-healthcare-orange fill-healthcare-orange" />
                <span className="font-medium text-foreground">{doctor.rating}</span>
                <span>({doctor.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                <span>{doctor.experience} yrs</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">{doctor.hospital}, {doctor.location}</span>
            </div>
          </div>
        </div>

        {/* Availability & Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className={doctor.available ? "text-healthcare-green font-medium" : "text-muted-foreground"}>
              {doctor.nextAvailable}
            </span>
          </div>
          <Button
            variant={doctor.available ? "hero" : "secondary"}
            size="sm"
            onClick={() => setShowBooking(true)}
            disabled={!doctor.available}
            className="gap-2"
          >
            <Calendar className="w-4 h-4" />
            {doctor.available ? "Book Now" : "Unavailable"}
          </Button>
        </div>

        {/* Languages */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {doctor.languages.map((lang) => (
            <Badge key={lang} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      <BookingModal
        doctor={doctor}
        open={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </>
  );
};

export default DoctorCard;
