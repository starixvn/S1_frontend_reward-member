export const ENV_COOKIE_NAMES = {
	LangId: `${process.env['NEXT_PUBLIC_SITE_NAME']}LangId`, // * 跟後端約定的格式，不能加底線 '_'
	CurrencyId: `${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`,
}
