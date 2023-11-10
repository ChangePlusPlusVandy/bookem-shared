import mongoose from 'mongoose';
import { VolunteerProgramData } from '../types/database';

// ProgramSchema describes what our documents should look like in our Program collections
const VolunteerProgramSchema = new mongoose.Schema<VolunteerProgramData>(
  {
    name: { type: String, required: true },
    description: { type: String },
    /**
     * Contains the _ids of the events the program contains
     * e.g. [
     *  '5f9f5b9b0e1c9c0b3c8b4b5a',
     *  '5f9f5b9b0e1c9c0b3c8b4b5b'
     * ]
     */
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'VolunteerEvents',
      },
    ],
    volunteers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
      },
    ],
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
