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
      console.log(action.payload);
      if (action.payload === 0) {
        state.message = "Bad E-mail or Password";
      }
      if (action.payload === 2) {
        state.message = "Already Registered! Please Log In";
      }
    },
  },
});

export const { setEmail, setPassword, setLogIn, clearInputs, setMessage } =
  accountSlice.actions;

export const selectEmail = (state) => state.account.email;
export const selectPassword = (state) => state.account.password;
export const selectMessage = (state) => state.account.message;

export default accountSlice.reducer;
