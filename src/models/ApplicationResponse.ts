import mongoose from 'mongoose';
import { ApplicationResponseData, ApplicationAnswer } from '../types/database';

const ApplicationAnswerSchema = new mongoose.Schema<ApplicationAnswer>({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ApplicationQuestion',
    required: true,
  },
  text: [String],
});

// VolunteerApplicationSchema describes what our documents should look like in our VolunteerApplication collections
const ApplicationResponseSchema = new mongoose.Schema<ApplicationResponseData>(
  // we are not saving any application question assuming that one event can only have an unique application
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
      ref: 'VolunteerEvent',
      required: true,
    },
    // the status of the application
    status: {
      type: String,
      required: true,
    },
    // answer to the application questions
    answers: [ApplicationAnswerSchema],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
    collection: 'applicationResponses',
  }
);

const ApplicationResponse =
  mongoose.models.ApplicationResponse ||
  mongoose.model<ApplicationResponseData>(
    'ApplicationResponse',
    ApplicationResponseSchema
  );

export default ApplicationResponse;
