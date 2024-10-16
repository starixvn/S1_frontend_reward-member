const { extractSheets } = require("spreadsheet-to-json")
const { outputData, SHEET_URL_ID } = require("./sheet")
const auth = require("../ailab-resources-385807-220772b7ea81.json")

// * url：https://docs.google.com/spreadsheets/d/1yQNCCdV2UGOGE8-GhM0eOMEoTG23F0JpcR5pf5tTq5E

// * 可吃參數 ex: node SheetSort.js nova88 common
const args = process.argv.slice(2)
const sheetsToExtract = (args.length !== 0 ? args : ["nova88", "common"]).map(
	brand => `reward-${brand}`
)

// 整理當前 google sheet 排序，可選指定 tab
extractSheets(
	{ spreadsheetKey: SHEET_URL_ID, credentials: auth, sheetsToExtract },
	(err, data) => {
		if (err) throw err
		Object.entries(data).forEach(([tabName, rows]) => {
			if (!(rows?.length > 0)) return
			rows.sort((a, b) => (a.key > b.key ? 1 : -1))
			outputData({
				tab: tabName,
				headerRow: Object.keys(rows[0]),
				contents: rows.filter(({ key }) => !!key), // 移除空白 key
			})
		})
	}
)
