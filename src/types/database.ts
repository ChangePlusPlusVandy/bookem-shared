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
  programs: mongoose.Types.ObjectId[];
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
  hasForm: boolean;
  users: mongoose.Types.ObjectId[];
}

export interface QueriedVolunteerProgramData extends VolunteerProgramData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  name: string;
  email: string;
  password: string;
  phone: string;
  status: EmployeeStatus;
}

export interface QueriedEmployeeData extends UserData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum EmployeeStatus {
  Forbidden = 'forbbiden',
  Employee = 'employee',
  Admin = 'admin',
}
