import { useContext } from "react"
import { PopBoxContext } from "@apps/nova88/common/components/PopBox/PopBoxContext"
import { PopBoxContextInterface } from "@apps/nova88/common/components/PopBox/type"

const usePopBox = (): PopBoxContextInterface => {
	return useContext(PopBoxContext)
}

export { usePopBox }
