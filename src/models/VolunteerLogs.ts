import mongoose from 'mongoose';
import { VolunteerLogData } from '../types/database';

// VolunteerLogSchema describes what our documents should look like in our VolunteerLogs collections
const VolunteerLogSchema = new mongoose.Schema<VolunteerLogData>(
  {
    /**
     * The user who logged this event
     */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    /**
     * The event that this log is for
     */
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VolunteerEvent',
      required: true,
    },

    /**
     * Basic log information
     */
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
    numBooks: { type: Number, default: 0, required: true },
    school: { type: String },
    teacher: { type: String },
    feedback: { type: String },
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
