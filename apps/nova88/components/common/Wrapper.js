import { useEffect } from "react";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import { setCookie } from "./common";
import { api_store_GetGiftList } from "../../service/api/store";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { giftActions } from "../../store/giftSlice";

const Wrapper = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const regTime = useSelector((state) => state.user.regTime);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      api_accountStrict_GetCustProfile().then(res => {
        if (res.data.errorCode === 0) {
          const { data } = res.data;
          setCookie("nova88LangId", data.langId);
          dispatch(userActions.setUserInfo(data));
        }
      });
    }
  }, [isLogin, regTime]);

  useEffect(async () => {
    const res = await api_store_GetGiftList({
      langId: "en",
      categoryIds: [1],
      tags: null,
      orderByField: null,
      desc: true
    });
    if (res.data.errorCode === 0) {
      const { data } = res.data;
      console.log('data',data)
      dispatch(giftActions.addGiftList(data))
    }
  }, []);
  return (
    <>
      {children}
    </>
  );
};

export default Wrapper;
