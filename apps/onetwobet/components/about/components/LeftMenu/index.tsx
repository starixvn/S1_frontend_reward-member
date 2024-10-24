import { selectedIsLogin } from '@api'
import { mineMenuList } from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface ILeftMenuProps {
	activePath: string
}

const LeftMenu: FC<ILeftMenuProps> = ({ activePath }) => {
	const { t } = useTranslation()
	const route = useRouter()
	const isLogin = useAppSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()

	return (
		<div className='leftMenu'>
			<div className='leftMenu'>
				{mineMenuList.map(item => (
					<a
						onClick={() => {
							if (item.authRequired && !isLogin) {
								setPopBoxType({
									type: 'login',
								})
							} else {
								route.push(item.path)
							}
						}}
						key={item.id}
						className={classNames('item', {
							active: `/${activePath}` === item.path,
						})}
					>
						<span>{t(item.displayKey).toUpperCase()}</span>
					</a>
				))}
			</div>
		</div>
	)
}

export default LeftMenu
