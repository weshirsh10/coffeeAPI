const express = require("express");
const twilioController = require("./twilioController");
let router = express.Router();

router.route("").post((req, res) => {
  twilioController.twilioController(req);
  res.send({});
});

module.exports = router;
