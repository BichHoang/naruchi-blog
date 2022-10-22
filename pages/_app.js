import React from 'react';

import '../styles/globals.scss';
import { Layout } from '../components';
import { store } from '../store'
import { Provider } from 'react-redux'
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}></Script>
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
    </>
  );
}

export default MyApp;