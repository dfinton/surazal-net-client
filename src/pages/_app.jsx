import Head from 'next/head';
import { StoreProvider } from '@/components/store/store-provider';

import '@/styles/app.scss';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider {...pageProps}>
      <Head>
        <meta key="google-site-verification" name="google-site-verification" content="xJ93_vi3HLcGhUZSPIgmJI6OD4sDM6_zQ_fNE8BUs3g" />
      </Head>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
