import VolunteerApplications from '../models/VolunteerApplications';
import { generateAdmin, generateUser } from './helper-functions';
import scriptDbConnect from './dbConnectForScript';

import Events from '../models/VolunteerEvents'; // Assuming you have an Events model
import VolunteerEvents from '../models/VolunteerEvents';
import { VolunteerApplicationData } from '../types/database';

// Right now this file contains only a quick test for making sure we can insert into db with schema
// It doesnt generate valid fake data'

async function main() {
  try {
    // Connect to the database
    await scriptDbConnect();
    await VolunteerApplications.deleteMany({});
    const dummyEvent = await Events.findOne({}); // Find the first event
    // Insert a sample application
    const sampleApplication = {
      questions: [
        {
          type: 'text',
          title: 'Why do you want to volunteer with us?',
          choices: null,
        },
        {
          type: 'multiple-choice',
          title: 'What areas are you interested in volunteering?',
          choices: [
            'Community Work',
            'Event Management',
            'Fundraising',
            'Others',
          ],
        },
        {
          type: 'checkbox',
          title: 'Which days are you available?',
          choices: ['Monday', 'Tuesday', 'Wednesday'],
        },
      ],
      responses: [],
      event: dummyEvent._id,
    };

    // Create a new volunteer application with the sample data
    const newApplication = new VolunteerApplications(sampleApplication);

    // Save the new application to the database
    const savedApp = await newApplication.save();

    const updatedEvent = await VolunteerEvents.findOneAndUpdate(
      { _id: dummyEvent._id },
      { applicationId: savedApp._id },
      { new: true }
    );

    console.log(`updated event ${updatedEvent}`);

    console.log('Sample volunteer application inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample application:', error);
  }
}

main();
