const prodState = {
  total: 0.00,
  isHardwareWallet: false,
  coinIHave: "",
  coinIWant: "",
  amount: 0,
  steps: [],
}

const reducer = (state = prodState, { type, ...action }) => {
  switch (type) {
    case "SET_TOTAL":
      return {
        ...state,
        total: action.total
      };
    case "SET_HARDWARE_WALLET":
      return {
        ...state,
        isHardwareWallet: action.isHardwareWallet
      };
    case "SET_COIN_I_HAVE":
      return {
        ...state,
        coinIHave: action.coinIHave
      };
    case "SET_COIN_I_WANT":
      return {
        ...state,
        coinIWant: action.coinIWant
      };
    case "SET_STEPS":
      return {
        ...state,
        steps: action.steps
      };
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.amount
      };
    default:
      return state;
  }
}

export default reducer;
