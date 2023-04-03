import mongoose from 'mongoose';
import { TagData } from '../types/database';

// TagSchema describes what our documents should look like in our Tag collections
const TagSchema = new mongoose.Schema<TagData>(
  {
    tagName: { type: String, required: true },
  },
  {
    collection: 'tags',
  }
);

const Tags = mongoose.models.Tag || mongoose.model<TagData>('Tag', TagSchema);

export default Tags;
