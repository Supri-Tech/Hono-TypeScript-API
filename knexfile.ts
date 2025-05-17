import type { Knex } from "knex";
import { config } from "dotenv";

config();

const knexConfig: Knex.Config = {
  client: "mysql2",
  connection: {
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!, 10),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASS!,
    database: process.env.DATABASE_DB!,
  },
  migrations: {
    directory: "./src/db/migrations",
  },
};

export default knexConfig;
