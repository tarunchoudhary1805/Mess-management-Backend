const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const app = express();
const Port = process.env.PORT || 5000;

app.use(express.json());
connectDB();

app.use(cors());

app.use("/api/menu", require("./routes/menu"));
app.use("/api/user", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/feedback", require("./routes/feedback"));

app.listen(Port, () => console.log(`server started : ${Port}`));
