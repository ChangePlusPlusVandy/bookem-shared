# Instruction for generating fake-data using scripts

## updating / installing dependency

Since I have added a few new dependency for the scripts, you might need to run `npm i` to make sure you are up to date in terms of dependency.

## set up local var
You will need to configure local environment for the connection string to MongoDB before running the scripts

Directly under the src directory, create a .env.local file and set your MongoDB URI to a variable called MONGODB_URI. The file .env.local .env.local should look something like this

```bash
# .env.local
# URI to access our shared MongoDB (ask the EM if you don’t have this)
MONGODB_URI="[your MongoDB URI goes here]"
# The environment we’re running in (development, staging, production)
NODE_ENV="development"
```

## install ts-node globally
To run the scripts will need ts-node. Here is the command for installing it globally

```bash
npm install -g ts-node
```

## running the scripts

use `ts-node [script name]` to run. For example, `ts-node 01-insert-accounts.ts`.


## environment info
For reference, at the time I worked on it my versions are
- ts-node@10.9.1
- npm - 9.6.4

You shouldn't need this info. But just I will leave it here just in case