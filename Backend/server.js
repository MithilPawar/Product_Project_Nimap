import "dotenv/config";
import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const connectionInstance = await pool.getConnection();
    console.log("Database connection successful!");
    connectionInstance.release();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();