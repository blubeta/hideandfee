function setTotal(total) {
  return {
    type: "SET_TOTAL",
    total: total,
  }
}

function isHardwareWallet(walletPresent) {
  return {
    type: "SET_HARDWARE_WALLET",
    isHardwareWallet: walletPresent,
  }
}

function setCoinIHave(coin) {
  return {
    type: "SET_COIN_I_HAVE",
    coinIHave: coin,
  }
}

function setCoinIHave(coin) {
  return {
    type: "SET_COIN_I_WANT",
    coinIWant: coin,
  }
}

function setSteps(steps) {
  return {
    type: "SET_STEPS",
    steps: steps,
  }
}

function setAmount(amount) {
  return {
    type: "SET_AMOUNT",
    amount: amount,
  }
}

export {
  setTotal,
  isHardwareWallet,
  setCoinIHave,
  setCoinIWant,
}
