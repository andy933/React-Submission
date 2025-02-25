import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { notificationChange } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setSignedInUser(state, action) {
      return action.payload;
    },
  },
});

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedinUserJSON = window.localStorage.getItem("loggedinBlogUser");

    if (loggedinUserJSON) {
      const user = JSON.parse(loggedinUserJSON);
      blogService.setToken(user.token);
      dispatch(setSignedInUser(user));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedinBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setSignedInUser(user));
      dispatch(notificationChange(`Dear ${user.name}, Welcome!`, "success"));
      setTimeout(() => {
        dispatch(notificationChange("", ""));
      }, 20000);
    } catch (exception) {
      dispatch(notificationChange("Incorrect username or password", "danger"));
      setTimeout(() => {
        dispatch(notificationChange("", ""));
      }, 20000);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(setSignedInUser(null));
  };
};

export const { setSignedInUser } = userSlice.actions;

export default userSlice.reducer;
