const dialogService = require("../../services/dialogService");

const dialogController = (req) => {
  intent = req.body.queryResult.intent.displayName;
  number = req.body.originalDetectIntentRequest.payload;
  if (intent == "order.start") {
    response = dialogService.createOrder(
      req.body.queryResult.parameters.coffeeOrder,
      req.body.originalDetectIntentRequest.payload.number
    );
    console.log("Order Start");
  } else if (intent == "order.confirm.yes") {
    response = dialogService.confirmYes(
      req.body.originalDetectIntentRequest.payload.number
    );
  }
  return response;
};

module.exports = { dialogController };
