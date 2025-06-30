import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To MongoDB: ", con.connection.host);
  } catch (error) {
    console.error("Error Connecting To MongoDB: ", error.message);
  }
};
