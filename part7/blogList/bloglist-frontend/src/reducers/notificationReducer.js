const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};

export const notificationChange = (info, result) => {
  return {
    type: "SET_NOTIFICATION",
    payload: { info, result },
  };
};

export default notificationReducer;
