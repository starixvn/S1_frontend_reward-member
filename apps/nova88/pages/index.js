import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { imageUrl } from "../config"
import { api_store_GetGiftList } from "../service/api/store"

export function Index() {
	const { t } = useTranslation()

	useEffect(() => {
		api_store_GetGiftList({
			langId: "en",
			categoryIds: [1],
			tags: null,
			orderByField: null,
			desc: true,
		})
	}, [])

	return (
		<>
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<div className="swiper-slide">
						<img src={`${imageUrl}/img/banner_en.jpg`} alt="" />
					</div>
				</div>
				{/* <!-- Add Pagination --> */}
				<div className="swiper-pagination"></div>
				{/* <!-- Add Arrows --> */}
				{/* <!-- <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div> --> */}
			</div>
			{/* /<!-- desktop-index btn-login 不顯示 --> */}
			<div id="indexLogin" className="btn-login">
				LOGIN
			</div>
			{/* <!-- index (2)introduce --> */}
			<div className="introduce container-xxl">
				<div className="row">
					<div className="dearMember col-xl-7">
						<div className="txt">
							<p>{t("Home.BannerTitle")}</p>
							<div>
								We proudly present to you this year’s collection of rewards &
								memorable experiences that awaits you. This is just one of many
								ways we want to celebrate you for being a loyal Nova88 customer.
							</div>
							<button className="seeMore" type="button">
								More..
							</button>
							<div>
								From top of the line home appliances that helps elevate your
								home living, to travel & luxury experiences that helps you
								experience the world: this special 2021 edition of BPO Novo
								Rewords presents to you carefully curated hundreds of items
								across five unique categories that will help bring a smile to
								your face.
							</div>
							<div>
								To redeem, all you need to do is log onto BPO Novo Rewards at
								www nova88. net/en/bponovarewords select your rewords & we ll
								have it delivered right to your doorstep. Getting reworded has
								never been simpler!
							</div>
							<div>
								Thank you being part of our Nova88 family and we hope you’ll be
								pleasantly surprised by the rewards we have in store.
							</div>
							<button className="close" type="button">
								Close..
							</button>
						</div>
						<img src="https://store.0814media.net/img/introducebg.jpg" alt="" />
						<img
							className="npc"
							src="https://store.0814media.net/img/introduce.png"
							alt=""
						/>
					</div>
					<div className="col-xl-5">
						<div className="info">
							<div>Visit Be Part Of Nova88 Rewards Store</div>
							<img src="https://store.0814media.net/img/rewardimg.jpg" alt="" />
						</div>
						<div className="info">
							<div>Your Journey to rewards start here!</div>
							<img
								src="https://store.0814media.net/img/rewardimg-1.jpg"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- index (3) 形象banner --> */}
			<div className="indexImg">
				<div>
					<p>A NEW DECADE OF REWARDS CATALOGUE</p>
					AUGUST 2022 TO JULY 2023
				</div>
				<img src="https://store.0814media.net/img/imgbg.jpg" alt="" />
			</div>
			{/* <!-- index (3) saleBanner --> */}
			<div className="saleImg">
				<div className="txt">
					<div>
						Your Journey To Rewards
						<p>Starts Here</p>
					</div>
					<div>Popular Category</div>
					<div>
						COMPUTING & PHONE
						<button>SHOP NOW</button>
					</div>
				</div>
				<img src="https://store.0814media.net/img/saleimgbg.jpg" alt="" />
			</div>
			{/* <!-- index (4) products --> */}
			<div className="products-group container-xxl">
				<div className="row">
					<div className="products-menu">
						<a href="" className="active">
							BEST SELLERS
						</a>
						<a href="">WHAT S NEW</a>
						<a href="">SALE</a>
						<button>More...</button>
					</div>
					{/* <!-- (4-1) --> */}
					<div className="product-list">
						{/* <!-- 商品頁-單品1 --> */}
						<div className="product">
							{/* <!-- icon + active 開啟商品 hot new sale  --> */}
							<div className="icon icon-fire">HOT</div>
							<div className="icon icon-shinyblack">NEW</div>
							<div className="icon icon-percent active">SALE</div>
							<div>
								<img
									src="https://store.0814media.net/img/product/item.png"
									alt=""
								/>
							</div>
							<div className="btn">
								<button className="icon icon-heart-fill"></button>
								<button className="icon icon-arrows-fullscreen"></button>
							</div>
							<div className="icon icon-coin">15,999</div>
							<div className="product-name">
								iPhone 12 (64G/128G)Up to 60 characters
							</div>
							<div className="qty">Qty:5</div>
							{/* <!-- (4-2) 購物車狀態--> */}
							<button className="icon icon-cart active">ADD TO CART</button>
							<button className="icon icon-checkmark">ADDED TO CART</button>
							<button className="icon icon-ban">SOLD OUT</button>
							{/* <!-- (4-3) 商品放大時--> */}
							<div className="bigPup">
								<a className="icon icon-arrows-angle-contract" href=""></a>
								<div>
									<img
										src="https://store.0814media.net/img/product/item.png"
										alt=""
									/>
								</div>
								{/* <!-- (4-4) 購物車狀態 --> */}
								<button className="icon icon-cart active">ADD TO CART</button>
								<button className="icon icon-checkmark">ADDED TO CART</button>
								<button className="icon icon-ban">SOLD OUT</button>
							</div>
						</div>
						{/* <!-- 商品頁-單品2 --> */}
						<div className="product">
							{/* <!-- icon + active 開啟商品 hot new sale  --> */}
							<div className="icon icon-fire active">HOT</div>
							<div className="icon icon-shinyblack">NEW</div>
							<div className="icon icon-percent">SALE</div>
							<div>
								<img
									src="https://store.0814media.net/img/product/item.png"
									alt=""
								/>
							</div>
							<div className="btn">
								<button className="icon icon-heart-fill"></button>
								<button className="icon icon-arrows-fullscreen"></button>
							</div>
							<div className="icon icon-coin">15,999</div>
							<div className="product-name">
								iPhone 12 (64G/128G)Up to 60 characters
							</div>
							<div className="qty">Qty:5</div>
							<button className="icon icon-cart">ADD TO CART</button>
							<button className="icon icon-checkmark active">
								ADDED TO CART
							</button>
							<button className="icon icon-ban">SOLD OUT</button>
							{/* <!-- (4-3) 商品放大時--> */}
							<div className="bigPup">
								<a className="icon icon-arrows-angle-contract" href=""></a>
								<div>
									<img
										src="https://store.0814media.net/img/product/item.png"
										alt=""
									/>
								</div>
								{/* <!-- (4-4) 購物車狀態 --> */}
								<button className="icon icon-cart active">ADD TO CART</button>
								<button className="icon icon-checkmark">ADDED TO CART</button>
								<button className="icon icon-ban">SOLD OUT</button>
							</div>
						</div>
						{/* <!-- 商品頁-單品3 --> */}
						{/* <!-- product + empty 完售 --> */}
						<div className="product empty">
							{/* <!-- icon + active 開啟商品 hot new sale  --> */}
							<div className="icon icon-fire">HOT</div>
							<div className="icon icon-shinyblack active">NEW</div>
							<div className="icon icon-percent">SALE</div>
							<div>
								<img
									src="https://store.0814media.net/img/product/item.png"
									alt=""
								/>
							</div>
							<div className="btn">
								<button className="icon icon-heart-fill"></button>
								{/* <!-- product + empty 完售 放大商品icon不能點 --> */}
								<button className="icon icon-arrows-fullscreen"></button>
							</div>
							<div className="icon icon-coin">15,999</div>
							<div className="product-name">
								iPhone 12 (64G/128G)Up to 60 characters
							</div>
							<div className="qty">Qty:5</div>
							<button className="icon icon-cart">ADD TO CART</button>
							<button className="icon icon-checkmark">ADDED TO CART</button>
							<button className="icon icon-ban active">SOLD OUT</button>
							{/* <!-- (4-3) 商品放大時--> */}
							<div className="bigPup">
								<a className="icon icon-arrows-angle-contract" href=""></a>
								<div>
									<img
										src="https://store.0814media.net/img/product/item.png"
										alt=""
									/>
								</div>
								{/* <!-- (4-4) 購物車狀態 --> */}
								<button className="icon icon-cart active">ADD TO CART</button>
								<button className="icon icon-checkmark">ADDED TO CART</button>
								<button className="icon icon-ban">SOLD OUT</button>
							</div>
						</div>
						{/* <!-- 商品頁-單品4 --> */}
						<div className="product">
							{/* <!-- icon + active 開啟商品 hot new sale  --> */}
							<div className="icon icon-fire">HOT</div>
							<div className="icon icon-shinyblack">NEW</div>
							<div className="icon icon-percent">SALE</div>
							<div>
								<img
									src="https://store.0814media.net/img/product/item.png"
									alt=""
								/>
							</div>
							<div className="btn">
								<button className="icon icon-heart-fill"></button>
								<button className="icon icon-arrows-fullscreen"></button>
							</div>
							<div className="icon icon-coin">15,999</div>
							<div className="product-name">
								iPhone 12 (64G/128G)Up to 60 characters
							</div>
							<div className="qty">Qty:5</div>
							<button className="icon icon-cart active">ADD TO CART</button>
							<button className="icon icon-checkmark">ADDED TO CART</button>
							<button className="icon icon-ban">SOLD OUT</button>
							{/* <!-- (4-3) 商品放大時--> */}
							<div className="bigPup">
								<a className="icon icon-arrows-angle-contract" href=""></a>
								<div>
									<img
										src="https://store.0814media.net/img/product/item.png"
										alt=""
									/>
								</div>
								{/* <!-- (4-4) 購物車狀態 --> */}
								<button className="icon icon-cart active">ADD TO CART</button>
								<button className="icon icon-checkmark">ADDED TO CART</button>
								<button className="icon icon-ban">SOLD OUT</button>
							</div>
						</div>
						{/* <!-- 商品頁-單品5 --> */}
						<div className="product">
							<div className="icon icon-fire">HOT</div>
							<div className="icon icon-shinyblack">NEW</div>
							<div className="icon icon-percent">SALE</div>
							<div>
								<img
									src="https://store.0814media.net/img/product/item.png"
									alt=""
								/>
							</div>
							<div className="btn">
								<button className="icon icon-heart-fill"></button>
								<button className="icon icon-arrows-fullscreen"></button>
							</div>
							<div className="icon icon-coin">15,999</div>
							<div className="product-name">
								iPhone 12 (64G/128G)Up to 60 characters
							</div>
							<div className="qty">Qty:5</div>
							<button className="icon icon-cart active">ADD TO CART</button>
							<button className="icon icon-checkmark">ADDED TO CART</button>
							<button className="icon icon-ban">SOLD OUT</button>
							{/* <!-- (4-3) 商品放大時--> */}
							<div className="bigPup">
								<a className="icon icon-arrows-angle-contract" href=""></a>
								<div>
									<img
										src="https://store.0814media.net/img/product/item.png"
										alt=""
									/>
								</div>
								{/* <!-- (4-4) 購物車狀態 --> */}
								<button className="icon icon-cart active">ADD TO CART</button>
								<button className="icon icon-checkmark">ADDED TO CART</button>
								<button className="icon icon-ban">SOLD OUT</button>
							</div>
						</div>
						{/* <!-- 商品頁-單品6 --> */}
						<div className="product">
							<div className="icon icon-fire">HOT</div>
							<div className="icon icon-shinyblack">NEW</div>
							<div className="icon icon-percent">SALE</div>
							<div>
								<img
									src="https://store.0814media.net/img/product/item.png"
									alt=""
								/>
							</div>
							<div className="btn">
								<button className="icon icon-heart-fill"></button>
								<button className="icon icon-arrows-fullscreen"></button>
							</div>
							<div className="icon icon-coin">15,999</div>
							<div className="product-name">
								iPhone 12 (64G/128G)Up to 60 characters
							</div>
							<div className="qty">Qty:5</div>
							<button className="icon icon-cart active">ADD TO CART</button>
							<button className="icon icon-checkmark">ADDED TO CART</button>
							<button className="icon icon-ban">SOLD OUT</button>
							{/* <!-- (4-3) 商品放大時--> */}
							<div className="bigPup">
								<a className="icon icon-arrows-angle-contract" href=""></a>
								<div>
									<img
										src="https://store.0814media.net/img/product/item.png"
										alt=""
									/>
								</div>
								{/* <!-- (4-4) 購物車狀態 --> */}
								<button className="icon icon-cart active">ADD TO CART</button>
								<button className="icon icon-checkmark">ADDED TO CART</button>
								<button className="icon icon-ban">SOLD OUT</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- loading --> */}
			<div className="loading">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			{/* <!-- index (5) App Download --> */}
			<div className="appDownload container-xxl">
				<div className="row">
					<div className="col-md-7 col-xl-7">
						<div className="download-txt">
							<img
								className="logo"
								src="https://store.0814media.net/img/novalogo.png"
								alt=""
							/>
							<div className="title">SCAN TO DOWNLOAD</div>
							THE MOST USER FRIENDLY APP
							<div className="qr-group">
								<div className="qrCode">
									<div className="icon icon-android">
										<span>Android</span>
									</div>
									<img
										src="https://store.0814media.net/img/qrcode.svg"
										alt=""
									/>
									<button>DOWNLOAD</button>
								</div>
								<div className="qrCode">
									<div className="icon icon-appleinc">
										<span>iOS</span>
									</div>
									<img
										src="https://store.0814media.net/img/qrcode.svg"
										alt=""
									/>
									<button>DOWNLOAD</button>
								</div>
							</div>
						</div>
						{/* <!-- download background --> */}
						<img src="https://store.0814media.net/img/appbg.jpg" alt="" />
					</div>
					<div className="col-md-5 col-xl-5">
						<div className="affiliate-txt">
							<div className="title">Affiliates Program</div>
							Refer someone and start earning your rewards.
						</div>
						<img src="https://store.0814media.net/img/affiliatebg.jpg" alt="" />
					</div>
				</div>
			</div>
		</>
	)
}

export default Index
