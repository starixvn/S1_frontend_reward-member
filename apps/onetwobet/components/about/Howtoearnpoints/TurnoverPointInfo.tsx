import { selectedLangId } from '@api'
import { turnoverPointReward } from '@constants'
import { useAppSelector } from '@operations'
import { useTranslation } from 'react-i18next'

const TurnoverPointInfo = ({ currencyName }: { currencyName: string }) => {
	const { t } = useTranslation()
	const langId = useAppSelector(selectedLangId)
	const currencyShowJudge = () => {
		if (langId === 'th') {
			return t('THB2')
		} else {
			return ''
		}
	}
	return (
		<>
			<div>{t('TurnoverPointTitle1')}</div>
			<table className='medal'>
				<tbody>
					<tr>
						<td colSpan={4}>{t('HowToEarnTurnoverRewardsPoints')}</td>
					</tr>
					<tr>
						<td>{t('PRODUCTS')}</td>
						<td>{t('PROVIDER')}</td>
						<td>{t('VALID_TURNOVER')}</td>
						<td>{t('POINTS')}</td>
					</tr>
					<tr>
						<td className='head'>{t('SPORTS')}</td>
						<td>{t('SABASportsEsports')}</td>
						<td>
							{t(currencyName)} {turnoverPointReward[currencyName].sports}{' '}
							{currencyShowJudge()}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className='head'>{t('LIVE_CASINO')}</td>
						<td>{t('AllProviders')}</td>
						<td>
							{t(currencyName)} {turnoverPointReward[currencyName].liveCasino}{' '}
							{currencyShowJudge()}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className='head'>{t('SLOT')}</td>
						<td>{t('ExcludedKiss918')}</td>
						<td>
							{t(currencyName)} {turnoverPointReward[currencyName].slot}{' '}
							{currencyShowJudge()}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className='head'>{t('FISHING')}</td>
						<td>{t('AllProviders')}</td>
						<td>
							{t(currencyName)} {turnoverPointReward[currencyName].fishing}{' '}
							{currencyShowJudge()}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className='head'>{t('TABLE_GAMES')}</td>
						<td>{t('TableGamesProvider')}</td>
						<td>
							{t(currencyName)} {turnoverPointReward[currencyName].tableGames}{' '}
							{currencyShowJudge()}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className='head'>{t('GAMES')}</td>
						<td>{t('GamesProvider')}</td>
						<td>
							{t(currencyName)} {turnoverPointReward[currencyName].games}{' '}
							{currencyShowJudge()}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className='head'>{t('LOTTERY')}</td>
						<td>{t('LotteryProvider')}</td>
						<td>
							{t(currencyName)} {turnoverPointReward[currencyName].lottery}{' '}
							{currencyShowJudge()}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className='head'>{t('VIRTUAL_SPORTS')}</td>
						<td>{t('VirtualSportsProvider')}</td>
						<td>
							{t(currencyName)}{' '}
							{turnoverPointReward[currencyName].virtualSports}{' '}
							{currencyShowJudge()}
						</td>
						<td>1</td>
					</tr>
				</tbody>
			</table>
			<div>{t('TurnoverPointContent1')}</div>
			<div>{t('TurnoverPointContent2')}</div>
		</>
	)
}

export default TurnoverPointInfo
