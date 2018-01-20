import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import coinbaseAPI from "../lib/coinbaseAPI";
import bittrexAPI from "../lib/bittrexAPI";

export default ({ config, db }) => {
  let api = Router();

  let coinbaseConversion = (fromCoin, toCoin) => {
    return new Promise((resolve, reject) => {
      coinbaseAPI
        .getExchangeRates(fromCoin)
        .then(resp => {
          resolve({ version, resp });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  let bittrexConversion = (fromCoin, toCoin) => {
    return new Promise((resolve, reject) => {
      bittrexAPI
        .getExchangeRates(fromCoin, toCoin)
        .then(resp => {
          let buy = resp.data.result.buy[0].Rate;
          let sell = resp.data.result.sell[0].Rate;
          resolve({ buy, sell });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    let fromCoin = req.query.fromCoin.toUpperCase();
    let toCoin = req.query.toCoin.toUpperCase();

    if (
      (fromCoin == "USD" && toCoin == "BTC") ||
      (fromCoin == "BTC" && toCoin == "USD")
    ) {
      coinbaseConversion(fromCoin, toCoin).then(rate => {
        res.json(rate);
      });
    } else {
      bittrexConversion(fromCoin, toCoin).then(rate => {
        res.json(rate);
      });
    }
  });

  return api;
};
