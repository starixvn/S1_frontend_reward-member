import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { checkSignInAsync, getCustProfileAsync, logoutAsync } from "./thunk";
import { ICustProfile } from "./type";

// * 定義 state 的 interface
interface IStateProps {
  isLogin: null | boolean;
  profile: ICustProfile;
}

const initialState: IStateProps = {
  isLogin: null,
  profile: {
    langId: "en",
    userName: "Guest"
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setLangId: (state, action) => {
      state.profile.langId = action.payload;
    }
  },
  extraReducers: build =>
    build
      .addCase(checkSignInAsync.fulfilled, (state, action) => {
        const isLogin = action.payload;
        state.isLogin = isLogin;
      })
      .addCase(getCustProfileAsync.fulfilled, (state, action) => {
        const profile = action.payload;
        state.profile = profile;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        const success = action.payload;

        if (success) {
          state.isLogin = null;
          state.profile = undefined;
        }
      })
});

// * RootState 可以讓我們知道 state 的 interface
export const selectedIsLogin = ({ auth }: RootState) => auth.isLogin;
export const selectedProfile = ({ auth }: RootState) => auth.profile;
export const selectedCurrencyId = ({ auth }: RootState) =>
  auth.profile?.currencyId;
export const selectedUserName = ({ auth }: RootState) => auth.profile?.userName;
export const selectedLangId = ({ auth }: RootState) => auth.profile?.langId;

export const { setIsLogin, setLangId } = authSlice.actions;
export const authReducer = authSlice.reducer;
