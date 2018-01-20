import ExchangeFees from 'ExchangeFees';
import ExchangeRate from 'ExchangeRate';

/* Calculating Fees */

let coinbaseFees = ExchangeFees['Coinbase']
let coinbaseRate = ExchangeRate['Coinbase']
let bittrexFees  = ExchangeFees['Bittrex']
let bittrexRate  = ExchangeRate['Bittrex']

let fromUSDToBTCFee = () => coinbaseFees['BTC']['USD'];

let fromBTCToUSDFee = () => coinbaseFees['USD']['BTC'];

let fromCoinToCoinFee = (fromCoin, toCoin) => {
  return bittrexFees[fromCoin.toUpperCase][toCoin.toUperCase];
};

/* Calculating Totals */

let fromUSDToBTC = amount => {
  return amount / coinbaseRate['BTC']['USD'] + fromUSDToBTCFee();
};

let fromBTCToUSD = amount => {
  return amount / coinbaseRate['USD']['BTC'] + fromBTCToUSDFee();
};

let fromCoinToCoin = (fromCoin, fromAmount, toCoin) => {
  let fee = fromCoinToCoinFee(fromCoin, toCoin);
  return (
    fromAmount / bittrexRate[fromCoin.toUpperCase()][toCoin.toUpperCase()] -
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
