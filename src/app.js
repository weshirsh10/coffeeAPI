const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const dbUri =
  "mongodb+srv://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PASS +
  "@coffeeguy.4ldbu.gcp.mongodb.net/" +
  process.env.MONGO_DB_NAME +
  "?retryWrites=true&w=majority";

const dialog = require("./routes/dialog/dialogRoute");
const twilio = require("./routes/twilio/twilioRoute");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/dialog", dialog);
app.use("/twilio", twilio);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
