import { Dropdown } from '@apps/onetwobet/components/common/Dropdown'
import { fromEnum } from '@constants'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const { Option } = Dropdown

interface IGiftSelectorProps {
	type: string
	onChange: (id: number) => void
}

// const handleFilter = async (args: IGetGiftListArgs) => {
//   try {
//     await getGiftList(args).unwrap()
//   } catch (error) {
//     setPopBoxType({
//       type: 'warn',
//       props: { content: error.message },
//     })
//   }
// }

// const handleSelectorItemChange = (selectorType, label) => {
//   if (selectorType === 'category') {
//     handleFilter({
//       ...args,
//       categoryIds:
//         categoryList.find(e => e.categoryName === label).categoryId !== null
//           ? [categoryList.find(e => e.categoryName === label).categoryId]
//           : null,
//       langId,
//       currencyId,
//     })
//     setArgs(prev => ({
//       ...prev,
//       categoryIds:
//         categoryList.find(e => e.categoryName === label).categoryId !== null
//           ? [categoryList.find(e => e.categoryName === label).categoryId]
//           : null,
//       pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
//     }))
//   } else if (selectorType === 'from') {
//     const getOrderByFieldValue = () => {
//       const res = fromList.find(e => e.categoryName === label).categoryId
//       return sortType[res - 1].orderByField
//     }
//     const getDescValue = () => {
//       const res = fromList.find(e => e.categoryName === label).categoryId
//       return sortType[res - 1].desc
//     }
//     handleFilter({
//       ...args,
//       orderByField: getOrderByFieldValue(),
//       desc: getDescValue(),
//       langId,
//       currencyId,
//     })
//     setArgs(prev => ({
//       ...prev,
//       orderByField: getOrderByFieldValue(),
//       desc: getDescValue(),
//       pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
//     }))
//   }
// }

export const GiftSelector: FC<IGiftSelectorProps> = ({
	type,
	onChange,
}) => {
  const { i18n, t } = useTranslation()
  const [categoryList, setCategoryList] = useState([])
  const [itemList, setItemList] = useState<{ categoryId: number; categoryName: string }[] | string[]>([]);

  const fromList = [
    { categoryId: fromEnum.LOW_TO_HIGH_COST, categoryName: t('LowToHighCost') },
    { categoryId: fromEnum.HIGH_TO_LOW_COST, categoryName: t('HighToLowCost') },
    {
      categoryId: fromEnum.LOW_TO_HIGH_LETTER,
      categoryName: t('LowToHighLetter'),
    },
    {
      categoryId: fromEnum.HIGH_TO_LOW_LETTER,
      categoryName: t('HighToLowLetter'),
    },
  ] // selector中的選項

  const init = (type:string) => {
    if (type === 'category') {
      setItemList(fromList)
    }
    else if (type === 'from')  {
      setItemList(fromList)
    }
  }


useEffect(() => {
  init('from')
}, [])

	return (
		<Dropdown placeholder={type} onChange={e => onChange(e)}>
			{itemList.map(obj => (
				<Option key={obj.categoryId} value={obj.categoryName}>
					{obj.categoryName}
				</Option>
			))}
		</Dropdown>
	)
}
