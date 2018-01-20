import ExchangeFees from "ExchangeFees";
import ExchangeRate from "ExchangeRate";

/* Calculating Fees */

let fromUSDToBTCFee = () => Rates["BTC"]["USD"];

let fromBTCToUSDFee = () => Rates["USD"]["BTC"];

let fromCoinToCoinFee = (fromCoin, toCoin) => {
  return Rates[fromCoin.toUpperCase][toCoin.toUperCase];
};

/* Calculating Totals */

let fromUSDToBTC = amount => {
  return amount / ExchangeRate["BTC"]["USD"] + fromUSDToBTCFee();
};

let fromBTCToUSD = amount => {
  return amount / ExchangeRate["USD"]["BTC"] + fromBTCToUSDFee();
};

let fromCoinToCoin = (fromCoin, fromAmount, toCoin) => {
  let fee = fromCoinToCoinFee(fromCoin, toCoin);
  return (
    fromAmount / ExchangeRate[fromCoin.toUpperCase()][toCoin.toUpperCase()] +
    fee
  );
};

/* exports */

const fees = {
  fromBTCToUSDFee: fromBTCToUSDFee(),
  fromUSDToBTCFee: fromUSDToBTCFee(),
  fromCoinToCoinFee: fromCoinToCoinFee()
};

const total = {
  fromBTCToUSD: fromBTCToUSD(),
  fromUSDToBTC: fromUSDToBTC(),
  fromCoinToCoin: fromCoinToCoin()
};

module.export = {
  getFees: fees,
  calcTotal: total
};
