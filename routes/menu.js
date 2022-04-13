const express = require("express");
const { getMenu, setMenu } = require("../controllers/MenuController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello i am done");
});

router.post("/", setMenu);

module.exports = router;
