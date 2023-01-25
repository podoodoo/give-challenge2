import { delay, randomString } from "./util";
import { faker } from "@faker-js/faker";

export const getStatistics = async () => {
  var randomDelay = Math.ceil(Math.random() * 3000);
  await delay(randomDelay);

  if (Math.random() < 0.25) {
    throw new Error("Failed to load resource.");
  }

  let totalAmount = (Math.random() * 25000000).toFixed(2);
  let numberOfDonors = Math.ceil(Math.random() * 400);
  let stats = {
    totalAmount,
    numberOfDonors,
    totalDonations: Math.ceil(Math.random() * (totalAmount / numberOfDonors))
  };

  return stats;
};

export const getTransactions = async () => {
  var randomDelay = Math.ceil(Math.random() * 3000);
  await delay(randomDelay);

  if (Math.random() < 0.25) {
    throw new Error("Failed to load resource.");
  }

  let transactions = [];

  let numTransactions = Math.floor(Math.random() * 25);

  for (let index = 0; index < numTransactions; index++) {
    let price = Math.random();
    let fullName = faker.name.fullName();
    transactions.push({
      transactionId: "0x" + randomString(64),
      name: fullName,
      email: faker.internet.email(fullName),
      timestamp: faker.date.recent(15),
      cryptoType: "ETH",
      cryptoAmount: price.toFixed(18),
      usdAmountAtTransaction: (price * 1250.0).toFixed(2),
      receipt: faker.image.abstract()
    });
  }

  return transactions;
};
