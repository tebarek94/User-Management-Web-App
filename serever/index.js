import express from "express";
import cors from "cors";
import db from "./database/bd.js";
import router from "./userlist.js";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use("/api", router);

// Connect to the database and start the server
db.connect((err) => {
  if (err) {
    console.error("Error: Unable to connect to the database!");
  } else {
    console.log("Database is connected successfully!");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
});
