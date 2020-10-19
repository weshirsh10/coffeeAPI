const twilioService = require("../services/twilioService");
const Order = require("../models/orderModel");
const lamplighter = require("./coffeeShops/lamplighter/lamplighterService");

const createOrder = (coffeeOrder, number) => {
  //create object to send to DB
  const order = new Order({
    number: number,
    order: coffeeOrder,
    state: "PENDING",
  });

  order.save();

  // generate message to send back to to user
  let outputStr = "";
  for (let i = 0; i < coffeeOrder.length; i++) {
    outputStr +=
      "- " +
      coffeeOrder[i].amount +
      " " +
      coffeeOrder[i].size +
      " " +
      coffeeOrder[i].coffeeType;
    if (coffeeOrder[i].milk) {
      outputStr += " with " + coffeeOrder[i].milk + " milk";
    }

    if (coffeeOrder[i].sweetener) {
      outputStr += " and " + coffeeOrder[i].sweetener;
    }

    outputStr += "\n";
  }

  responseArr = [
    "Ok I have, \n" + outputStr + " Shall I send your order? (yes/no)",
    "Got it!\n" + outputStr + " would you like to send your order? (yes/no)",
  ];

  let text = responseArr[Math.floor(Math.random() * responseArr.length)];
  twilioService.sendMessage(text, number);
  let response = {
    fulfillmentMessages: [
      {
        text: {
          text: [text],
        },
      },
    ],
  };

  return response;
};

const confirmYes = async (number) => {
  let confirmedOrder = await Order.find({ number: number });
  console.log(confirmedOrder);
  twilioService.sendMessage("submitting order", number);
  await lamplighter.placeOrder(confirmedOrder[0].order);
  //update status in DB
  Order.deleteMany({ number: number }).catch((err) => {
    console.log("Error Deleting Document", err);
  });
  responseArr = [
    "Coffee order placed, godspeed",
    "Your coffee will be ready in T-15m",
    "Order confirmed, enjoy your caffination",
  ];
  let text = responseArr[Math.floor(Math.random() * responseArr.length)];
  twilioService.sendMessage(text, number);
  let response = {
    fulfillmentMessages: [
      {
        text: {
          text: [text],
        },
      },
    ],
  };

  return response;
};

module.exports = {
  createOrder,
  confirmYes,
};
