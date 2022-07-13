import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    langId: "en",
    userName:"Guest"
  },
  reducers: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    },
    setLangId(state,action){
      state.langId=action.payload
    },
    setUserName(state,action){
      state.userName=action.payload
    },
    setUserInfo(state,action){
      state={...state,...action.payload}
    }
  }
})
export const userActions = userSlice.actions
export default userSlice
