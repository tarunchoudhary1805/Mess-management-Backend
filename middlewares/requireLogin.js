const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user");

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  //   authorization === Bearer edfsdkicmivnskcmdifsdifsdic....
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  } else {
    try {
      const token = authorization.replace("Bearer ", "");
      jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ error: "You must be logged in" });
        }
        const { _id } = payload;
        User.findById(_id).then((user) => ((req.user = user), next()));
        console.log(req.user);

        console.log(_id);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
};

module.exports = requireLogin;
