import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "nimap_test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
