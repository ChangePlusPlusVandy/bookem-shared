import VolunteerEvents from '../models/VolunteerEvents';
import { fillTagEvents, generateEvent } from './helper-functions';
import Tags from '../models/Tags';
import VolunteerPrograms from '../models/VolunteerPrograms';
import { QueriedTagData, QueriedVolunteerProgramData } from '../types/database';
import scriptDbConnect from './dbConnectForScript';

async function main() {
  try {
    // Connect to the database
    await scriptDbConnect();

    // delete all events
    await VolunteerEvents.deleteMany({});

    // get all tags
    const tags = await Tags.find({});

    // get all programs
    const programs = await VolunteerPrograms.find({});

    // create a bulk operation to minimize the number of db calls
    const bulkEvents = VolunteerEvents.collection.initializeUnorderedBulkOp();

    // insert a bunch of equally distributed events
    for (let i = 0; i < 200; i++) {
      const event = generateEvent(
        i,
        tags as QueriedTagData[],
        programs as QueriedVolunteerProgramData[]
      );
      bulkEvents.insert(event);
    }

    // execute the bulk operation
    await bulkEvents.execute();

    // Query them back to update program
    const events = await VolunteerEvents.find({});
    // Update programs so that programs contain their corresponding events
    // await fillProgramEvents(events);

    await fillTagEvents(events);

    console.log('Success! You can terminate this script now.');
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

main();
