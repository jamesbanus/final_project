import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { setToggle } = controlsSlice.actions;

export const selectToggle = (state) => state.controls.toggle;

export default controlsSlice.reducer;
