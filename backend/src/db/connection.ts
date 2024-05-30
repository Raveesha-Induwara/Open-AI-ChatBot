import { connect, disconnect } from "mongoose";

async function connectToDB() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to database");
  }
}

async function disConnectFromDB() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Error disconnecting from database");
  }
}

export { connectToDB, disConnectFromDB };
