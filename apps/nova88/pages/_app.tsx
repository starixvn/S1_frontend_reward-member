import { AppProps } from "next/app";
import Head from "next/head";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import store from "store/store";
import i18n from "i18n/config";

import "bootstrap/dist/css/bootstrap.css";
import "styles/css/reset.css";
import "styles/css/color-group.css";
import "styles/css/font.css";
import "styles/css/style.css";
import "swiper/css";

import { PopBoxProvider } from "common/components/PopBox/PopBoxContext";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Reward88</title>
      </Head>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PopBoxProvider>
            <main className="app" style={{ padding: 0 }}>
              <Component {...pageProps} test="test" />
            </main>
          </PopBoxProvider>
        </Provider>
      </I18nextProvider>
    </>
  );
}

export default CustomApp;
