// import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import Head from 'next/head';
import { H1, H2, Code } from '../components/Markdown';


const components = {
  h1: H1,
  h2: H2,
  // …
  // p: Text,
  pre: Code,
  code: Code,
  // inlineCode: Code
}


function MyApp({ Component, pageProps }: AppProps) {

  return <>
  <Head>
    <link rel="shortcut icon" href="/favicons/favicon-32x32.png" /> 
    <title>Learn or Die</title>

    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
    {/* the google analytics should only run in production. */}
    {process.env.NODE_ENV === "production" ? <><script 
      async 
      src="https://www.googletagmanager.com/gtag/js?id=G-J45C8054NT"></script>

    <script
            dangerouslySetInnerHTML={{
              __html: `
            console.log("hi");
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J45C8054NT');
          `,
            }}
          /></> : ''}
  </Head>
    <MDXProvider components={components} >
      <Component {...pageProps} />
    </MDXProvider>
  </>
}

export default MyApp
