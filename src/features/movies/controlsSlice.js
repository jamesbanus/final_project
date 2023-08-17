import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.toggle = true;
    },
  },
});

export const { setOpen } = controlsSlice.actions;

export const selectToggle = (state) => state.controls.toggle;

export default controlsSlice.reducer;
