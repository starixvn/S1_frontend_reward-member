import {
	IGetGiftListArgs,
	selectedProfile,
	useGetGiftTagsQuery,
	useLazyGetGiftListQuery,
} from '@api'
import { paths } from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../common/Loading'
import GiftList from '../Shopping/GiftList'

export const CartFeatured = () => {
	const route = useRouter()
	const profile = useAppSelector(selectedProfile)
	const { langId, currencyId } = profile
	const { t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const { data: { data: giftTabs } = {}, isFetching: isGetGiftTabsFetching } =
		useGetGiftTagsQuery({ langId, currencyId })
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()

	const getFeaturedTagInfo = () => {
		const names = ['FEATURED', '精选', 'FITUR', 'DILIHATKAN', 'สนใจเป็นพิเศษ']
		return giftTabs && giftTabs.length > 0
			? giftTabs.find(o => names.includes(o.tagName))
			: null
	}

	const filterGiftList = async (args: IGetGiftListArgs) => {
		await getGiftList(args)
			.unwrap()
			.catch(err =>
				setPopBoxType({ type: 'warn', props: { content: err.message } })
			)
	}

	useEffect(() => {
		const featuredTagId = getFeaturedTagInfo()?.tagId
		if (featuredTagId) {
			filterGiftList({
				langId,
				currencyId,
				tags: [featuredTagId],
				pageSize: 4,
			})
		}
	}, [isGetGiftTabsFetching, langId, currencyId])

	return (
		<div className='products-group col-lg-7 col-xl-7'>
			<div className='row'>
				<div className='products-menu'>
					<a>{t('FEATURED')}</a>
					<button
						onClick={() => {
							route.push(paths.shopping)
						}}
					>
						{t('More')}...
					</button>
				</div>
				<GiftList filterList={giftList} />
				{isGetGiftListFetching && <Loading />}
			</div>
		</div>
	)
}
