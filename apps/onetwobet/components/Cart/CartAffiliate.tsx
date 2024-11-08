import { selectedLangId, selectUrlMethods } from '@api'
import { siteInfo } from '@apps/onetwobet/config'
import { useAppSelector } from '@operations'
import { useTranslation } from 'react-i18next'

export const CartAffiliate = () => {
	const { t } = useTranslation()
	const langId = useAppSelector(selectedLangId)
	const { getStoreImgDomain } = useAppSelector(selectUrlMethods)

	return (
		<div className='col-lg-5 col-xl-5'>
			<div className='affiliate-txt'>
				<a
					href={`${siteInfo.affiliateLink}/?lang=${langId}`}
					target='_blank'
					rel='noreferrer'
					className='title'
				>
					{t('AffiliatesProgram')}
				</a>
				{t('AffiliatesProgramTip')}
			</div>
			<div>
				<img src={`${getStoreImgDomain('/img/affiliatebg-1.jpg')}`} alt='affiliateImg' />
			</div>
		</div>
	)
}
