export const getAvailablePoints = coinList => {
	let availablePoints = 0
	coinList?.forEach(item => {
		return item.totalSummary > 0 ? (availablePoints += item.totalSummary) : null
	})
	return availablePoints
}

export const getUsedPoints = coinList => {
	let usedPoints = 0
	coinList?.forEach(item => {
		return item.totalSummary < 0 ? (usedPoints += item.totalSummary) : null
	})
	return usedPoints
}
