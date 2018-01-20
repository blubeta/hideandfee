prodState = {
  total: 0.00
}

const reducer = (state = prodState, { type, ...action }) => {
  switch (type) {
    case "SET_TOTAL":
      return {
        ...state,
        total: action.total
      };
    default:
      return state;
  }
}

export default reducer;
