import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null
};

export const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { update } = partySlice.actions;

export default partySlice.reducer;
