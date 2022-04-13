const mongoose = require("mongoose");

const monthEntry = new mongoose.Schema(
  {
    monthStart: { type: String, required: true },
    monthEnd: { type: String, required: true },
    extraDays: { type: String, required: true },
    amountPaid: { type: String, required: true },
    remainingAmount: { type: String, required: true },
    modeOfPayment: { type: String, required: true },
    AmountStatus: { type: String, default: "Pending", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("MonthEntry", monthEntry);
