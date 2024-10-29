export interface IStaticLangGroups {
	[lang: string]: {
		displayText: string
		value: string
		currencyId: number
		mainLanguage?: boolean
	}[]
}

export const LANG_GROUP_COUNTRY: {
	[key: string]: string
} = {
	ch: 'Malaysia',
	th: 'Thailand',
	id: 'Indonesia',
	in: 'India',
	cs: 'China',
	gb: 'Global',
	bd: 'Bangladesh',
	kh: 'Cambodia',
	vn: 'Vietnam',
	br: 'Brazil',
	ko: 'Korea',
}