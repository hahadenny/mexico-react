import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "pres"
};

export const raceTypeSlice = createSlice({
  name: "raceType",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = raceTypeSlice.actions;

export default raceTypeSlice.reducer;
