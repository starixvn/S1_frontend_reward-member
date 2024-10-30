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
	defaultLangList: [
		'en',
		'cs',
		'my',
		'th',
		'id',
		'bd',
		'te',
		'kh',
		'vn',
		// 'jp',
		'ko',
		'br',
		// 'zh_TW',
	],
	affiliateLink: getAffiliate(),
}

export const imageUrl = 'https://store.0814media.net'
