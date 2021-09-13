const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const client = new Pool({
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

module.exports = client;
