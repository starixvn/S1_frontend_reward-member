import React, { FC } from "react"

type IconType =
	| "icon icon-warning"
	| "icon icon-member"
	| "icon icon-key"
	| "icon icon-information"

interface IIconProps {
	className: IconType
}

const Icon: FC<IIconProps> = ({ className }) => <i className={className} />

export default Icon
