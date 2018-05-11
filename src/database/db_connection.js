const { Pool } = require('pg');

require('env2')('./config.env');

let DB_URL = process.env.DB_URL;
if (process.env.NODE_ENV === "test") {
  DB_URL = process.env.TEST_DB_URL;
}

if (!DB_URL) throw new Error('Environment variable Db_URL must be set');

const pool = new Pool({
  connectionString: DB_URL,
  ssl: false
});

module.exports = pool;