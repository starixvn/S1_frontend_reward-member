import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { useTranslation } from "react-i18next"
import { imageUrl } from "config"

const getSliderList = (langId: string) => [
	{ id: 1, img: `${imageUrl}/img/banner_${langId}.jpg` },
	{ id: 2, img: `${imageUrl}/img/banner_${langId}.jpg` },
	{ id: 3, img: `${imageUrl}/img/banner_${langId}.jpg` },
]

const GiftSwiper = () => {
	const { i18n } = useTranslation()

	const langId = i18n.language

	return (
		<div className="swiper-container">
			<Swiper className="swiper-wrapper">
				{getSliderList(langId).map(obj => (
					<SwiperSlide key={obj.id} className="swiper-slide">
						<img src={obj.img} alt="banner" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default GiftSwiper
