import { CurrenciesEnum } from '../../currency'

interface ILangOption {
	countryName: string
	currencyId: number
	flag: string
	lang: { displayText: string; value: string }[]
}

enum ILangEnum {
	en = 'en',
	cs = 'cs',
	my = 'my',
	th = 'th',
	id = 'id',
}

export const defLangOptions: ILangOption[] = [
	{
		countryName: 'Malaysia',
		currencyId: CurrenciesEnum.MYR,
		flag: 'ch',
		lang: [
			{ displayText: 'English', value: ILangEnum.en },
			{ displayText: '简体中文', value: ILangEnum.cs },
			{ displayText: 'Malay', value: ILangEnum.my },
		],
	},
	{
		countryName: 'Thailand',
		currencyId: CurrenciesEnum.THB,
		flag: 'th',
		lang: [
			{ displayText: 'English', value: ILangEnum.en },
			{ displayText: 'ไทย', value: ILangEnum.th },
		],
	},
	{
		countryName: 'Indonesia',
		currencyId: CurrenciesEnum.IDR,
		flag: 'id',
		lang: [
			{ displayText: 'English', value: ILangEnum.en },
			{ displayText: 'Bhs Indonesia', value: ILangEnum.id },
		],
	},
]
