import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
    openLogin: (state, action) => {
      state.isLoginOpen = true;
    },
    closeLogin: (state, action) => {
      state.isLoginOpen = false;
    },
  },
});

export const { openModal, closeModal, openLogin, closeLogin } =
  modalSlice.actions;

export const selectOpen = (state) => state.modal.isOpen;
export const selectLoginOpen = (state) => state.modal.isLoginOpen;

export default modalSlice.reducer;
