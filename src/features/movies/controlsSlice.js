import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  favouriteImage: false,
};

const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    setFavouriteImage: (state, action) => {
      state.favouriteImage = action.payload;
    },
  },
});

export const { setToggle, setFavouriteImage } = controlsSlice.actions;

export const selectToggle = (state) => state.controls.toggle;
export const selectFavouriteImage = (state) => state.controls.favouriteImage;

export default controlsSlice.reducer;
