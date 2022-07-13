export const setCookie = (cookieName, cookieValue, exdays = 1) => {
	const d = new Date()
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
	const expires = `expires=${d.toUTCString()}`
	if (typeof document !== `undefined`) {
		document.cookie = `${cookieName}=${cookieValue};${expires};path=/`
	}
}
