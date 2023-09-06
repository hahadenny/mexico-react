import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "2012"
};

export const yearSlice = createSlice({
  name: "year",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = yearSlice.actions;

export default yearSlice.reducer;
