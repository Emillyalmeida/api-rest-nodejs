import { Pool } from "pg";

const connectionString = process.env.URL_DB;

const db = new Pool({ connectionString });

export default db;
