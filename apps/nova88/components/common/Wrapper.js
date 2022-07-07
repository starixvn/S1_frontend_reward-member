import { useState } from "react"
import { useTranslation } from "react-i18next"
import { createContext } from "react"

const userInfoContext = createContext({ isLogin: false })

const Wrapper = ({ children }) => {
	const { t } = useTranslation()

	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		langId: "en",
		userName: t("Guest"),
	})

	return (
		<userInfoContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</userInfoContext.Provider>
	)
}

export default Wrapper
