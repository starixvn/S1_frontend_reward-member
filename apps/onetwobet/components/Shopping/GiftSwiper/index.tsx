import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from "react-redux"
import { selectUrlMethods } from "@api"

const getSliderList = (langId: string) => [
	{ id: 1, img: `/img/banner_${langId}.jpg` },
	{ id: 2, img: `/img/banner_${langId}.jpg` },
	{ id: 3, img: `/img/banner_${langId}.jpg` },
]

const GiftSwiper = () => {
	const { i18n } = useTranslation()
  const { getStoreImgDomain } = useSelector(selectUrlMethods)

  const langId = i18n.language

	return (
		<div className='swiper-container'>
			<Swiper className='swiper-wrapper'>
				{getSliderList(langId).map(obj => (
					<SwiperSlide key={obj.id} className='swiper-slide'>
						<img src={getStoreImgDomain(obj.img)} alt='banner' />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default GiftSwiper
