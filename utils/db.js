const mongoose = require("mongoose");

let isConnected = false; // global connection flag
const dbuRI = process.env.DB_URI;
async function connectDB() {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(dbuRI)
    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = connectDB;

