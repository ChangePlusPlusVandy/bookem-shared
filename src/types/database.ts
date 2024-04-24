import mongoose from 'mongoose';

/**
 * Data: Fits the model definition
 * QueriedData: Contains Mongo auto-generated values like _id, createdAt, updatedAt
 * QueriedDTO: Contains populated fields. For example: array of user_id -> array of user objects
 */

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
}

export interface QueriedUserData extends UserData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueriedUserDTO
  extends Omit<QueriedUserData, 'programs' | 'events'> {
  events: QueriedVolunteerEventData[];
  programs: QueriedVolunteerProgramData[];
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
  SuperAdmin = 'superadmin',
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
  program?: mongoose.Types.ObjectId;
  requireApplication: boolean;
  volunteers: mongoose.Types.ObjectId[];
  tags: mongoose.Types.ObjectId[];
  applicationId?: mongoose.Types.ObjectId;
}

export interface QueriedVolunteerEventData extends VolunteerEventData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Contains populated users, program, tags
// Omit and then re-define the program, volunteer, and tags properties
// to be the type of VolunteerEvent after populating the program, volunteer, and tags fields
// aka, the type for VolunteerEvents.findById(id).populate('program').populate('tags').populate('volunteers')

export interface QueriedVolunteerEventDTO
  extends Omit<QueriedVolunteerEventData, 'program' | 'volunteers' | 'tags'> {
  program: QueriedVolunteerProgramData;
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
  questions: ApplicationQuestionData[];
  responses: ApplicationResponseData[];
  event: mongoose.Types.ObjectId;
  published: boolean;
}

export interface QueriedVolunteerApplicationData
  extends VolunteerApplicationData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// For User Portal, don't want to send other users' responses
export interface LimitedVolunteerApplicationData
  extends Omit<QueriedVolunteerApplicationData, 'responses'> {}

// For queried submitted application
export interface SingleApplicationResponse {
  application: LimitedVolunteerApplicationData;
  response: QueriedApplicationResponseData;
}

export interface ApplicationResponseData {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  status: ApplicationStatus;
  answers: ApplicationAnswer[];
  submittedAt: Date;
}

export interface QueriedApplicationResponseData
  extends ApplicationResponseData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationQuestionData {
  // sub document needs to have ids since its not auto generated.
  _id: mongoose.Types.ObjectId;
  type: ApplicationQuestionType;
  title: String;
  choices?: String[];
  isRequired?: boolean;
}

export interface ApplicationAnswer {
  questionId: mongoose.Types.ObjectId;
  // the text of the response. In the case of text question or choice, the array will have only one element
  text: String[];
}

export enum ApplicationQuestionType {
  // short answer
  Text = 'text',
  // mutiple choice
  Radiogroup = 'radiogroup',
  // checkboxes. i.e. mutiple choice where you can choose several options
  Checkbox = 'checkbox',
}

export enum ApplicationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

// ----------------------- Volunteer Log -----------------------
export interface VolunteerLogData {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  date: Date;
  hours: number;
  numBooks?: number;
  school?: string;
  teacher?: string;
  feedback?: string;
  status: VolunteerLogStatus;
}

export enum VolunteerLogStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface QueriedVolunteerLogData extends VolunteerLogData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface QueriedVolunteerLogDTO
  extends Omit<QueriedVolunteerLogData, 'user' | 'event'> {
  user: QueriedUserData;
  event: QueriedVolunteerEventData;
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
  description?: string;
}

export interface QueriedVolunteerProgramData extends VolunteerProgramData {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueriedVolunteerProgramDTO
  extends Omit<VolunteerProgramData, 'events' | 'volunteers'> {
  events: QueriedVolunteerEventData[];
}
