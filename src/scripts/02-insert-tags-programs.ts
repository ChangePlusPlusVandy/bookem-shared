import Tags from '../models/Tags';
import VolunteerPrograms from '../models/VolunteerPrograms';
import { INSERTED_PROGRAMS, INSERTED_TAGS } from './constants';
import { generateProgram, generateTag } from './helper-functions';
import scriptDbConnect from './dbConnectForScript';

async function main() {
  try {
    // Connect to the database
    await scriptDbConnect();

    // delete all tags
    await Tags.deleteMany({});

    // delete all programs
    await VolunteerPrograms.deleteMany({});

    // Generate programs
    INSERTED_PROGRAMS.forEach(async program => {
      const generatedProgram = generateProgram(program);
      await VolunteerPrograms.insertMany(generatedProgram);
    });

    // Generate tags
    INSERTED_TAGS.forEach(async tag => {
      const genratedTag = generateTag(tag);
      await Tags.insertMany(genratedTag);
    });

    console.log('Success! You can terminate this script now.');
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

main();
