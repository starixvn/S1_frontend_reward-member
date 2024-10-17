export const numberFormat = (
	num: number,
	decimalPlaces: number,
	isShowSign = true
) => {
	let sign = ''
	const getDecimal = (decimalPlaces: number) => {
		let decimal = ''

		for (let i = 0; i < decimalPlaces; i++) {
			decimal += '0'
		}
		return `${decimalPlaces > 0 ? '.' : ''}${decimal}`
	}
	if (num < 0) {
		num = Number(num.toString().replace('-', ''))
		sign = isShowSign ? '-' : ''
	}
	return (
		sign +
		String(num)
			.split('')
			.reverse()
			.reduce((prev, next, index) => {
				return (index % 3 ? next : next + ',') + prev
			}) +
		getDecimal(decimalPlaces)
	)
}
