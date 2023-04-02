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
    sourceHeardFrom: { type: String, required: true },
    ethnicity: { type: String, required: true },
    gender: { type: String, required: true },
    backgroundCheck: {
      passed: { type: Boolean },
      expirationDate: { type: Date },
    },

    /**
     * Contains the tags of the programs the user has signed up for
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
        ref: 'VolunteerProgram',
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
