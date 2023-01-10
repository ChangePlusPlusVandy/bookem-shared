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
}

export interface QueriedVolunteerProgramData extends VolunteerProgramData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
