const express = require("express");
const User = require("../models/user");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const Expense = require("../models/expense");
const Income = require("../models/income");

router.get("/activateUserAccount/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (!user) return res.json({ status: "error", message: "User not found" });
    user.accountStatus = "Active";
    const data = await user.save();
    console.log(data);
    if (data) return res.json({ status: "ok" });
    // console.log(user);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/getExpense", requireLogin, async (req, res) => {
  try {
    const data = await Expense.find().populate("updatedBy", "fullName email");
    console.log(data);
    res.json({ data, status: "ok", message: "Success" });
  } catch (error) {}
});

router.post("/addExpense", requireLogin, async (req, res) => {
  console.log(req.body);
  const { description, amount, modeOfPayment, dateOfPayment } = req.body;
  if (!description || !amount || !modeOfPayment || !dateOfPayment) {
    return res.json({ status: "error", error: "All Fields are required" });
  }
  try {
    req.user.password = undefined;
    const data = new Expense({
      description,
      amount,
      modeOfPayment,
      dateOfPayment,
      updatedBy: req.user,
    });
    const response = await data.save();
    console.log(response);
    res.json({ status: "ok", message: "Success", response });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getIncome", requireLogin, async (req, res) => {
  try {
    const data = await Income.find().populate("updatedBy", "fullName email");
    console.log(data);
    res.json({ data, status: "ok", message: "Success" });
  } catch (error) {}
});

router.post("/addIncome", requireLogin, async (req, res) => {
  console.log(req.body);
  const { description, amount, modeOfPayment, dateOfPayment } = req.body;
  if (!description || !amount || !modeOfPayment || !dateOfPayment) {
    return res.json({ status: "error", error: "All Fields are required" });
  }
  try {
    req.user.password = undefined;
    const data = new Income({
      description,
      amount,
      modeOfPayment,
      dateOfPayment,
      updatedBy: req.user,
    });
    const response = await data.save();
    console.log(response);
    res.json({ status: "ok", message: "Success", response });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
