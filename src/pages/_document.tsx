/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html class='scroll-smooth'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      </body>
    </Html>
  )
}