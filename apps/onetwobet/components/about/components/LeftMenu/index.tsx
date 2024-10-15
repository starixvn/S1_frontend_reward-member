import React, { FC } from "react"
import classNames from "classnames"
import { useTranslation } from "react-i18next"
import { mineMenuList } from "@apps/onetwobet/components/about/constants"
import { useRouter } from "next/router"
import { useAppSelector } from "@apps/onetwobet/store"
import { selectedIsLogin } from "@apps/onetwobet/service/slice/auth"
import { usePopBox } from "@apps/onetwobet/common/hooks"

interface ILeftMenuProps {
	activePath: string
}

const LeftMenu: FC<ILeftMenuProps> = ({ activePath }) => {
	const { t } = useTranslation()
	const route = useRouter()
	const isLogin = useAppSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()

	return (
		<div className="leftMenu">
			<div className="leftMenu">
				{mineMenuList.map(item => (
					<a
						onClick={() => {
							if (item.authRequired && !isLogin) {
								setPopBoxType({
									type: "login",
								})
							} else {
								route.push(item.path)
							}
						}}
						key={item.id}
						className={classNames("item", {
							active: `/${activePath}` === item.path,
						})}>
						<span>{t(item.displayKey).toUpperCase()}</span>
					</a>
				))}
			</div>
		</div>
	)
}

export default LeftMenu
