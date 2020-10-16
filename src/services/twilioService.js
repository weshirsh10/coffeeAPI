const twilio = require("twilio");
const dialogflow = require("dialogflow");
const uuid = require("uuid");
const structJson = require("./structjson.js");
const Order = require("../models/orderModel");

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
var projectId = process.env.DIALOG_PROJECT_ID;

var client = new twilio(accountSid, authToken);

const receiveMessage = async (text, number) => {
  // find order by phone number set conversation state
  const order = await Order.find({ number: number });

  // Create a new session
  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: text,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
      // event: {
      //   paramerters: structJson.jsonToStructProto({ number: number }),
      // },
    },
    queryParams: {
      //   contexts: [context],
      payload: structJson.jsonToStructProto({ number: number }),
    },
  };

  if (order.length != 0) {
    request.queryParams["contexts"] = setContext(
      projectId,
      sessionId,
      order[0].state
    );
  }

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log(result.fulfillmentText);
  if (result.fulfillmentText) {
    sendMessage(result.fulfillmentText, number);
  }
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
};

const setContext = (projectId, sessionId, state) => {
  let context = [];
  if (state == "PENDING") {
    context = [
      {
        name:
          "projects/" +
          projectId +
          "/agent/sessions/" +
          sessionId +
          "/contexts/order-confirm",
        lifespanCount: 5,
        paramerters: {},
      },
    ];
  }
  return context;
};

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
