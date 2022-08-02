import { usePopBox } from "common/hooks"
import React from "react"
import { useSelector } from "react-redux"
import { selectedIsLogin } from "service/slice/auth"
import { logoutAsync } from "service/slice/auth/thunk"
import { useAppDispatch } from "store"
import { useRouter } from "next/router"
import { imageUrl } from "config"

const Header = () => {
	const route = useRouter()
	const dispatch = useAppDispatch()
	const isLogin = useSelector(selectedIsLogin)

	const { setPopBoxType } = usePopBox()

	const handleLogout = async () => {
		await dispatch(logoutAsync())
	}

	const loginAfter = (
		<>
			<a className="icon icon-diamond">
				<span>Reward Points</span>
				10,700
			</a>
			<div className="memberFile">
				<div className="vipAnimation">
					<a>
						<img src="https://image.0814media.net/VIP/img/vip06.png" alt="" />
					</a>
				</div>
				<div className="memberID">
					<button className="icon-keyboard_arrow_down">memberID</button>
					<div>
						<a>My Points</a>
						<a>My Purchase</a>
					</div>
				</div>
			</div>
			<a className="icon icon-email">
				<div className="msgPop" style={{ display: "none" }}>
					<div>Weekly Retention Bonus1</div>
					<button className="icon icon-close"></button>
				</div>
			</a>

			<div className="country">
				<button className={`flag ch`} />
				<div className="countryList">
					<div className="countryName">Malaysia</div>
					<div className="flag ch">
						<buton>English</buton>
						<buton>简体中文</buton>
						<buton>Malay</buton>
					</div>
					<div className="countryName">Thailand</div>
					<div className="flag th">
						<buton>ไทย</buton>
					</div>
					<div className="countryName">Indonesia</div>
					<div className="flag id">
						<buton>Bhs Indonesia</buton>
					</div>
				</div>
			</div>
			<div onClick={() => route.replace("/Cart")} className="shoppingCar">
				<div className="icon icon-cart" />
				<span>99+</span>
			</div>
			<button onClick={handleLogout} className="icon icon-exit" />
			<a className="novaLogo">
				<img src={`${imageUrl}/img/novalogo.png`} alt="any" />
			</a>
		</>
	)
	const loginBefore = (
		<>
			<a className="icon icon-email">
				<div className="msgPop" style={{ display: "none" }}>
					<div>Weekly Retention Bonus1</div>
					<button className="icon icon-close"></button>
				</div>
			</a>
			<div className="country">
				<button className={`flag ch`} />
				<div className="countryList">
					<div className="countryName">Malaysia</div>
					<div className="flag ch">
						<buton>English</buton>
						<buton>简体中文</buton>
						<buton>Malay</buton>
					</div>
					<div className="countryName">Thailand</div>
					<div className="flag th">
						<buton>ไทย</buton>
					</div>
					<div className="countryName">Indonesia</div>
					<div className="flag id">
						<buton>Bhs Indonesia</buton>
					</div>
				</div>
			</div>
			<div onClick={() => route.replace("/Cart")} className="shoppingCar">
				<div className="icon icon-cart" />
				<span>99+</span>
			</div>
			<a className="novaLogo">
				<img src={`${imageUrl}/img/novalogo.png`} alt="" />
			</a>
			<button
				className="login"
				onClick={() => {
					setPopBoxType({
						type: "login",
					})
				}}>
				LOGIN
			</button>
		</>
	)
	const loginStatusPanel = isLogin ? loginAfter : loginBefore
	return (
		<header id="header">
			<div className="header">
				<button className="icon icon-menu" />
				<div className="mobile-menu" />
				<div onClick={() => route.replace("/")} className="logo">
					<a>
						<img src={`${imageUrl}/img/88logo.png`} alt="" />
					</a>
				</div>
				<div className="shoppingCar">
					<div className="icon icon-cart" />
					<span>99+</span>
				</div>
				<div className="function">{loginStatusPanel}</div>
				<div className="menu">
					<div className="tag">
						<div className="home">
							<a href="https://www.nova88.net/" className="icon icon-home" />
							<a href="app.html" className="icon icon-mobile" />
						</div>
						<div>
							<a>SHOPPING</a>
							<a>HOW TO EARN POINTS</a>
							<a>FAQ/T&C</a>
							<a>MY PURCHASE</a>
							<a>MY POINTS</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
