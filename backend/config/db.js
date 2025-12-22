require("dotenv").config();
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
      await mongoose.connect(process.env.DB_URL);
      console.log('Connected to database');
  } catch (error) {
      console.log(error);
  }
}

module.exports = connectToDatabase