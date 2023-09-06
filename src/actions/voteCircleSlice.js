import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

export const voteCircleSlice = createSlice({
  name: "voteCircles",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = voteCircleSlice.actions;

export default voteCircleSlice.reducer;
