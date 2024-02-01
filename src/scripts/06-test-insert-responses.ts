import mongoose from 'mongoose';
import ApplicationResponse from '../models/ApplicationResponse';
import Users from '../models/Users';
import Events from '../models/VolunteerEvents';
import scriptDbConnect from './dbConnectForScript';
import VolunteerApplications from '../models/VolunteerApplications';
import { ApplicationQuestionData } from '../types/database';

// Right now this file contains only a quick test for making sure we can insert into db with schema
// It doesnt generate valid fake data

async function main() {
  try {
    // Connect to the database
    await scriptDbConnect();

    // Create or find a dummy user and event
    // Note: Replace this with your actual logic to retrieve or create a user and an event
    const dummyUser = await Users.findOne({}); // Find the first user
    // const dummyEvent = await Events.findOne({}); // Find the first event

    // Fetch the first volunteer application
    const application = await VolunteerApplications.findOne();

    // Check if the application exists and has questions
    if (
      !application ||
      !application.questions ||
      application.questions.length === 0
    ) {
      throw new Error('No volunteer applications or questions found.');
    }

    // Extract the question IDs
    const questionIds = application.questions.map(
      (question: ApplicationQuestionData) => question._id
    );

    // Make sure dummyUser and dummyEvent exist
    if (!dummyUser) {
      throw new Error('User not found for the application response.');
    }

    // Create a sample application response
    const sampleResponse = {
      userId: dummyUser._id,
      eventId: application.eventId,
      status: 'Submitted',
      answers: [
        {
          questionId: questionIds[0], // Replace with actual question ID
          text: ['Monday', 'Tuesday'],
        },
      ],
    };

    // Create a new application response with the sample data
    const newResponse = new ApplicationResponse(sampleResponse);

    // Save the new response to the database
    const savedResponse = await newResponse.save();

    // Update the corresponding VolunteerApplication
    await VolunteerApplications.findOneAndUpdate(
      { eventId: application.eventId },
      { $push: { responses: savedResponse._id } }
    );

    console.log('Sample application response inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample application response:', error);
  }
}

main();
