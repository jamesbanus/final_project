import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  message: "",
  delete: false,
  limitUser: false,
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
    setNewPassword: (state, action) => {
      state.password2 = action.payload;
    },
    confirmNewPassword: (state, action) => {
      state.password3 = action.payload;
    },
    setLogIn: (state) => {
      state.loggedIn = !state.loggedIn;
    },
    clearInputs: (state) => {
      state.email = "";
      state.password = "";
      state.message = "";
      state.password2 = "";
      state.password3 = "";
    },
    setMessage: (state, action) => {
      if (action.payload === 0) {
        state.message = "Bad E-mail or Password";
      } else if (action.payload === 2) {
        state.message = "Already Registered! Please Log In";
      } else if (action.payload === 200) {
        state.message = "Limit Exceeded, please wait 1 minute";
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
    deleteConfirm: (state) => {
      state.delete = !state.delete;
    },
    changePassword: (state) => {
      state.passwordChange = !state.passwordChange;
    },
    limitUser: (state, action) => {
      state.limitUser = !state.limitUser;
      console.log(state.limitUser);
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
  deleteConfirm,
  changePassword,
  setNewPassword,
  confirmNewPassword,
  limitUser,
} = accountSlice.actions;

export const selectEmail = (state) => state.account.email;
export const selectPassword = (state) => state.account.password;
export const selectMessage = (state) => state.account.message;
export const selectLogin = (state) => state.account.loggedIn;
export const selectToken = (state) => state.account.token;
export const checkDelete = (state) => state.account.delete;
export const checkPasswordChange = (state) => state.account.passwordChange;
export const selectPassword2 = (state) => state.account.password2;
export const selectPassword3 = (state) => state.account.password3;
export const checkLimitUser = (state) => state.account.limitUser;

export default accountSlice.reducer;
