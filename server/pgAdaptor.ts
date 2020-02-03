import { config } from "dotenv";
import pgPromise from "pg-promise";
config();

const pgp = pgPromise({});

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  port: <number>(<unknown>process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

export const db = pgp(dbConfig);
