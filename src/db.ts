import { Pool } from "pg";

const connectionString =
  "postgres://vnjgulsw:3mFa-ZqlCDkHD9xdcaZOLXDwqAiybzl_@motty.db.elephantsql.com/vnjgulsw";

const db = new Pool({ connectionString });

export default db;
