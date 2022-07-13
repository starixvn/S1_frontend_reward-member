import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import InputDropDown from "../common/components/Dropdown/DropDown"
import Wrapper from "../common/components/Wrapper"
import Layout from "../common/components/Layout/layout"

const Shopping = () => {
	const menuList = ["BEST SELLERS", "WHAT'S NEW", "SALE"]
	const [activeMenuItem, setActiveMenuItem] = useState(menuList[0])
	const [inputDropDownCategory, setInputDropDownCategory] = useState("")
	const [inputDropDownFrom, setInputDropDownFrom] = useState("")
	const inputDropDownItemList = {
		category: [
			"HOME APPLIANCES",
			"HEALTH & PERSONAL CARE",
			"HOME THEATRE SYSTEM & SPEAKERS",
			"COMPUTING & PHONE",
			"SPORTS APPAREL & ACCESSORIES",
			"LIFESTYLE & TRAVEL",
		],
		from: ["Low → High cost", "High → Low cost", "A → Z", "Z → A"],
	}
	const productList = [
		{
			img: "https://store.0814media.net/img/product/item.png",
			cost: 15999,
			label: "iPhone 12 (64G/128G)",
			quantity: "Qty:5",
			btn: "ADD TO CART",
			status: "active",
		},
		{
			img: "https://store.0814media.net/img/product/item.png",
			cost: 15999,
			label: "iPhone 12 (64G/128G)",
			quantity: "Qty:5",
			btn: "SOLD OUT",
			status: "active",
		},
		{
			img: "https://store.0814media.net/img/product/item.png",
			cost: 15999,
			label: "iPhone 12 (64G/128G)",
			quantity: "Qty:5",
			btn: "ADD TO CART",
			status: "active",
		},
	]
	const productBtnText = (text, status) => {
		if (text === "ADD TO CART" && status === "active") {
			return "icon-cart"
		} else if (text === "SOLD OUT") {
			return "icon-ban"
		} else {
			return "icon-checkmark"
		}
	}
	return (
		<Wrapper>
			<Layout>
				<main className="shopping-page">
					<div className="swiper-container">
						<Swiper className="swiper-wrapper">
							<SwiperSlide className="swiper-slide">
								<img
									src="https://store.0814media.net/img/banner.jpg"
									alt="banner"
								/>
							</SwiperSlide>
							<SwiperSlide className="swiper-slide">
								<img
									src="https://store.0814media.net/img/banner.jpg"
									alt="banner"
								/>
							</SwiperSlide>
							<SwiperSlide className="swiper-slide">
								<img
									src="https://store.0814media.net/img/banner.jpg"
									alt="banner"
								/>
							</SwiperSlide>
						</Swiper>
					</div>
					<div className="products-group container-xxl">
						<div className="row">
							<div className="products-menu">
								{menuList.map((value, index) => (
									<a
										className={activeMenuItem === value && "active"}
										onClick={() => {
											setActiveMenuItem(value)
										}}
										key={index}
									>
										{value}
									</a>
								))}
								<button>More...</button>
							</div>
							<div className="select">
								<div className="inputBox-null" />
								<InputDropDown
									title="Category"
									status={inputDropDownCategory}
									itemList={inputDropDownItemList.category}
									onClickHandle={() =>
										setInputDropDownCategory(
											inputDropDownCategory ? "" : "active"
										)
									}
								/>
								<InputDropDown
									title="From"
									status={inputDropDownFrom}
									itemList={inputDropDownItemList.from}
									onClickHandle={() =>
										setInputDropDownFrom(inputDropDownFrom ? "" : "active")
									}
								/>
							</div>
							<div className="product-list">
								{productList.map((obj, index) => (
									<div
										key={index}
										className={`product ${!obj.quantity ? "empty" : ""}`}
									>
										<div className="icon icon-fire" />
										<div className="icon icon-shinyblack" />
										<div className="icon icon-percent" />
										<div>
											<img src={obj.img} alt="any" />
										</div>
										<div className="btn">
											<button className="icon icon-heart-fill" />
											<button className="icon icon-arrows-fullscreen" />
										</div>
										<div className="icon icon-coin">{obj.cost}</div>
										<div className="product-name">{obj.label}</div>
										<div className="qty">{obj.quantity}</div>
										<button
											className={`icon ${productBtnText(obj.btn, obj.status)} ${
												obj.status
											}`}
										>
											{obj.btn}
										</button>
										<div className="bigPup">
											<a className="icon icon-arrows-angle-contract" />
											<div>
												<img src={obj.img} alt="any" />
											</div>
											<button
												className={`icon ${productBtnText(
													obj.btn,
													obj.status
												)} ${obj.status}`}
											>
												{obj.btn}
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="loading">
							<div />
							<div />
							<div />
							<div />
						</div>
					</div>
				</main>
			</Layout>
		</Wrapper>
	)
}

export default Shopping
