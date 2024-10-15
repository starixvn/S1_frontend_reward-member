export enum Currencies {
  MYR = 2,
  USD = 3,
  THB = 4,
  CNY = 13,
  IDR = 15,
  INR = 61,
  BDT = 74,
  USDT = 96,
}

export const Time_Zone_By_Currencies: {
	[currencyId: number]: string
} = {
	[Currencies.MYR]: "+8",
	[Currencies.IDR]: "+7",
	[Currencies.THB]: "+7",
}
