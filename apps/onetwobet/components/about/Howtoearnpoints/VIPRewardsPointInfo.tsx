import { useTranslation } from 'react-i18next'

const VIPRewardsPointInfo = () => {
	const { t } = useTranslation()

	return (
		<>
			<div>{t('VIPRewardsPointTitle1')}</div>
			<div>{t('VIPRewardsPointTitle2')}</div>
			<table className='medal'>
				<tbody>
					<tr>
						<td colSpan={3}>{t('HOW_TO_EARN_VIP_REWARDS_POINTS')}</td>
					</tr>
					<tr>
						<td>{t('VIP_TIER')}</td>
						<td>{t('VIP_TIER_UPGRADE')}</td>
						<td>{t('BIRTHDAY_REWARDS')}</td>
					</tr>
					<tr>
						<td className='head'>{t('VINTAGE_CLUB')}</td>
						<td>{t('N/A')}</td>
						<td>88 {t('Points')}</td>
					</tr>
					<tr>
						<td className='head'>{t('SILVER_CLUB')}</td>
						<td>500 {t('Points')}</td>
						<td>188 {t('Points')}</td>
					</tr>
					<tr>
						<td className='head'>{t('GOLD_CLUB')}</td>
						<td>800 {t('Points')}</td>
						<td>288 {t('Points')}</td>
					</tr>
					<tr>
						<td className='head'>{t('TITANIUM_CLUB')}</td>
						<td>1,000 {t('Points')}</td>
						<td>388 {t('Points')}</td>
					</tr>
					<tr>
						<td className='head'>{t('DIAMOND_CLUB')}</td>
						<td>1,500 {t('Points')}</td>
						<td>688 {t('Points')}</td>
					</tr>
					<tr>
						<td className='head'>{t('NOVA_CLUB')}</td>
						<td>2,000 {t('Points')}</td>
						<td>888 {t('Points')}</td>
					</tr>
				</tbody>
			</table>
			<div>{t('VIPRewardsPointContent1')}</div>
		</>
	)
}

export default VIPRewardsPointInfo
