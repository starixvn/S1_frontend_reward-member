import { retry } from "@reduxjs/toolkit/query"

export const setCookie = ({
	cookieName,
	cookieValue,
	exdays,
}: {
	cookieName: string
	cookieValue: any
	exdays?: number
}) => {
	const d = new Date()
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
	const expires = `expires=${d.toUTCString()}`
	if (typeof document !== `undefined`) {
		document.cookie = `${cookieName}=${cookieValue};${expires};path=/`
	}
}

export const numberFormat = (num, decimalPlaces, isShowSign = true) => {
	let sign = ""
	const getDecimal = decimalPlaces => {
		let decimal = ""

		for (let i = 0; i < decimalPlaces; i++) {
			decimal += "0"
		}
		return decimal
	}
	if (num < 0) {
		num = num.toString().replace("-", "")
		sign = isShowSign ? "-" : ""
	}
	return (
		sign +
		String(num)
			.split("")
			.reverse()
			.reduce((prev, next, index) => {
				return (index % 3 ? next : next + ",") + prev
			}) +
		`.${getDecimal(decimalPlaces)}`
	)
}
