import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { createContext } from "react"
import { api_accountStrict_getCustProfile } from "../../service/api/accountStrict";

export const userInfoContext = createContext({ isLogin: false })
export const popBoxContext = createContext({})

const Wrapper = ({ children }) => {
  const { t } = useTranslation()
  const [userInfo, setUserInfo] = useState({
    isLogin: null,
    langId: "en",
    userName: t("Guest"),
  })
  const [popBox, setPopBox] = useState({
    isOpen: false,
    popBoxType: null
  });

  useEffect(async () => {
    const result = await api_accountStrict_getCustProfile()
    const data = result.data
    setUserInfo(prev => ({
      ...prev, ...data
    }))
  }, [])

  return (
    <userInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <popBoxContext.Provider value={{popBox, setPopBox}}>
        {children}
      </popBoxContext.Provider>
    </userInfoContext.Provider>
  )
}

export default Wrapper
