import mongoose from "mongoose";

export const connectdb = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("error detected in db connection",err);
    });
};
