import { config as con } from "dotenv";

con();

const configs = {
  port: process.env.PORT,
  Mongo_URL: process.env.Mongo_DB_URL,
  jwt_secret: process.env.JWT_SECRET_KEY
};

export = configs;
