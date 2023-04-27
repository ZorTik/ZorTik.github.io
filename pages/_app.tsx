import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import {UserProvider} from "@auth0/nextjs-auth0/client";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faBars, faSliders} from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faSliders);

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>ZorTik | Portfolio</title>
    </Head>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  </>
}

export default MyApp
