import mongoose from 'mongoose';

// ----------------------- User and Admin-----------------------
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
  tags: string[];
  events: mongoose.Types.ObjectId[];
}

export interface QueriedUserData extends UserData {
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

export interface QueriedAdminData extends AdminData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum AdminStatus {
  Forbidden = 'forbbiden',
  Admin = 'admin',
}

// ----------------------- Volunteer Event -----------------------
export interface VolunteerEventData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  maxSpot: number;
  location: VolunteerEventLocation;
  phone: string;
  email: string;
  requireApplication: boolean;
  volunteers: mongoose.Types.ObjectId[];
  tags: mongoose.Types.ObjectId[];
}

export interface QueriedVolunteerEventData extends VolunteerEventData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerEventLocation {
  street: string;
  city: string;
  state?: string;
  zip?: number;
}

// ----------------------- Volunteer Application -----------------------
export interface VolunteerApplicationData {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  formData: mongoose.Schema.Types.Mixed;
}

export interface QueriedVolunteerApplicationData
  extends VolunteerApplicationData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface QueriedVolunteerApplicationDTO
  extends QueriedVolunteerApplicationData {
  user: QueriedUserData;
  event: QueriedVolunteerEventData;
}

// ----------------------- Volunteer Log -----------------------
export interface VolunteerLogData {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  date: Date;
  hours: number;
  numBooks?: number;
  school?: string;
  teacher?: string;
  feedback?: string;
}

export interface QueriedVolunteerLogData extends VolunteerLogData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
}

// ----------------------- Tag -----------------------
export interface TagData {
  tagName: string;
}

export interface QueriedTagData extends TagData {
  _id: mongoose.Types.ObjectId;
}
