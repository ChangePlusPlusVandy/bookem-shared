import mongoose from 'mongoose';
import { EmployeeStatus } from '../types/database';

// EmployeeSchema describes what our documents should look like in our Employee collections
const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      default: EmployeeStatus.Employee,
      enum: EmployeeStatus,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'employees',
  }
);

export default mongoose.models.Employee ||
  mongoose.model('Employee', EmployeeSchema);
