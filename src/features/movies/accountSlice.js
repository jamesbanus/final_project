import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  message: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLogIn: (state) => {
      state.loggedIn = !state.loggedIn;
    },
    clearInputs: (state) => {
      state.email = "";
      state.password = "";
      state.message = "";
    },
    setMessage: (state, action) => {
      if (action.payload === 0) {
        state.message = "Bad E-mail or Password";
      } else if (action.payload === 2) {
        state.message = "Already Registered! Please Log In";
      } else {
        state.message = action.payload;
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const {
  setEmail,
  setPassword,
  setLogIn,
  clearInputs,
  setMessage,
  setToken,
  clearToken,
} = accountSlice.actions;

export const selectEmail = (state) => state.account.email;
export const selectPassword = (state) => state.account.password;
export const selectMessage = (state) => state.account.message;
export const selectLogin = (state) => state.account.loggedIn;
export const selectToken = (state) => state.account.token;

export default accountSlice.reducer;
