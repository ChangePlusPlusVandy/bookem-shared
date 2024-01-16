// connect to MongoDB database for scripting purpose
// note: this differs from normal dbConnect.ts because we don't need to cache the connection

import mongoose from 'mongoose';
// use dotenv to read .env vars into Node. Otherwise, the env vars will not be loaded
// when we run this script with ts-node. (because it is different from running the whole app with npm start, which will load the env vars automatically)
require('dotenv').config({ path: '../.env.local' });

/** Source : https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js **/
const MONGODB_URI: string = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function scriptDbConnect() {
  // Directly return the connection. Since this is a one-off script, we don't need to cache the connection
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  };
  return mongoose.connect(MONGODB_URI, opts);
}

export default scriptDbConnect;
