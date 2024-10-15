import { imageUrl } from "@apps/nova88/config"
import { Html, Head, Main, NextScript } from "next/document"

const Document = () => {
	return (
		<Html>
			<Head>
				<link rel="shortcut icon" href={`${imageUrl}/img/favicon.ico`} />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
