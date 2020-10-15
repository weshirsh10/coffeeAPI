const express = require("express");
let router = express.Router();

router.route("").post((req, res) => {
  res.send("Twilio");
});

module.exports = router;
