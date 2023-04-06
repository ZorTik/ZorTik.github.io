import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>ZorTik | Portfolio</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
