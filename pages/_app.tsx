// import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Head>
    <link rel="shortcut icon" href="/favicons/favicon.ico" /> 
    <title>Learn or Die</title>

    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-J45C8054NT"></script>

    <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J45C8054NT', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
  </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
