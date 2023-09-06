import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

export const forceMunSlice = createSlice({
  name: "forceMun",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = forceMunSlice.actions;

export default forceMunSlice.reducer;
