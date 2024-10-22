/**
 *   貨幣 Enum
 * - MYR: 馬來西亞令吉
 * - USD: 美元
 * - THB: 泰銖
 * - CNY: 人民幣
 * - IDR: 印尼盾
 * - KRW: 韓元
 * - VND: 越南盾
 * - INR: 印度盧比
 * - KHM: 柬埔寨瑞爾
 * - BDT: 孟加拉塔卡
 * - BRL: 巴西雷亞爾
 * - USDT: 泰達幣 (加密貨幣) */
export enum CurrenciesEnum {
	MYR = 2,
	USD = 3,
	THB = 4,
	CNY = 13,
	IDR = 15,
	KRW = 45,
	VND = 51,
	INR = 61,
	KHM = 72,
	BDT = 74,
	BRL = 82,
	USDT = 96,
}

export const CURRENCY_TO_TIMEZONE: { [key: number]: string } = {
	2: '+08:00',
	4: '+07:00',
	15: '+07:00',
	3: '+00:00',
	72: '+07:00',
	74: '+06:00',
	61: '+05:30',
	13: '+08:00',
	51: '+07:00',
	82: '-03:00',
	45: '+09:00',
	32: '+09:00',
}

export const langMapping = {
	en: 'MYR',
	cs: 'MYR',
	my: 'MYR',
	id: 'IDR',
	id_en: 'IDR',
	th: 'THB',
	th_en: 'THB',
}

export const defCurrencyList = {
	MYR: 2,
	THB: 4,
	CNY: 13,
	IDR: 15,
	INR: 61,
}
