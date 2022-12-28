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
      "symbol": "NASDAQ:AAPL",
      "width": "100%",
      "locale": "en",
      "colorTheme": "light",
      "isTransparent": true
    })
    container.current!.appendChild(script);
  }, [])


  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}

export default TickerInfo