import React from "react"
import QRCode from "qrcode.react"
import { appType } from "@constants"
import { siteInfo } from "@apps/onetwobet/config"
import { useSelector } from "react-redux"
import { selectedLangId, selectUrlMethods, useGetAppLinkQuery } from "@api"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "@operations"

const AppDownload = () => {
  const { t } = useTranslation()
	const langId = useAppSelector(selectedLangId)
  const { data: { data: appLinks } = {} } = useGetAppLinkQuery(null)

	const getAppLink = (type: number) =>
		appLinks?.find(el => el.appType === type)?.downloadLink
  	const { getStoreImgDomain } = useSelector(selectUrlMethods)

  return (
    <div className='appDownload container-xxl'>
      <div className='row'>
        <div className='col-md-7 col-xl-7'>
          <div className='download-txt'>
            <img
              className='logo'
              src={getStoreImgDomain('/img/12bet-logo.png')}
              alt='logo'
            />
            <div className='title'>{t('ScanToDownload').toUpperCase()}</div>
            {t('AppBannerText').toUpperCase()}
            <div className='qr-group'>
              <div className='qrCode'>
                <div className='icon icon-android'>
                  <span>{t('Android')}</span>
                </div>
                <QRCode
                  value={getAppLink(appType.Andriod)}
                  renderAs='svg'
                  size={80}
                  includeMargin={true}
                />
                <a
                  href={getAppLink(appType.Andriod)}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  <button>{t('Download').toUpperCase()}</button>
                </a>
              </div>
              <div className='qrCode'>
                <div className='icon icon-appleinc'>
                  <span>{t('IOS')}</span>
                </div>
                <QRCode
                  value={getAppLink(appType.IOS)}
                  renderAs='svg'
                  size={80}
                  includeMargin={true}
                />
                <a
                  href={getAppLink(appType.IOS)}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  <button>{t('Download').toUpperCase()}</button>
                </a>
              </div>
            </div>
          </div>
          <img
            src={getStoreImgDomain('/img/appbg.jpg')}
            alt='app' />
        </div>
        <div className='col-md-5 col-xl-5'>
          <div className='affiliate-txt'>
            <a
              href={`${siteInfo.affiliateLink}/?lang=${langId}`}
              target='_blank'
              rel='noreferrer'
              className='title'
            >
              {t('DownloadBgText1')}
            </a>
            {t('DownloadBgText2')}
          </div>
          <img
            src={getStoreImgDomain('/img/affiliatebg-1.jpg')}
            alt='affiliate' />
        </div>
      </div>
    </div>
  )
}

export default AppDownload
