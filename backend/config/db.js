require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
// config/db.js
const mongoose = require("mongoose");

// Set strictQuery explicitly to suppress the warning
//mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // Remove deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    //console.error("MongoDB connection error:", error.message);
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
