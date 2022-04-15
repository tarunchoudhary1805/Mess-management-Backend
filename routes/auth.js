const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/AuthController");
const requireLogin = require("../middlewares/requireLogin");

router.post("/signin", login);
router.post("/signup", register);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/getAllUsers", requireLogin, getUsers);

module.exports = router;
