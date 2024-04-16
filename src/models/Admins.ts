import mongoose from 'mongoose';
import { AdminData, AdminStatus } from '../types/database';

// AdminSchema describes what our documents should look like in our Admin collections
const AdminSchema = new mongoose.Schema<AdminData>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      default: AdminStatus.Admin,
      enum: AdminStatus,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'admins',
  }
);

const Admins =
  mongoose.models.Admin || mongoose.model<AdminData>('Admin', AdminSchema);

export default Admins;
