import express from "express";
const router = express.Router();
import db from "./database/bd.js";

// Route to create a new user
router.post("/user", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required!" });
  }

  const insertUser = "INSERT INTO users(username, email) VALUES(?, ?)";
  const VALUES = [username, email];

  db.query(insertUser, VALUES, (err, result) => {
    if (err) {
      console.error("Error inserting user:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to insert user into the database." });
    }

    res.status(201).json({
      message: "User created successfully!",
      userId: result.insertId,
    });
  });
});

// Route to fetch all users
router.get("/users", (req, res) => {
  const fetchUsers = "SELECT * FROM users";

  db.query(fetchUsers, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch users from the database." });
    }

    res.status(200).json(results);
  });
});

export default router;
