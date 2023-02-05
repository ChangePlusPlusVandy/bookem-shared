import mongoose from 'mongoose';
import { VolunteerProgramData } from '../types/database';

// VolunteerProgramSchema describes what our documents should look like in our VolunteerProgram collections
const VolunteerProgramSchema = new mongoose.Schema<VolunteerProgramData>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    schools: [{ type: String }],
    programDate: { type: Date, required: true },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'volunteerPrograms',
  }
);

const VolunteerPrograms =
  mongoose.models.VolunteerProgram ||
  mongoose.model<VolunteerProgramData>(
    'VolunteerProgram',
    VolunteerProgramSchema
  );

export default VolunteerPrograms;
