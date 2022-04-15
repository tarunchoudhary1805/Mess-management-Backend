const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: "error",
      error: "Email and Password are required fields",
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.json({
        status: "error",
        error: "Invalid userfullName / password",
      });

    const pass = bcrypt.compare(password, user.password);
    if (pass) {
      const token = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET);
      user.password = undefined;
      return res.json({
        status: "ok",
        token,
        user,
        message: "Signin successfully",
      });
    } else {
      return res.json({ status: "error", error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const register = async (req, res, next) => {
  const {
    email,
    fullName,
    password,
    roomNumber,
    userType,
    department,
    contactNumber,
  } = req.body;
  if (
    !email ||
    !password ||
    !fullName ||
    !roomNumber ||
    !department ||
    !contactNumber ||
    !userType
  ) {
    return res
      .status(422)
      .json({ status: "error", error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ status: "error", error: "user already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        roomNumber,
        contactNumber,
        department,
        fullName,
        password: hashedPassword,
        userType,
      });
      const token = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET);

      const data = await user.save();
      data.password = undefined;
      if (data)
        res.json({
          status: "ok",
          message: "Register Successfully",
          token,
          data,
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const deleteUser = (req, res, next) => {};
const updateUser = (req, res, next) => {
  console.log(req.params.id);
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(
      {},
      {
        _id: 1,
        fullName: true,
        email: true,
        roomNumber: true,
        accountStatus: true,
      }
    );

    console.log(users);
    res.status(200).json({ status: "ok", message: "Success", users });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { login, register, getUsers, updateUser, deleteUser };
