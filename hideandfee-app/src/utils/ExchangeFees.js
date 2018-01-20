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
  Bittrex: {
    BTC: {
      USD: 0.001,
      ETH: 0.0001,
      XRP: 0.2
    }
  }
};

export default exchanges;
