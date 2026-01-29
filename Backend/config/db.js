import mysql from "mysql2";

const connectDB = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "nimap_test",
});

export default connectDB;