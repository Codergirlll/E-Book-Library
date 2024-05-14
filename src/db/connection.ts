import { error } from "console";
import mongoose from "mongoose";
import configs from "../config/config";

mongoose
  .connect(`${configs.Mongo_URL}`)
  .then(() => {
    console.log(`Database is connected successfully`);
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });
