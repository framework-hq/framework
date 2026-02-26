export interface TimeSlot {
  time: string; // HH:mm format
  available: boolean;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  service: string;
  notes?: string;
  status: "confirmed" | "cancelled" | "completed";
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price?: number;
  description?: string;
}

export interface BusinessConfig {
  name: string;
  timezone: string;
  workingHours: {
    start: string; // HH:mm
    end: string;
  };
  workingDays: number[]; // 0 = Sunday, 6 = Saturday
  slotDuration: number; // minutes
  services: Service[];
}
