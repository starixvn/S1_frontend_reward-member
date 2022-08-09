import React, { FC } from "react"
import Link from "next/link"
import classNames from "classnames"
import { mineMenuList } from "components/about/constants"

interface ILeftMenuProps {
	activePath: string
}

const LeftMenu: FC<ILeftMenuProps> = ({ activePath }) => {
	return (
		<div className="leftMenu">
			<div className="leftMenu">
				{mineMenuList.map(item => (
					<Link href={item.path} key={item.id}>
						<a
							className={classNames("item", {
								active: activePath === item.path,
							})}>
							<span>{item.displayKey}</span>
						</a>
					</Link>
				))}
			</div>
		</div>
	)
}

export default LeftMenu
