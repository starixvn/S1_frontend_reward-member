const { extractSheets } = require("spreadsheet-to-json")
const path = require("path")
const fs = require("fs-extra")
const auth = require("./auth.json")
const { SHEET_URL_ID } = require("./sheet")

// 可從命令列傳入參數 e.g. `node sheetSort.js nova88 common`
const args = process.argv.slice(2)
const sheetsToExtract = (
	args.length !== 0 ? args : ["nova88", "onetwobet"]
).map(brand => `reward-${brand}`)

const projectRoot = path.resolve(__dirname, "..")

const groupByLang = data => {
	const groupedData = {}

	for (const tab in data) {
		const entries = data[tab]
		entries.sort((a, b) => (a.key > b.key ? 1 : -1))
		for (const { key, ...translations } of entries) {
			for (const lang in translations) {
				const value = translations[lang]?.trim()
				if (value) {
					groupedData[lang] ??= {}
					groupedData[lang][tab] ??= {}
					groupedData[lang][tab][key] = value
				}
			}
		}
	}

	return groupedData
}

// * 同步 google sheet 版本，可選指定 tab
extractSheets(
	{ spreadsheetKey: SHEET_URL_ID, credentials: auth, sheetsToExtract },
	(err, data) => {
		if (err) throw err

		const translations = groupByLang(data)
		for (const lang in translations) {
			for (const tabName in translations[lang]) {
				const brand = tabName.split("-")[1] // reward-nova88 => nova88
				const json = translations[lang][tabName]

				const i18nDir = `${projectRoot}/apps/${brand}/i18n`
				fs.ensureDirSync(i18nDir)

				fs.writeJSONSync(`${i18nDir}/${lang}.json`, json, { spaces: 2 })
			}
		}
	}
)
