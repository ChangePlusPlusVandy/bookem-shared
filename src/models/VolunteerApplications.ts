import mongoose from 'mongoose';
import { VolunteerApplicationData } from '../types/database';

// VolunteerApplicationSchema describes what our documents should look like in our VolunteerApplication collections
const VolunteerApplicationSchema =
  new mongoose.Schema<VolunteerApplicationData>(
    {
      // the user who applied
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      // the event the user applied for
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
      },
      // the form data the user submitted
      formData: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    {
      timestamps: {
        createdAt: 'createdAt',
      },
      collection: 'VolunteerApplications',
    }
  );

const VolunteerApplications =
  mongoose.models.VolunteerApplication ||
  mongoose.model<VolunteerApplicationData>(
    'VolunteerApplication',
    VolunteerApplicationSchema
  );

export default VolunteerApplications;
