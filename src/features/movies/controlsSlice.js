import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  isFavourite: false,
  callRatings: false,
};

const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    checkIfFavourite: (state, action) => {
      state.isFavourite = action.payload;
    },
    callRatingsonChange: (state, action) => {
      state.callRatings = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setHover: (state, action) => {
      state.hover = action.payload;
    },
  },
});

export const {
  setToggle,
  checkIfFavourite,
  callRatingsonChange,
  setRating,
  setHover,
} = controlsSlice.actions;

export const selectToggle = (state) => state.controls.toggle;
export const selectIfFavourite = (state) => state.controls.isFavourite;
export const selectCallRatingsonChange = (state) => state.controls.callRatings;
export const selectRating = (state) => state.controls.rating;
export const selectHover = (state) => state.controls.hover;

export default controlsSlice.reducer;
