import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

export const forceDisSlice = createSlice({
  name: "forceDis",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = forceDisSlice.actions;

export default forceDisSlice.reducer;
