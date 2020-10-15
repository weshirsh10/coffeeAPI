const twilio = require("twilio");

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

const receiveMessage = (message) => {};

const sendMessage = async (text, number) => {
  client.messages
    .create({
      body: text,
      to: number, // Text this number
      from: "+12565705020", // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

module.exports = {
  receiveMessage,
  sendMessage,
};
