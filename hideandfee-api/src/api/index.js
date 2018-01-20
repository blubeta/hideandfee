import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import coinbaseAPI from "../lib/coinbaseAPI";
import bittrexAPI from "../lib/bittrexAPI";

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use("/facets", facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    let coin = req.query.coin.toUpperCase();
    console.log(coin);
    coinbaseAPI
      .getExchangeRates(coin)
      .then(resp => {
        res.json({ version, resp });
      })
      .catch(err => {
        console.log(err);
      });
  });

  api.get("/coinexchange", (req, res) => {
    let fromCoin = req.query.fromCoin.toUpperCase();
    let toCoin = req.query.toCoin.toUpperCase();
    bittrexAPI
      .getExchangeRates(fromCoin, toCoin)
      .then(resp => {
        let buy = resp.data.result.buy[0].Rate;
        let sell = resp.data.result.sell[0].Rate;
        res.json({ buy, sell });
      })
      .catch(err => {
        console.log(err);
      });
  });

  return api;
};
