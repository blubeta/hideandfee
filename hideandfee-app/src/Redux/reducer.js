prodState = {
  total: 0.00
  isHardwareWallet: false,
  coinIHave: "",
  coinIWant: "",
  amount: 0,
  steps: [], /*{title: "", description: "", btcPrice: 0, fiatPrice: 0}*/
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
        total: action.total
      };
    case "SET_COIN_I_HAVE":
      return {
        ...state,
        total: action.total
      };
    case "SET_COIN_I_WANT":
      return {
        ...state,
        total: action.total
      };
    case "SET_STEPS":
      return {
        ...state,
        total: action.total
      };
    case "SET_AMOUNT":
      return {
        ...state,
        total: action.total
      };
    default:
      return state;
  }
}

export default reducer;
