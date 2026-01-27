import mysql from "mysql2";

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mithil@7044",
  database: "nimap_test",
});

connectDB.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Database Connection Successful");
  }
});

export default connectDB;