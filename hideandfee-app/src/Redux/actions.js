export const setTotal = (total) =>  {
  return {
    type: "SET_TOTAL",
    total: total,
  }
}

export const isHardwareWallet = (walletPresent) =>  {
  return {
    type: "SET_HARDWARE_WALLET",
    isHardwareWallet: walletPresent,
  }
}

export const setCoinIHave = (coin) =>  {
  return {
    type: "SET_COIN_I_HAVE",
    coinIHave: coin,
  }
}

export const setCoinIWant = (coin) =>  {
  return {
    type: "SET_COIN_I_WANT",
    coinIWant: coin,
  }
}

export const setSteps = (steps) =>  {
  return {
    type: "SET_STEPS",
    steps: steps,
  }
}

export const setAmount = (amount) =>  {
  return {
    type: "SET_AMOUNT",
    amount: amount,
  }
}
