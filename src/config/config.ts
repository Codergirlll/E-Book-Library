import { config as con } from "dotenv";

con();

const configs = {
  port: process.env.PORT,
  Mongo_URL: process.env.Mongo_DB_URL,
  jwt_secret: process.env.JWT_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
  frontend_domain: process.env.FRONTEND_DOMAIN
};

export default configs;
