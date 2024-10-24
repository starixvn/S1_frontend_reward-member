import { IMyCoinDetailData } from '@api'

export const getAvailablePoints = (coinList: IMyCoinDetailData[]) => {
	let availablePoints = 0
	coinList?.forEach(item => {
		return item.totalSummary > 0 ? (availablePoints += item.totalSummary) : null
	})
	return availablePoints
}

export const getUsedPoints = (coinList: IMyCoinDetailData[]) => {
	let usedPoints = 0
	coinList?.forEach(item => {
		return item.totalSummary < 0 ? (usedPoints += item.totalSummary) : null
	})
	return usedPoints
}
