const getAffiliate = () => {
	if (typeof window === `undefined`) return ''

	const fullPath = window.location.hostname
	const arr = fullPath.split('.')

	return arr.length === 3
		? `https://aff.${arr.filter((p, idx) => idx !== 0).join('.')}`
		: `https://aff.${arr.join('.')}`
}

export const siteInfo = {
	defaultLang: 'en',
	defaultLangList: ['en', 'cs', 'my', 'th', 'th_en', 'id', 'id_en'],
	affiliateLink: getAffiliate(),
}

