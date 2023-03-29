import mongoose from 'mongoose';

export interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  sourceHeardFrom: string;
  ethnicity: string;
  gender: string;
  backgroundCheck: {
    passed: boolean;
    expirationDate: Date;
  };
  userType: string;
  programs: mongoose.Types.ObjectId[];
  tags: string[];
}

export interface QueriedUserData extends UserData {
  _id: mongoose.Types.ObjectId;
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
}

export interface QueriedVolunteerLogData extends VolunteerLogData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface VolunteerProgramApplicationData {
  userId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  formData: mongoose.Schema.Types.Mixed;
}

export interface QueriedVolunteerProgramApplicationData
  extends VolunteerProgramApplicationData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface QueriedVolunteerProgramApplicationDTO
  extends QueriedVolunteerProgramApplicationData {
  user: QueriedUserData;
  program: QueriedVolunteerProgramData;
}

export interface VolunteerLogData {
  school?: string;
  teacher?: string;
  date: Date;
  hours: number;
  userId: mongoose.Types.ObjectId;
  feedback?: string;
  numBooks?: number;
}

export interface QueriedVolunteerLogData extends VolunteerLogData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface VolunteerProgramData {
  name: string;
  description: string;
  schools?: string[];
  programDate: Date;
  category: string;
  isOpen: boolean;
  volunteers: mongoose.Types.ObjectId[];
  maxSpot: number;
  location: {
    street: string;
    city: string;
    state: string;
    zip: number;
  }
  phone: string;
  email: string;
}

export interface QueriedVolunteerProgramData extends VolunteerProgramData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminData {
  name: string;
  email: string;
  password: string;
  phone: string;
  status: AdminStatus;
}

export interface QueriedAdminData extends UserData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum AdminStatus {
  Forbidden = 'forbbiden',
  Admin = 'admin',
}
