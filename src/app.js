require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const dialog = require("./routes/dialog/dialogRoute");
const twilio = require("./routes/twilio/twilioRoute");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/dialog", dialog);
app.use("/twilio", twilio);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
