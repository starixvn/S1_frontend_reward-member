import { createSlice } from "@reduxjs/toolkit";

const popBoxSlice = createSlice({
  name: "popBox",
  initialState: {
    isOpen: false,
    popBoxType: null,
    popBoxProps:{}
  },
  reducers: {
    popClose(state) {
      state.popBoxType = null;
      state.popBoxProps = {};
    },
    setPopBoxType(state, action) {
      const { type,...props } = action.payload;
      state.popBoxProps = props
      state.popBoxType = type;
    }

  }
});
export const popBoxActions = popBoxSlice.actions;
export default popBoxSlice;
