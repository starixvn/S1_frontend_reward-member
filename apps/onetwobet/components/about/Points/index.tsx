import { selectedIsLogin, selectedProfile, selectUrlMethods, useLazyGetMyCoinQuery } from "@api"
import Loading from '@apps/onetwobet/components/common/Loading'
import LeftMenu from '@apps/onetwobet/components/about/components/LeftMenu'
import PointRecord from '@apps/onetwobet/components/about/components/PointRecord'
import { clubList } from '@constants'
import { getAvailablePoints, getUsedPoints, numberFormat } from '@core'
import { useAppSelector, usePopBox } from '@operations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const Points = () => {
	const { pathname } = useRouter()
  const { getStoreImgDomain } = useSelector(selectUrlMethods)
  const profile = useSelector(selectedProfile)
	const { t } = useTranslation()
	const [
		getMyCoin,
		{
			data: { data: { detail: coinList = [] } = {} } = {},
			isFetching: isGetMyCoinFetching,
		},
	] = useLazyGetMyCoinQuery()
	const { setPopBoxType } = usePopBox()
	const isLogin = useAppSelector(selectedIsLogin)

	const handleGetMyCoin = async args => {
		try {
			await getMyCoin(args).unwrap()
		} catch (error) {
			setPopBoxType({
				type: 'warn',
				props: { content: error.message },
			})
		}
	}

	useEffect(() => {
		if (isLogin) {
			handleGetMyCoin(null)
		}
	}, [isLogin])

	const availablePoints = getAvailablePoints(coinList)
	const usedPoints = getUsedPoints(coinList)
	const balance = Number(availablePoints) + Number(usedPoints)
	const clubText = clubList.find(
		item => item.id === profile?.userLevel
	)?.displayKey

	return (
		<main>
			<div className='container-xxl myCoins-page'>
				<div className='row'>
					<div className='col col-lg-2 col-xl-3'>
						<LeftMenu activePath={pathname} />
					</div>
					<div className='col col-lg-10 col-xl-9'>
						<div className='page-content'>
							<div className='title'>{t('MyPoints').toUpperCase()}</div>
							{!isGetMyCoinFetching ? (
								<div className='memberFile'>
									<div className='myDocument'>
										<div className='memberID'>
											<i></i>
											<i></i>
											<span>{profile?.userName}</span>
										</div>
										<div className='vipAnimation'>
											<a href=''>
												<img
													src={getStoreImgDomain(`/img/vip0${profile?.userLevel}.png`)}
													alt='userLevel'
												/>
											</a>
										</div>
										<div className='level'>{t(clubText)}</div>
										<div className='icon icon-coin'>
											{numberFormat(balance, 0, true)}
										</div>
									</div>
									<PointRecord
										coinList={coinList}
										availablePoints={availablePoints}
										usedPoints={usedPoints}
										balance={balance}
									/>
								</div>
							) : (
								<Loading />
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Points
