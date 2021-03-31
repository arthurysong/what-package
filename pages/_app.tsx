// import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Head>
    <link rel="shortcut icon" href="/favicons/favicon.ico" /> 
    <title>Learn or Die</title>
  </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
