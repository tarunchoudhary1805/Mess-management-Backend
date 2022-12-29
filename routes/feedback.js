const express = require("express");
const User = require("../models/user");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const Feedback = require("../models/feedback");

router.get("/getAllFeedbacks", requireLogin, async (req, res) => {
  try {
    const response = await Feedback.find().populate("postedBy", "-password");
    if (response)
      return res.json({ response, status: "ok", message: "success" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addFeedback", requireLogin, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.json({ status: "error", error: "All fields are required" });
  try {
    const response = await new Feedback({
      title,
      description,
      postedBy: req.user._id,
    });
    const data = await response.save();
    if (data)
      return res.json({ data, status: "ok", message: "Feedback Sent !" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteFeedback/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteFeedback = await Feedback.findByIdAndRemove(id);
    const AllFeedbacks = await Feedback.find();
    if (deleteFeedback)
      return res.json({
        message: "Deleted Successfully !",
        data: AllFeedbacks,
        status: "ok",
      });
  } catch (error) {
    console.log(error);
  }
  // console.log(deleteFeedback);
});

module.exports = router;
