import { IGiftData, selectedIsLogin, useSetFavoriteMutation } from '@api'
import Loading from '@apps/onetwobet/components/common/Loading'
import GiftList from '@apps/onetwobet/components/Shopping/GiftList'
import { monthObj, paths } from '@constants'
import { usePopBox } from '@operations'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

interface IProducts {
	giftList: Array<IGiftData>
	isLoading: boolean
}

const Products = ({ giftList, isLoading }: IProducts) => {
	const route = useRouter()
	const { t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const [setFavorite] = useSetFavoriteMutation()

	const month = monthObj[new Date().getMonth() + 1]
	const isLogin = useSelector(selectedIsLogin)

	const handleFavoriteToggle = async item => {
		if (isLogin) {
			try {
				await setFavorite({
					giftId: item.giftId,
					isFavorite: !item.isFavorite,
				}).unwrap()
			} catch (error) {
				setPopBoxType({
					type: 'warn',
					props: { content: error.message },
				})
			}
		} else {
			setPopBoxType({
				type: 'login',
			})
		}
	}

	const goToMore = () => route.push(paths.shopping)

	return (
		<>
			<div className='products-group container-xxl'>
				<div className='row'>
					<div className='products-menu'>
						<a className='active'>
							{t('HotPicksForTheMonthOf')}
							<span>{t(month)}</span>
						</a>
						<button onClick={goToMore}>{t('More')}...</button>
					</div>
					<GiftList
						filterList={giftList}
						onToggleFavorite={handleFavoriteToggle}
					/>
				</div>
				{isLoading && <Loading />}
			</div>

			<button className='btn-more' onClick={goToMore}>
				{t('More')}...
			</button>
		</>
	)
}

export default Products
