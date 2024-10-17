import React, { createContext, ReactNode, useContext, useState } from 'react'

import { Dispatch } from 'react'

export type PopBoxType = 'login' | 'warn' | 'default' | ''

export interface PopBoxInterface {
	type: PopBoxType
	props?: object
}

export interface PopBoxContextInterface {
	popBoxType: PopBoxInterface
	setPopBoxType: Dispatch<React.SetStateAction<PopBoxInterface>>
	closePopBox: () => void
}

export const PopBoxContext = createContext<PopBoxContextInterface>(null!)

export const usePopBox = () => useContext(PopBoxContext)

export const PopBoxProvider = ({ children }: { children: ReactNode }) => {
	const [popBoxType, setPopBoxType] = useState<PopBoxInterface>({ type: '' })

	const closePopBox = () => {
		setPopBoxType({ type: '' })
	}

	return (
		<PopBoxContext.Provider value={{ popBoxType, setPopBoxType, closePopBox }}>
			{children}
		</PopBoxContext.Provider>
	)
}
