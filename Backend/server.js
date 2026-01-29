import 'dotenv/config';
import app from "./app.js";
import connectDB from "./config/db.js";


connectDB.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Database Connection Successful");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () =>{
    console.log(`Server is running on port ${PORT}`);
})