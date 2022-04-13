const mongoose = require("mongoose");
 
 
const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to database : ${res.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
