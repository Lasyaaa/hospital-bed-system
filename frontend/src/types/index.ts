export interface User {
  id: string;
  name: string;
  email: string;
  role: 'PATIENT' | 'ADMIN';
}

export interface Hospital {
  _id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface BedCount {
  total: number;
  available: number;
}

export interface BedAvailability {
  _id: string;
  hospitalId: Hospital;
  icuBeds: BedCount;
  oxygenBeds: BedCount;
  ventilatorBeds: BedCount;
  oxygenAvailable: boolean;
  lastUpdated: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}