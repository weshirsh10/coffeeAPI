const express = require("express");
let router = express.Router();
const dialgController = require("./dialogController");

router.route("").post((req, res) => {
  response = dialgController.dialogController(req);
  res.send(response);
});

module.exports = router;
