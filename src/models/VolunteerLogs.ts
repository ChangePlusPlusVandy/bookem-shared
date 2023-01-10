import mongoose from 'mongoose';
import { VolunteerLogData } from '../types/database';

// VolunteerLogSchema describes what our documents should look like in our VolunteerLogs collections
const VolunteerLogSchema = new mongoose.Schema<VolunteerLogData>(
  {
    school: { type: String, required: false },
    teacher: { type: String, required: false },
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedback: { type: String, required: false },
    numBooks: { type: Number, default: 0, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
    collection: 'volunteerLogs',
  }
);

const VolunteerLogs =
  mongoose.models.VolunteerLog ||
  mongoose.model<VolunteerLogData>('VolunteerLog', VolunteerLogSchema);

export default VolunteerLogs;
