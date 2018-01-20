import ExchangeFees from "ExchangeFees";
import Rates from "Rates";

/* Calculating Fees */

let toBTCFromUSDFee = usd => {
  return Rates["BTC"][user.toUpperCase];
};

let toUSDFromBTCFee = btc => {
  return Rates["USD"][btc.toUpperCase];
};

let fromCoinToCoinFee = (fromCoin, toCoin) => {
  return Rates[fromCoin.toUpperCase][toCoin.toUperCase];
};

/* Calculating Totals */

let toBTCFromUSD = usd => {
  return toBTCFromUSDFee(usd) * usd;
};

let toUSDFromBTC = btc => {
  return toUSDFromBTCFee(btc) * btc;
};

let fromCoinToCoin = (fromCoin, toCoin) => {
  return fromCoinToCoinFee(fromCoin, toCoin);
};

/* exports */

const fees = {
  toUSDFromBTCFee: toUSDFromBTCFee(),
  toBTCFromUSDFee: toBTCFromUSDFee(),
  fromCoinToCoinFee: fromCoinToCoinFee()
};

const total = {
  toUSDFromBTC: toUSDFromBTC(),
  toBTCFromUSD: toBTCFromUSD(),
  fromCoinToCoin: fromCoinToCoin()
};

module.export = {
  fees: fees,
  total: total
};
