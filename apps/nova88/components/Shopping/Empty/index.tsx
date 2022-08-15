import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { usePopBox } from "common/hooks"
import { useAppSelector } from "store"
import { selectedIsLogin } from "service/slice/auth"

interface IEmptyProps {
	isFavorite: boolean
}

const Empty: FC<IEmptyProps> = ({ isFavorite }) => {
	const isLogin = useAppSelector(selectedIsLogin)
	const { t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	return isFavorite && !isLogin ? (
		<div className="products-empty">
			<div className="animation">
				<i className="icon icon-heart-fill"></i>
			</div>
			<div className="title">{t("MyFavoritesList")}</div>
			<button
				onClick={() => {
					setPopBoxType({
						type: "login",
					})
				}}
				className="btn-login">
				{t("LOGIN")}
			</button>
		</div>
	) : (
		<div className="noData">
			<i className="icon icon-alarm" />
			{t("NoData")}
		</div>
	)
}

export default Empty
