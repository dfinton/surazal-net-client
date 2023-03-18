import { StoreProvider } from '../components/store/store-provider';

import '@/styles/app.scss';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider {...pageProps}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
