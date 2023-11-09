import mongoose from 'mongoose';

// ----------------------- User and Admin-----------------------
export interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  birthday: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  members?: string[];
  volunteerReason: string;
  occupation: string;
  occupationTitle: string;
  occupationOrg: string;
  joinNewsletter: boolean;
  sourceHeardFrom: string;
  ethnicity?: string;
  gender?: string;
  backgroundCheck?: {
    passed: boolean;
    expirationDate: Date;
  };
  profileImgUrl?: string;
  events: mongoose.Types.ObjectId[];
  programs: mongoose.Types.ObjectId[];
}

export interface QueriedUserData extends UserData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueriedUserDTO
  extends Omit<QueriedUserData, 'programs' | 'events'> {
  events: QueriedVolunteerEventData;
  programs: QueriedVolunteerProgramData;
}

export interface AdminData {
  firstName: string;
  lastName: string;
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
  program: mongoose.Types.ObjectId;
  requireApplication: boolean;
  volunteers: mongoose.Types.ObjectId[];
  tags: mongoose.Types.ObjectId[];
}

export interface QueriedVolunteerEventData extends VolunteerEventData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Contains populated users, program, tags
export interface QueriedVolunteerEventDTO
  extends Omit<QueriedVolunteerEventData, 'program' | 'volunteers' | 'tags'> {
  program: QueriedTagData;
  volunteers: QueriedUserData[];
  tags: QueriedTagData[];
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
  status: ApplicationStatus;
}

export interface QueriedVolunteerApplicationData
  extends Omit<VolunteerApplicationData, 'formData'> {
  _id: mongoose.Types.ObjectId;
  formData: any;
  createdAt: Date;
}

export interface QueriedVolunteerApplicationDTO
  extends QueriedVolunteerApplicationData {
  user: QueriedUserData;
  event: QueriedVolunteerEventData;
}

export enum ApplicationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
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

// --------------------- Program ----------------------
export interface VolunteerProgramData {
  name: string;
  description: string;
  events: mongoose.Types.ObjectId[];
}

export interface QueriedVolunteerProgramData extends VolunteerProgramData {
  _id: mongoose.Types.ObjectId;
}

export interface QueriedVolunteerProgramDTO
  extends Omit<VolunteerProgramData, 'events'> {
  events: QueriedVolunteerEventData[];
}
