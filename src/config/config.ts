import { config as con } from "dotenv";

con();

const configs = {
  port: process.env.PORT,
  Mongo_URL: process.env.Mongo_DB_URL,
};

export = configs;
