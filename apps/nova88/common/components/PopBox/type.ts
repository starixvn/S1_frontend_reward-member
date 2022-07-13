import { Dispatch } from "react"

export type PopBoxType = "login" | "error" | ""

export interface PopBoxInterface {
	type: PopBoxType
	props?: object
}

export interface PopBoxContextInterface {
	popBoxType: PopBoxInterface
	setPopBoxType: Dispatch<React.SetStateAction<PopBoxInterface>>
	closePopBox: () => void
}
