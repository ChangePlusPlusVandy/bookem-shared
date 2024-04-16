import mongoose from 'mongoose';
import { VolunteerProgramData } from '../types/database';

// ProgramSchema describes what our documents should look like in our Program collections
const VolunteerProgramSchema = new mongoose.Schema<VolunteerProgramData>(
  {
    name: { type: String, required: true },
    description: { type: String },
  },

  {
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
