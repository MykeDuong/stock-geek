import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface PropsInterface {
  ticker: string
}

export const MiniChart: NextComponentType<any, any, PropsInterface> = ({ ticker }) => {

  const router = useRouter()
  const container = useRef<HTMLDivElement>(null);
  const [scripted, setScripted] = useState(false);

  useEffect(() => {
    if (!scripted) {
      setScripted(true)
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": ticker,
        "width": '100%',
        "height": '100%',
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "light",
        "trendLineColor": "rgba(41, 98, 255, 1)",
        "underLineColor": "rgba(41, 98, 255, 0.3)",
        "underLineBottomColor": "rgba(41, 98, 255, 0)",
        "isTransparent": true,
        "autosize": false,
        "largeChartUrl": ""
      })
      container.current?.appendChild(script);
    }
  }, [ticker])

  return (
    <div
      className="rounded-lg bg-beige-200 h-60 min-w-[300px] px-2 py-3 relative shadow-dark shadow-slate-black"
    >
      {scripted && (
        <div
          className="absolute right-14 top-3"
        >
          <button
            className="rounded-lg bg-green-700 text-white text-sm py-1 px-3 hover:scale-105"
            onClick={() => router.push('/simulator/' + ticker)}
          >
            Trade
          </button>
        </div>
      )}
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  )
}

export default MiniChart
