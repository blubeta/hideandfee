import axios from "axios";
import coinbase from "coinbase";

require("dotenv").config();

let config = {
  apiKey: process.env.COINBASE_API_KEY,
  apiSecret: process.env.COINBASE_API_SECRET
};

let client = new coinbase.Client({
  apiKey: config.apiKey,
  apiSecret: config.apiSecret
});

let getExchangeRates = currency => {
  return new Promise((resolve, reject) => {
    client.getExchangeRates({ currency }, function(err, rates) {
      if (!err) {
        resolve(rates);
      } else {
        reject(err);
      }
    });
  });
};

let coinbaseAPI = {
  getExchangeRates: getExchangeRates
};

export default coinbaseAPI;
