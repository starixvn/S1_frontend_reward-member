import { AppProps } from "next/app"
import Head from "next/head"
import { I18nextProvider } from "react-i18next"
import i18n from "../i18n/config"

import "../styles/css/reset.css"
import "../styles/css/color-group.css"
import "../styles/css/font.css"
import "../styles/css/style.css"
import { Provider } from "react-redux";
import store from "../store";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Reward88</title>
			</Head>
			<I18nextProvider i18n={i18n} >
        <Provider store={store}>
				<main className="app">
					<Component {...pageProps} test="test" />
				</main>
        </Provider>
			</I18nextProvider>
		</>
	)
}

export default CustomApp
