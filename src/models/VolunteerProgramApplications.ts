import mongoose from 'mongoose';
import { VolunteerProgramApplicationData } from '../types/database';

// VolunteerProgramApplicationSchema describes what our documents should look like in our VolunteerProgramApplication collections
const VolunteerProgramApplicationSchema =
  new mongoose.Schema<VolunteerProgramApplicationData>(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true,
      },
      formData: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    {
      timestamps: {
        createdAt: 'createdAt',
      },
      collection: 'volunteerProgramApplications',
    }
  );

export default VolunteerProgramApplicationSchema;
