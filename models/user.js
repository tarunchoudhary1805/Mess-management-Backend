const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roomNumber: { type: String, required: true },
    department: { type: String, required: true },
    contactNumber: { type: String, required: true },
    accountStatus: { type: String, default: "Inactive" },
    userType: { type: String, default: "Student" },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);
