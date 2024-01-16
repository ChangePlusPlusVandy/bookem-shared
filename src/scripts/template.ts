import scriptDbConnect from './dbConnectForScript';

async function main() {
  await scriptDbConnect();

  // Data operations here

  console.log('Success! You can terminate this script now.');
}

main();
