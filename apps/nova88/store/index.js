import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import popBoxSlice from "./popBoxSlice";
import giftSlice from "./giftSlice";

const store = configureStore({
  reducer:{
    user: userSlice.reducer,
    popBox:popBoxSlice.reducer,
    gift:giftSlice.reducer
  }
})
export default store
