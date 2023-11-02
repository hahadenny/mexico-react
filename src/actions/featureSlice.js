import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null
};

export const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = featureSlice.actions;

export default featureSlice.reducer;
