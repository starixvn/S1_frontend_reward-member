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

export const numberFormat = number => {
	return number?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}
