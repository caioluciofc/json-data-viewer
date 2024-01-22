import type { AppProps } from 'next/app';
import AppProvider from '@/src/app.provider';
import App from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
