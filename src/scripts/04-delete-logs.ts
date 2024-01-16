import scriptDbConnect from './dbConnectForScript';
import VolunteerLogs from '../models/VolunteerLogs';

async function main() {
  // Connect to the database
  await scriptDbConnect();

  await VolunteerLogs.deleteMany({});
  console.log('Success! You can terminate this script now.');
}

main();
