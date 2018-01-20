import coinbaseAPI from "./coinbaseAPI";
import bittrexAPI from "./bittrexAPI";

let coinbaseConversion = (fromCoin, toCoin) => {
  return new Promise((resolve, reject) => {
    coinbaseAPI
      .getExchangeRates(fromCoin)
      .then(resp => {
        resolve({ rate: parseFloat(resp.data.rates[toCoin]) });
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
        let lastBuyRate = resp.data.result.buy[0].Rate;
        let lastSellRate = resp.data.result.sell[0].Rate;
        resolve({ rate: lastBuyRate });
      })
      .catch(err => {
        reject(err);
      });
  });
};

let convertFromUSDtoBTC = amount => {
  return new Promise((resolve, reject) => {
    coinbaseConversion("USD", "BTC")
      .then(resp => {
        let resultingBTCAmount = amount * resp.rate;
        resolve(resultingBTCAmount);
      })
      .catch(err => {
        reject("Error converting from USD to BTC");
      });
  });
};

let convertFromBTCtoUSD = amount => {
  return new Promise((resolve, reject) => {
    coinbaseConversion("BTC", "USD")
      .then(resp => {
        let resultingUSDAmount = amount * resp.rate;
        resolve(resultingUSDAmount);
      })
      .catch(err => {
        reject("Error converting from USD to BTC");
      });
  });
};

let convertFromCoinToCoin = (fromCoin, fromAmount, toCoin) => {
  return new Promise((resolve, reject) => {
    if (fromCoin == "USD") {
      convertFromUSDtoBTC(fromAmount).then(resultingBTCAmount => {
        if (toCoin == "BTC") {
          resolve(convertFromBTCtoUSD(resultingBTCAmount));
        } else {
          bittrexConversion("BTC", toCoin).then(resp => {
            resolve(resp.rate * resultingBTCAmount);
          });
        }
      });
    } else if (fromCoin == "BTC") {
      if (toCoin == "USD") {
        convertFromBTCtoUSD(fromAmount).then(resultingUSDAmount => {
          resolve(resultingUSDAmount);
        });
      } else {
        bittrexConversion(fromCoin, toCoin)
          .then(resp => {
            resolve(resp.rate * fromAmount);
          })
          .catch(err => {
            reject("Error in convertFromCoinToCoin1");
          });
      }
    } else {
      bittrexConversion(fromCoin, toCoin)
        .then(resp => {
          resolve(resp.rate * fromAmount);
        })
        .catch(err => {
          reject("Error in convertFromCoinToCoin2");
        });
    }
  });
};

export default {
  coinbaseConversion: coinbaseConversion,
  bittrexConversion: bittrexConversion,
  convertFromCoinToCoin: convertFromCoinToCoin
};
