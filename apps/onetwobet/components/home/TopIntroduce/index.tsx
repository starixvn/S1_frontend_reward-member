import React, { useState } from "react"
import classNames from "classnames"
import { paths } from "@constants"
import { useSelector } from "react-redux"
import { selectUrlMethods } from "@api"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"

const TopIntroduce = () => {
  const { getStoreImgDomain } = useSelector(selectUrlMethods)
	const { t } = useTranslation()
	const route = useRouter()
  const [isShowAllText, setIsShowAllText] = useState(false)

  return (
    <>
      <div className='introduce container-xxl'>
        <div className='row'>
          <div
            className={classNames('dearMember col-xl-7', {
              active: isShowAllText,
            })}
          >
            <div className='txt'>
              <p>{t('BannerTitle')}</p>
              <div>{t('BannerAdText1')}</div>
              <button
                onClick={() => setIsShowAllText(true)}
                className='seeMore'
                type='button'
              >
                {t('More')}
              </button>
              <div>{t('BannerAdText2')}</div>
              <div>{t('BannerAdText3')}</div>
              <div>{t('BannerAdText4')}</div>
              <button
                onClick={() => setIsShowAllText(false)}
                className='close'
                type='button'
              >
                {t('Close')}..
              </button>
            </div>

            <img
              className='npc'
              src={getStoreImgDomain('/img/introduce.png')}
              alt='introduce'
            />
          </div>
          <div className='col-xl-5'>
            <div className='info'>
              <div>{t('imgAdText1')}</div>
              <img
                onClick={() => {
                  route.push(paths.shopping)
                }}
                src={getStoreImgDomain('/img/rewardimg.jpg')}
                alt='reward'
              />
            </div>
            <div className='info'>
              <div>{t('imgAdText2')}</div>
              <img
                src={getStoreImgDomain('/img/rewardimg-1.jpg')
                } alt='reward' />
            </div>
          </div>
        </div>
      </div>
      <div className='indexImg'>
        <div>
          <p>{t('BannerAdText5')}</p>
          {t('BannerAdText6')}
        </div>
        <img
          src={getStoreImgDomain('/img/imgbg.jpg')
          } alt='contents' />
      </div>
      <div className='saleImg'>
        <div className='txt'>
          <div>
            {t('YourJourneyToRewards')}
            <p>{t('StartsHere')}</p>
          </div>
          <div>{t('PopularCategory')}</div>
          <div>
            {t('Computing&Phone')}
            <button onClick={() => route.push(paths.shopping)}>
              {t('SHOP_NOW')}
            </button>
          </div>
        </div>
        <img
          src={getStoreImgDomain('/img/saleimgbg.jpg')
          } alt='sale' />
      </div>
    </>
  )
}

export default TopIntroduce
