import axios from "axios";

require("dotenv").config();

let config = {
  apiKey: process.env.BITTREX_API_KEY,
  apiSecret: process.env.BITTREX_API_SECRET,
  version: 1.1,
  baseApiUrl: "https://bittrex.com/api/v1.1/"
};

let getExchangeRates = (fromCoin, toCoin) => {
  let url =
    config.baseApiUrl +
    `public/getorderbook?market=${fromCoin}-${toCoin}&type=both`;

  return axios.get(url);
};

let bittrexAPI = {
  getExchangeRates: getExchangeRates
};

export default bittrexAPI;
