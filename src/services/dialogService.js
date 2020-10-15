const createOrder = (coffeeOrder, number) => {
  //create object to send to DB
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
  //   twilioSend.sendMessage(text, number);
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

const confirmYes = () => {
  //update status in DB

  responseArr = [
    "Coffee order placed, godspeed",
    "Your coffee will be ready in T-15m",
    "Order confirmed, enjoy your caffination",
  ];
  let text = responseArr[Math.floor(Math.random() * responseArr.length)];
  //   twilioSend.sendMessage(text);
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
