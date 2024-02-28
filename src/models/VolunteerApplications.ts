import mongoose from 'mongoose';
import {
  ApplicationQuestionData,
  VolunteerApplicationData,
} from '../types/database';
import ApplicationResponse from './ApplicationResponse';

const ApplicationQuestionSchema = new mongoose.Schema<ApplicationQuestionData>({
  // _id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  // choices for multiple choices or checkbox
  choices: [
    {
      type: String,
      required: false,
    },
  ],
});

// VolunteerApplicationSchema describes what our documents should look like in our VolunteerApplication collections
const VolunteerApplicationSchema =
  new mongoose.Schema<VolunteerApplicationData>(
    {
      // questions in the application
      questions: [ApplicationQuestionSchema],
      responses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ApplicationResponse',
        },
      ],
    },
    {
      timestamps: {
        createdAt: 'createdAt',
      },
      collection: 'volunteerApplications',
    }
  );

const VolunteerApplications =
  mongoose.models.VolunteerApplication ||
  mongoose.model<VolunteerApplicationData>(
    'VolunteerApplication',
    VolunteerApplicationSchema
  );

export default VolunteerApplications;
