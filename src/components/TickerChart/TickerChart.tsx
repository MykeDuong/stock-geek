import type { NextComponentType } from 'next'
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'

interface PropsInterface {
  ticker: string;
}

const createCode = (length: number) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const TickerChart: NextComponentType<any, any, PropsInterface> = ({ ticker }) => {
  const router = useRouter();
  const [code, setCode] = useState(createCode(5));
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCode(createCode(5));
  }, [router])

  useEffect(() => {
    // const firstScript = document.createElement('script');
    // firstScript.src = "https://s3.tradingview.com/tv.js"
    const secondScript = document.createElement('script');
    secondScript.innerHTML = "new TradingView.MediumWidget(" + JSON.stringify({
      "symbols": [
        [
          ticker
        ]
      ],
      "chartOnly": true,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "light",
      "autosize": true,
      "showVolume": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "chartType": "line",
      "backgroundColor": "rgba(0, 0, 0, 0)",
      "container_id": `tradingview_19283`
    }) + ")"
    // container.current!.appendChild(firstScript);
    container.current!.appendChild(secondScript);
  }, [])


  return (
    <div
      className="w-full h-full min-h-[20rem]"
    >
      <div className="tradingview-widget-container" ref={container}>
        <div id={`tradingview_19283`}></div>
      </div>
    </div>
  )
}

export default TickerChart