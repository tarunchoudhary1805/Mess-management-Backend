const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    modeOfPayment: {
      type: String,
      required: true,
    },
    dateOfPayment: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Income", incomeSchema);
