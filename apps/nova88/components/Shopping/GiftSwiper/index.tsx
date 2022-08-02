import React, { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

interface IGiftSwiperProps {
	sliderList: { id: number; img: string }[]
}

const GiftSwiper: FC<IGiftSwiperProps> = ({ sliderList }) => {
	return (
		<div className="swiper-container">
			<Swiper className="swiper-wrapper">
				{sliderList.map(obj => (
					<SwiperSlide key={obj.id} className="swiper-slide">
						<img src={obj.img} alt="banner" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default GiftSwiper
