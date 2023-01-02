import { NextComponentType } from "next";
import { useEffect, useRef } from "react";

interface PropsInterface {
  ticker: string
}

export const TickerInfo: NextComponentType<{}, {}, PropsInterface> = ({ ticker }) => {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": ticker,
      "width": "100%",
      "locale": "en",
      "colorTheme": "light",
      "isTransparent": true
    })
    container.current!.appendChild(script);
  }, [])


  return (
    <div
    key='ticker info for "ticker"'
    className="relative bg-beige-200 rounded-xl"
  >
    <div
      className='absolute right-2 top-14 flex flex-row gap-2'
    >
      <button
        className="bg-green-700 text-white font-raleway rounded-xl py-2 px-4 hover:scale-105"
      >
        Buy
      </button>
      <button
        className="bg-red-700 text-white font-raleway rounded-xl py-2 px-4 hover:scale-105"
      >
        Sell
      </button>
      <button
        className="bg-beige-700 text-white font-raleway rounded-xl py-2 px-4 hover:scale-105"
      >
        Watchlist
      </button>
    </div>
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  </div>
  )
}

export default TickerInfo