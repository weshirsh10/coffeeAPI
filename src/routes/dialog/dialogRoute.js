const express = require("express");
let router = express.Router();
const dialgController = require("./dialogController");
const lamplighterService = require("../../services/coffeeShops/lamplighter/lamplighterService");

router.route("").post((req, res) => {
  response = dialgController.dialogController(req);
  res.send(response);
});

router.route("/lamp").get((req, res) => {
  lamplighterService.placeOrder();
  res.send("got it");
});

module.exports = router;
