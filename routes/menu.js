const express = require("express");
const { getMenu,setMenu } = require("../controllers/MenuController");
const router = express.Router();

router.get("/", getMenu);

router.post('/',setMenu)

module.exports = router;
