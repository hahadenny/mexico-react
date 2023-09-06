import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

export const turnoutSlice = createSlice({
  name: "turnout",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = turnoutSlice.actions;

export default turnoutSlice.reducer;
