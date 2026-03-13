// server.js (or app.js)

// Import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import database connection
const db = require("./db");

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// -----------------------
// Routes
// -----------------------

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// 1️⃣ Create a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    console.log("User created:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// 2️⃣ Add a new transaction
app.post("/transactions", async (req, res) => {
  try {
    const { user_id, description, amount, type, date } = req.body;

    if (!user_id || !description || !amount || !type || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userIdNum = parseInt(user_id, 10);

    const result = await db.query(
      "INSERT INTO transactions (user_id, description, amount, type, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userIdNum, description, amount, type, date]
    );

    console.log("Transaction added:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding transaction:", err);
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// 3️⃣ Get all transactions for a user
app.get("/transactions/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    console.log("Fetching transactions for user:", userId);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const result = await db.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC",
      [userId]
    );

    console.log("DB returned transactions:", result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// 4️⃣ Update a transaction
app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, date } = req.body;

    const result = await db.query(
      "UPDATE transactions SET description=$1, amount=$2, type=$3, date=$4 WHERE id=$5 RETURNING *",
      [description, amount, type, date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    console.log("Transaction updated:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

// 5️⃣ Delete a transaction
app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM transactions WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    console.log("Transaction deleted:", result.rows[0]);
    res.json({ message: "Transaction deleted successfully", transaction: result.rows[0] });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

// -----------------------
// Start server
// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));