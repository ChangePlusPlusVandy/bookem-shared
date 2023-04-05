import mongoose from 'mongoose';
import { UserData } from '../types/database';

// UserSchema describes what our documents should look like in our User collections
const UserSchema = new mongoose.Schema<UserData>(
  {
    /**
     * Basic user information
     */
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    birthday: { type: String, required: true },
    emergencyName: { type: String, required: true },
    emergencyPhone: { type: String, required: true },
    emergencyRelationship: { type: String, required: true },
    members: { type: [String] },
    volunteerReason: { type: String, required: true },
    occupation: { type: String, required: true },
    occupationTitle: { type: String, required: true },
    occupationOrg: { type: String, required: true },
    joinNewsletter: { type: Boolean, required: true },
    sourceHeardFrom: { type: String, required: true },
    ethnicity: { type: String },
    gender: { type: String },
    backgroundCheck: {
      passed: { type: Boolean },
      expirationDate: { type: Date },
    },

    /**
     * Contains the tags of the events (no duplicates)
     * e.g. ['RIF', 'RFR']
     */
    tags: [{ type: String, required: true }],

    /**
     * Contains the _ids of the events the user has signed up for
     * e.g. [
     *  '5f9f5b9b0e1c9c0b3c8b4b5a',
     *  '5f9f5b9b0e1c9c0b3c8b4b5b'
     * ]
     */
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'VolunteerEvents',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'users',
  }
);

const Users =
  mongoose.models.User || mongoose.model<UserData>('User', UserSchema);

export default Users;
