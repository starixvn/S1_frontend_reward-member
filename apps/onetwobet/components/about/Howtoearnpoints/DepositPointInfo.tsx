import { selectedLangId } from '@api'
import { depositPointReward } from '@constants'
import { useAppSelector } from '@operations'
import { useTranslation } from 'react-i18next'

const DepositPointInfo = ({ currencyName }: { currencyName: string }) => {
	const { t } = useTranslation()
	const langId = useAppSelector(selectedLangId)

	return (
		<>
			<div>{t('DepositPointTitle1')}</div>
			<table className='medal'>
				<tbody>
					<tr>
						<td colSpan={2}>{t('HowToEarnDepositPoint')}</td>
					</tr>
					<tr>
						<td>{t('DepositAmount')}</td>
						<td>{t('PointsEarned')}</td>
					</tr>
					<tr>
						<td>
							<span>
								{t(currencyName)} {depositPointReward[currencyName]}{' '}
								{langId === 'th' ? t('THB2') : ''}
							</span>
							<p>({t('AllDepositType')})</p>
						</td>
						<td>x 1.0</td>
					</tr>
				</tbody>
			</table>
			<div>{t('DepositPointContent1')}</div>
			<div>{t('DepositPointContent2')}</div>
		</>
	)
}

export default DepositPointInfo
