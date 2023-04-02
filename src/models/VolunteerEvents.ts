import mongoose from 'mongoose';
import { VolunteerEventData } from '../types/database';

// VolunteerEventSchema describes what our documents should look like in our VolunteerEvent collections
const VolunteerEventSchema = new mongoose.Schema<VolunteerEventData>(
  {
    /**
     * Basic event + contact information
     */
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    maxSpot: { type: Number, required: true },
    location: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: Number, required: true },
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    /**
     * Whether this event requires an application
     */
    requireApplication: { type: Boolean, required: true },

    /**
     * The volunteers that have signed up for this event
     */
    volunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    /**
     * Tags for this event
     * references the tag docs in the tags collection (no duplicates)
     */
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'volunteerEvents',
  }
);

const VolunteerEvents =
  mongoose.models.VolunteerEvent ||
  mongoose.model<VolunteerEventData>('VolunteerEvent', VolunteerEventSchema);

export default VolunteerEvents;
