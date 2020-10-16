const twilioService = require("../../services/twilioService");
const twilioController = (req) => {
  twilioService.receiveMessage(req.body.Body, req.body.From);
};

module.exports = { twilioController };
