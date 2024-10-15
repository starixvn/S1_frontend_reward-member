import { useContext } from "react"
import { PopBoxContext } from "@apps/onetwobet/common/components/PopBox/PopBoxContext"
import { PopBoxContextInterface } from "@apps/onetwobet/common/components/PopBox/type"

const usePopBox = (): PopBoxContextInterface => {
	return useContext(PopBoxContext)
}

export { usePopBox }
