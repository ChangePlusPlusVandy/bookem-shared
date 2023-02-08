import mongoose from 'mongoose';
import { UserData } from '../types/database';

// UserSchema describes what our documents should look like in our User collections
const UserSchema = new mongoose.Schema<UserData>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    sourceHeardFrom: { type: String, required: true },
    ethnicity: { type: String, required: true },
    backgroundCheck: {
      passed: { type: Boolean },
      expirationDate: { type: Date },
    },
    gender: { type: String, required: true },
    tags: [{ type: String, required: true }],
    programs: [
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
