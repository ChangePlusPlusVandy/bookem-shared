import mongoose from 'mongoose';

export interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  isVolunteer?: boolean;
  isDonor?: boolean;
  isRequester?: boolean;
  sourceHeardFrom: string;
  ethnicity: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerLogData {
  school?: string;
  teacher?: string;
  date: Date;
  hours: number;
  userId: mongoose.Types.ObjectId;
  feedback?: string;
  numBooks?: number;
  createdAt: Date;
}

export interface VolunteerProgramApplicationData {
  userId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  formData: mongoose.Schema.Types.Mixed;
  createdAt: Date;
}

export interface VolunteerLogData {
  school?: string;
  teacher?: string;
  date: Date;
  hours: number;
  userId: mongoose.Types.ObjectId;
  feedback?: string;
  numBooks?: number;
  createdAt: Date;
}

export interface VolunteerProgramData {
  name: string;
  description: string;
  schools?: string[];
  programDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
