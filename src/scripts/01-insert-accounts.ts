import Admins from '../models/Admins';
import Users from '../models/Users';
import { generateAdmin, generateUser } from './helper-functions';
import scriptDbConnect from './dbConnectForScript';

async function main() {
  try {
    // Connect to the database
    await scriptDbConnect();

    // Delete all users and admins
    await Users.deleteMany({});
    await Admins.deleteMany({});

    // Insert user
    const user = await generateUser({});
    await Users.insertMany(user);

    // Insert admin
    const admin = await generateAdmin();
    await Admins.insertMany(admin);

    console.log(
      'Successfully inserted a user and an admin to db. You can terminate this script now.'
    );
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

main();
