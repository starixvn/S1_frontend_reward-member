import { selectedProfile } from '@api'
import Empty from '@apps/nova88/components/about/components/Empty'
import Pagination from '@apps/nova88/components/common/Pagination'
import { CURRENCY_TO_TIMEZONE } from '@constants'
import { numberFormat } from '@core'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

interface IPurchaseRecordProps {
	purchaseList: {
		createTime: string
		createTimeInCurrencyTimeZone: string
		currencyId: number
		custId: number
		giftId: string
		giftName: string
		isoCode: string
		point: number
		siteId: number
		status: number
		statusName: string
		timeZone: string
		transId: string
	}[]
	totalPage: number | undefined
	activePageNumber: number
	onChange: (n: number) => void
	isForwardSort: boolean
	onToggle: () => void
}

const PurchaseRecord: FC<IPurchaseRecordProps> = ({
	purchaseList,
	totalPage,
	activePageNumber,
	onChange,
	isForwardSort,
	onToggle,
}) => {
	const { t } = useTranslation()
	const profile = useSelector(selectedProfile)
	const timeZoneByCurrencyId = CURRENCY_TO_TIMEZONE[profile?.currencyId]

	const handlePurchaseTime = time => {
		const pos = time.indexOf('+')
		const tempStr = time.substring(0, pos)
		return tempStr.replace('T', ' ')
	}

	return (
		<>
			<div className='coinRecord-group'>
				<div className='header'>
					<div onClick={() => onToggle()} className='time'>
						{`${t('Label_RedeemTime')}(GMT${timeZoneByCurrencyId})`}

						<i
							className={classNames('icon', 'icon-arrow_drop_down', {
								active: isForwardSort,
							})}
						/>
					</div>

					<div className='item'>{t('ItemCode')}</div>
					<div className='name'>{t('Label_ProductName')}</div>
					<div>{t('Label_PointsUsed')}</div>
					<div>{t('Label_Status')}</div>
				</div>
				<div className='coinList'>
					{purchaseList && purchaseList.length > 0 ? (
						purchaseList.map(item => (
							<div key={item.transId} className='log'>
								<div className='time'>
									{handlePurchaseTime(item.createTimeInCurrencyTimeZone)}
								</div>
								<div className='item'>{item.giftId}</div>
								<div className='name'>{item.giftName}</div>
								<div>{numberFormat(item.point, 0, true)}</div>
								<div className='whiteBold'>{item.statusName}</div>
							</div>
						))
					) : (
						<Empty />
					)}
				</div>
				<Pagination
					currentPage={activePageNumber}
					totalPages={totalPage}
					onChange={onChange}
				/>
			</div>
			<div className='mobile-coinList'>
				{purchaseList && purchaseList.length > 0 ? (
					purchaseList.map(item => (
						<div key={item.transId} className='mobile-log'>
							<ul>
								<li>
									<span>
										{`${t('Label_RedeemTime')}(GMT${timeZoneByCurrencyId})`}
									</span>
									{handlePurchaseTime(item.createTimeInCurrencyTimeZone)}
								</li>
								<li>
									<span>{t('ItemCode')}</span>
									{item.giftId}
								</li>
								<li className='name'>
									<span>{t('Label_ProductName')}</span>
									{item.giftName}
								</li>
								<li>
									<span>{t('Label_PointsUsed')}</span>
									{item.point}
								</li>
								<li>
									<span>{t('Label_Status')}</span>
									{item.statusName}
								</li>
							</ul>
						</div>
					))
				) : (
					<div className='mobile-noData active'>
						<i className='icon icon-alarm' />
						{t('NoData')}
					</div>
				)}
			</div>
		</>
	)
}

export default PurchaseRecord
