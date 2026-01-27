import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () =>{
    console.log(`Server is running on port ${PORT}`);
})