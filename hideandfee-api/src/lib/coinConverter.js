import coinbaseAPI from "./coinbaseAPI";
import bittrexAPI from "./bittrexAPI";
import fees from "../models/ExchangeFees";

let coinbaseConversion = (fromCoin, toCoin) => {
  return new Promise((resolve, reject) => {
    coinbaseAPI
      .getExchangeRates(fromCoin)
      .then(
        resp => {
          resolve({ rate: parseFloat(resp.data.rates[toCoin]) });
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        reject({ err: err });
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

let convertFromUSDTtoBTC = amount => {
  return new Promise((resolve, reject) => {
    coinbaseConversion("USD", "BTC")
      .then(resp => {
        let resultingBTCAmount = amount * resp.rate;
        resolve(resultingBTCAmount);
      })
      .catch(err => {
        reject("Error converting from USDT to BTC");
      });
  });
};

let convertFromBTCtoUSDT = amount => {
  /* Misnomer, USDT by convention but USD because coinbase only does USD */
  return new Promise((resolve, reject) => {
    coinbaseConversion("BTC", "USD")
      .then(resp => {
        let resultingUSDAmount = amount * resp.rate;
        console.log(`Resulting USD Amount ${resultingUSDAmount}`);
        resolve(resultingUSDAmount);
      })
      .catch(err => {
        reject("Error converting from USDT to BTC");
      });
  });
};

let calcTotalCoin = (rate, amount) => {
  return amount / rate;
};

let formatResultSteps = (
  title,
  description,
  btcPrice,
  fiatPrice,
  totalCoins
) => {
  return { title, description, btcPrice, fiatPrice, totalCoins };
};

let convertFromCoinToCoin = (fromCoin, fromAmount, toCoin) => {
  /* lelz -> this needs major restructure =P Don't judge */

  let resultSteps = [];
  let feeAmount, totalToCoins, USDToBTCRate, BTCToUSDRate;

  let BTCToUSD = (amount, rate) => {
    return amount * rate;
  };

  let USDToBTC = (amount, rate) => {
    return amount * rate;
  };

  let CoinToBTC = (amount, rate) => {
    return rate / amount;
  };

  return new Promise((resolve, reject) => {
    bittrexConversion("USDT", "BTC").then(usdtobtc => {
      BTCToUSDRate = usdtobtc.rate;
      USDToBTCRate = parseFloat(1 / usdtobtc.rate);

      if (fromCoin == "USDT") {
        feeAmount = fromAmount * fees.depositFees.Coinbase.achPercent;
        convertFromUSDTtoBTC(fromAmount - feeAmount).then(
          resultingBTCAmount => {
            resultSteps.push(
              formatResultSteps(
                "USD to BTC",
                "Coinbase Purchase",
                USDToBTC(feeAmount, USDToBTCRate),
                feeAmount,
                resultingBTCAmount
              )
            );

            if (toCoin == "BTC") {
              resolve(resultSteps);
            } else {
              bittrexConversion("BTC", toCoin).then(resp => {
                console.log(
                  `Rate: ${
                    resp.rate
                  } - Resulting BTC Amount: ${resultingBTCAmount}`
                );

                feeAmount =
                  resultingBTCAmount * fees.tradingFees.Bittrex.percent;
                totalToCoins = calcTotalCoin(
                  resp.rate,
                  resultingBTCAmount - feeAmount
                );

                resultSteps.push(
                  formatResultSteps(
                    `BTC to ${toCoin}`,
                    "Coinbase to Bittrex",
                    feeAmount,
                    BTCToUSD(feeAmount, BTCToUSDRate),
                    totalToCoins
                  )
                );

                resolve(resultSteps);
              });
            }
          }
        );
      } else if (fromCoin == "BTC") {
        if (toCoin == "USDT") {
          convertFromBTCtoUSDT(fromAmount).then(resultingUSDTAmount => {
            feeAmount =
              resultingUSDTAmount * fees.withdrawalFees.Coinbase.percent;

            resultSteps.push(
              formatResultSteps(
                "BTC to USD",
                "Coinbase Withdrawal",
                USDToBTC(feeAmount, USDToBTCRate),
                feeAmount,
                resultingUSDTAmount
              )
            );
            resolve(resultSteps);
          });
        } else {
          bittrexConversion(fromCoin, toCoin)
            .then(resp => {
              feeAmount = fromAmount * fees.tradingFees.Bittrex.percent;
              totalToCoins = calcTotalCoin(resp.rate, fromAmount - feeAmount);
              resultSteps.push(
                formatResultSteps(
                  "BTC to USD",
                  "Bittrex Trading",
                  CoinToBTC(feeAmount, resp.rate),
                  BTCToUSD(feeAmount, BTCToUSDRate),
                  totalToCoins
                )
              );
              resolve(resultSteps);
            })
            .catch(err => {
              reject("Error in convertFromCoinToCoin1");
            });
        }
      } else {
        if (toCoin == "USDT" || toCoin == "BTC") {
          /* fromCoin needs to go as second parameters as exchanges don't treat it 2 ways */

          let adjustedBTCAmount, BTCTradingFee;

          bittrexConversion("BTC", fromCoin)
            .then(resp => {
              console.log(`Rate for ${fromCoin} -> BTC: ${resp.rate}`);

              adjustedBTCAmount = resp.rate * fromAmount;
              feeAmount = fromAmount * fees.tradingFees.Bittrex.percent;
              BTCTradingFee = feeAmount * resp.rate;

              resultSteps.push(
                formatResultSteps(
                  `${fromCoin} to BTC`,
                  "Bittrex Trading",
                  BTCTradingFee,
                  BTCToUSD(BTCTradingFee, BTCToUSDRate),
                  adjustedBTCAmount
                )
              );

              if (toCoin == "BTC") {
                resolve(resultSteps);
              } else {
                convertFromBTCtoUSDT(adjustedBTCAmount).then(
                  resultingUSDAmount => {
                    feeAmount = 0;

                    resultSteps.push(
                      formatResultSteps(
                        "BTC to BTC",
                        "Bittrex Withdrawal Fee",
                        feeAmount,
                        BTCToUSD(feeAmount, BTCToUSDRate),
                        resultingUSDAmount
                      )
                    );

                    feeAmount =
                      resultingUSDAmount * fees.withdrawalFees.Coinbase.percent;

                    resultSteps.push(
                      formatResultSteps(
                        `BTC to USD`,
                        "Coinbase Deposit",
                        USDToBTC(feeAmount, USDToBTCRate),
                        feeAmount,
                        resultingUSDAmount - feeAmount
                      )
                    );
                    resolve(resultSteps);
                  }
                );
              }
            })
            .catch(err => {
              reject("Error in convertFromCoinToCoin toCoin USDT");
            });
        } else {
          bittrexConversion(fromCoin, toCoin)
            .then(resp => {
              feeAmount = fromAmount * fees.tradingFees.Bittrex.percent;
              totalToCoins = calcTotalCoin(resp.rate, fromAmount - feeAmount);

              resultSteps.push(
                formatResultSteps(
                  `${fromCoin} to ${toCoin}`,
                  "Bittrex Trading",
                  CoinToBTC(feeAmount, resp.rate),
                  BTCToUSD(feeAmount, BTCToUSDRate),
                  totalToCoins
                )
              );
              resolve(calcTotalCoin(resp.rate, fromAmount));
            })
            .catch(err => {
              reject("Error in convertFromCoinToCoin2");
            });
        }
      }
    });
  });
};

export default {
  coinbaseConversion: coinbaseConversion,
  bittrexConversion: bittrexConversion,
  convertFromCoinToCoin: convertFromCoinToCoin
};
