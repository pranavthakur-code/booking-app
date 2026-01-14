import React, { createContext, useContext, useState, useEffect } from "react";
import { Doctor } from "@/data/doctors";

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: Date;
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => Appointment;
  cancelAppointment: (id: string) => void;
  getUpcomingAppointments: () => Appointment[];
  getPastAppointments: () => Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem("healthcare_appointments");
    if (savedAppointments) {
      const parsed = JSON.parse(savedAppointments);
      setAppointments(parsed.map((apt: Appointment) => ({
        ...apt,
        createdAt: new Date(apt.createdAt),
      })));
    }
  }, []);

  useEffect(() => {
    // Save appointments to localStorage
    localStorage.setItem("healthcare_appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointmentData: Omit<Appointment, "id" | "createdAt">): Appointment => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
    return newAppointment;
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" as const } : apt
      )
    );
  };

  const getUpcomingAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return apt.status === "upcoming" && aptDate >= today;
    });
  };

  const getPastAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return apt.status !== "upcoming" || aptDate < today;
    });
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        cancelAppointment,
        getUpcomingAppointments,
        getPastAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
};
