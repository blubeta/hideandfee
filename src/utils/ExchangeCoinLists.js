let exchanges = {
  Coinbase: {
    pairs: {
      USD: {
        BTC: 10
      },
      BTC: {
        USD: 0.001,
        ETH: 0.0001,
        XRP: 0.2
      }
    }
  },
  Binance: {
    BTC: {
      USD: 0.001,
      ETH: 0.0001,
      XRP: 0.2
    },
    ETH: {
      BTC: 0.09
    }
  },
  Bittrex: {
    BTC: {
      USD: 0.001,
      ETH: 0.0001,
      XRP: 0.2
    }
  }
};

export default exchanges;
