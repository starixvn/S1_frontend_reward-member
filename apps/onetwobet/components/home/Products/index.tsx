import { IGiftData } from '@api'
import Loading from '@apps/onetwobet/components/common/Loading'
import { GiftList } from '@apps/onetwobet/components/Shopping/GiftList'
import { monthObj, paths } from '@constants'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

interface IProducts {
	giftList: Array<IGiftData>
	isLoading: boolean
}

const Products = ({ giftList, isLoading }: IProducts) => {
	const route = useRouter()
	const { t } = useTranslation()
	const month = monthObj[new Date().getMonth() + 1]

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
					<GiftList filterList={giftList} isFavoriteTab={false} />
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
