import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

export const marginSlice = createSlice({
  name: "margin",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = marginSlice.actions;

export default marginSlice.reducer;
