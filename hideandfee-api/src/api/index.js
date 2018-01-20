import { version } from "../../package.json";
import { Router } from "express";
import coinConverter from "../lib/coinConverter";

export default ({ config, db }) => {
  let api = Router();

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    let fromCoin = req.query.fromCoin.toUpperCase();
    let fromAmount = req.query.amount ? parseFloat(req.query.amount) : 1.0;
    let toCoin = req.query.toCoin.toUpperCase();

    coinConverter
      .convertFromCoinToCoin(fromCoin, fromAmount, toCoin)
      .then(resp => {
        res.json(resp);
      })
      .catch(err => {
        res.json({ err: err });
      });
  });

  return api;
};
