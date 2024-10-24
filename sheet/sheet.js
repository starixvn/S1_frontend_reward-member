/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */

const { GoogleSpreadsheet } = require("google-spreadsheet")
const { JWT } = require("google-auth-library")
const auth = require("./auth.json")

// * url：https://docs.google.com/spreadsheets/d/1yQNCCdV2UGOGE8-GhM0eOMEoTG23F0JpcR5pf5tTq5E
const SHEET_URL_ID = "1yQNCCdV2UGOGE8-GhM0eOMEoTG23F0JpcR5pf5tTq5E"

const serviceAccountAuth = new JWT({
	email: auth.client_email,
	key: auth.private_key,
	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

/** 將內容更新覆蓋至 google sheet */
const outputData = async ({ tab, headerRow, contents }) => {
	const doc = new GoogleSpreadsheet(SHEET_URL_ID, serviceAccountAuth)
	await doc.loadInfo()
	const sheet = doc.sheetsByTitle[tab]
		? doc.sheetsByTitle[tab]
		: await doc.addSheet({ title: tab, headerValues: headerRow })
	await sheet.clear()
	await sheet.setHeaderRow(headerRow)
	await sheet.addRows(contents)
	await sheet.saveUpdatedCells()
}

module.exports = { outputData, SHEET_URL_ID }
