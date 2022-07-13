import { createSlice } from "@reduxjs/toolkit"

const giftSlice = createSlice({
  name: "gift",
  initialState: {
    giftList:[]
  },
  reducers: {
    addGiftList(state,actions){
      state.giftList.push(
        actions.payload
      )
    }
  }
})
export const giftActions = giftSlice.actions
export default giftSlice
