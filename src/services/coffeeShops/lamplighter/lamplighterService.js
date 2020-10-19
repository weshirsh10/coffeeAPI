const { Builder, By, Key, until } = require("selenium-webdriver");
const xpathDict = require("./lamplighter.json");

const placeOrder = async (order) => {
  // let order = [
  //   { size: "medium", milk: "almond", coffeeType: "Iced coffee", amount: "a" },
  //   { amount: "a", coffeeType: "iced mocha", size: "medium" },
  //   { size: "medium", coffeeType: "Iced coffee", amount: "a" },
  // ];
  let driver = await new Builder().forBrowser("chrome").build();
  driver
    .manage()
    .setTimeouts({ implicit: 5000, pageLoad: 5000, script: 30000 });
  try {
    //navigate to site
    await driver.get("https://lamplighter-coffee-roasters.square.site/drinks");

    //select item by name
    for (i = 0; i < order.length; i++) {
      // await driver.sleep(5000);
      console.log("COFFEEEEE", order[i].coffeeType);

      //click on coffeeType
      let coffee = order[i].coffeeType.toLowerCase();
      let coffeeType = await driver.findElement(
        By.xpath(xpathDict.coffeeType[coffee])
      );
      await coffeeType.click();

      // select coffeeSize
      let sizeSelect = await driver
        .findElement(
          By.xpath(
            '//*[@id="app"]/div[2]/div/div/div[1]/form/div[3]/div/div/label/div[2]/select'
          )
        )
        .then((el) => {
          let sizeKey = "";
          if (coffee.includes("iced")) {
            sizeKey = "iced" + order[i].size;
          } else {
            sizeKey = order[i].size;
          }
          return el.sendKeys(xpathDict.size[sizeKey]);
        });

      //select milk
      if (order[i].milk) {
        let milkSelect = await driver.findElement(
          By.xpath(xpathDict.milk[order[i].milk])
        );
        await milkSelect.click();
      }

      // //Select sweetenrs
      // //***********TO DO **************************************************************
      // ////////////////////////////////////////////////////////////////////

      //add to cart
      let addToCart = await driver.findElement(
        By.xpath(
          '//*[@id="app"]/div[2]/div/div/div[3]/div/div[1]/form[2]/button'
        )
      );
      await addToCart.click();

      //continue shopping
      if (i != order.length - 1) {
        let continueShopping = await driver.findElement(
          By.xpath(
            '//*[@id="9392ee70-7f81-11ea-b341-0d1a744279ad"]/div[1]/div[3]/div[2]/div/a'
          )
        );
        await continueShopping.click();
      }
    }
    //checkout
    let checkout = await driver.findElement(
      By.xpath(
        '//*[@id="9392ee70-7f81-11ea-b341-0d1a744279ad"]/div[1]/div[3]/div[1]/button'
      )
    );
    await checkout.click();

    // enter user details
    let email = await driver.findElement(
      By.xpath(
        '//*[@id="wsite-content"]/div/div[1]/div/div[3]/div[2]/div/div[1]/div/section[1]/form/fieldset/div/input'
      )
    );
    await email.sendKeys(process.env.USER_EMAIL);

    let first = await driver.findElement(
      By.xpath(
        '//*[@id="wsite-content"]/div/div[1]/div/div[3]/div[2]/div/div[1]/div/section[2]/div[1]/form/fieldset/div[1]/label[1]/input'
      )
    );
    await first.sendKeys(process.env.USER_FIRST_NAME);

    let last = await driver.findElement(
      By.xpath(
        '//*[@id="wsite-content"]/div/div[1]/div/div[3]/div[2]/div/div[1]/div/section[2]/div[1]/form/fieldset/div[1]/label[2]/input'
      )
    );
    await last.sendKeys(process.env.USER_LAST_NAME);

    let phone = await driver.findElement(
      By.xpath(
        '//*[@id="wsite-content"]/div/div[1]/div/div[3]/div[2]/div/div[1]/div/section[2]/div[1]/form/fieldset/div[2]/label[2]/input'
      )
    );
    await phone.sendKeys(process.env.USER_PHONE_NUMBER);

    // next buttons
    let next = await driver.findElement(
      By.xpath(
        '//*[@id="wsite-content"]/div/div[1]/div/div[3]/div[2]/div/div[1]/div/section[3]/fieldset/button'
      )
    );
    await next.click();

    let next2 = await driver.findElement(
      By.xpath(
        '//*[@id="wsite-content"]/div/div[1]/div/div[3]/div[2]/div/div[3]/div/section/section/button'
      )
    );
    await next2.click();

    //payment method's
    iframe = await driver.findElement(By.xpath('//*[@id="sq-card-frame"]'));
    await driver.switchTo().frame(iframe);

    let cardNumber = await driver.findElement(
      By.xpath('//*[@id="sq-input--cardNumber"]')
    );
    await cardNumber.sendKeys(process.env.USER_CARD_NUMBER);

    let expiration = await driver.findElement(
      By.xpath('//*[@id="sq-input--expirationDate"]')
    );
    await expiration.sendKeys(process.env.USER_CARD_EXPIRATION);

    let cvv = await driver.findElement(By.xpath('//*[@id="sq-input--cvv"]'));
    await cvv.sendKeys(process.env.USER_CARD_CVV);

    let zip = await driver.findElement(
      By.xpath('//*[@id="sq-input--postalCode"]')
    );
    await zip.sendKeys(process.env.USER_CARD_ZIP);

    //next3
    await driver.switchTo().defaultContent();
    let next3 = await driver.findElement(
      By.xpath(
        '//*[@id="wsite-content"]/div/div[1]/div/div[3]/div[2]/div/div[4]/div/section[3]/div/div[2]/button'
      )
    );
    await next3.click();

    //place order
    // let placeOrder = await driver.findElement(
    //   By.xpath(
    //     '//*[@id="wsite-content"]/div/div[1]/div/div[3]/div[2]/div/div[5]/div/section/form/fieldset/section/button'
    //   )
    // );
    // await placeOrder.click();

    return;
  } finally {
    // await driver.quit();
  }
};

module.exports = { placeOrder };
