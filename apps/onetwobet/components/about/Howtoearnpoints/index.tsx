import { selectedCurrencyId } from '@api'
import LeftMenu from '@apps/onetwobet/components/about/components/LeftMenu'
import {
	CURRENCY_ID_TO_NAME,
	defHowToEarnPointsTab,
	HowTabEnum,
	paths,
} from '@constants'
import { useAppSelector } from '@operations'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DepositPointInfo from './DepositPointInfo'
import TurnoverPointInfo from './TurnoverPointInfo'
import VIPRewardsPointInfo from './VIPRewardsPointInfo'

const HowToEarnPoints = () => {
	const { pathname } = useRouter()
	const { t } = useTranslation()
	const [selectedTab, setSelectedTab] = useState(
		defHowToEarnPointsTab[HowTabEnum.DEPOSIT_POINTS]
	)
	const currencyName = CURRENCY_ID_TO_NAME[useAppSelector(selectedCurrencyId)]

	return (
		<main>
			<div className='container-xxl tAndC'>
				<div className='row'>
					<div className='col col-lg-2 col-xl-3'>
						<LeftMenu activePath={pathname} />
					</div>
					<div className='col col-lg-10 col-xl-9'>
						<div className='page-content'>
							<div className='titleGroup'>
								<div className='title'>{t('HOW_TO_EARN_POINTS')}</div>
								<div className='txt'>
									{t('titleTip1')}
									<div>{t('titleTip2')}</div>
								</div>
							</div>

							<div className='tAndC-content'>
								<div className='btnGroup'>
									{Object.values(defHowToEarnPointsTab).map(item => (
										<button
											key={item.displayKey}
											onClick={() => {
												setSelectedTab(item)
											}}
											className={classNames(item.className, {
												active: selectedTab.key === item.key,
											})}
										>
											{t(item.displayKey)}
										</button>
									))}
								</div>

								<div className='tAndC-info active'>
									<div className='info-title'>{t(selectedTab.displayKey)}</div>

									{selectedTab.key === HowTabEnum.DEPOSIT_POINTS && (
										<DepositPointInfo currencyName={currencyName} />
									)}

									{selectedTab.key === HowTabEnum.TURNOVER_POINTS && (
										<TurnoverPointInfo currencyName={currencyName} />
									)}

									{selectedTab.key === HowTabEnum.VIP_REWARDS_POINTS && (
										<VIPRewardsPointInfo />
									)}

									<div>{t('DEPOSIT_TEXT3')}</div>
									<div>
										{t('VIP_REWARDS_TEXT')}
										<span className='primary'>{t('12_Rewards')}</span>
										{t('account')}
									</div>
									<div>
										<ul>
											<li>{t('Cal_Text_1')}</li>
											<li>{t('Cal_Text_2')}</li>
											<li>{t('Cal_Text_3')}</li>
										</ul>
									</div>
									<div>
										{t('Cal_Text_4')}
										<span className='primary'> 6,988 </span>
										{t('Cal_Text_5')}
									</div>
									<div className='info-title'>{t('Any_question')}</div>
									<div>
										{t('Please_check')}
										<Link href={paths.about.sub.rewardfaq.root}>
											<a className='primary'> {t('FAQ')} </a>
										</Link>
										{t('here_or_contact_our')}
										<a
											className='primary'
											target='_blank'
											href='https://direct.lc.chat/11638088/'
											rel='noreferrer'
										>
											{t('24/7_Customer_Support')}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default HowToEarnPoints
