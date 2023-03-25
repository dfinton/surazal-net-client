import Head from 'next/head';
import { StoreProvider } from '@/components/store/store-provider';

import '@/styles/app.scss';

export default function App({ Component, pageProps }) {
  const googleVerificationCode=`${process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE}`;
  const title = `${process.env.NEXT_PUBLIC_SITE_TITLE}`;

  return (
    <StoreProvider {...pageProps}>
      <Head>
        <title>{title}</title>
        <meta key="google-site-verification" name="google-site-verification" content={googleVerificationCode} />
      </Head>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
