import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_UR) {
    throw new Error("Mongo url doesnt exist in env file");
  };
  
  try {
    await mongoose.connect(process.env.MONGO_UR);
    isConnected = true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
