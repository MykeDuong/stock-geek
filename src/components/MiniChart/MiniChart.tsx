import { NextComponentType } from "next";
import { useEffect, useRef } from "react";

interface PropsInterface {
  ticker: string
}

export const MiniChart: NextComponentType<{}, {}, PropsInterface> = ({ ticker }) => {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": "NASDAQ:AAPL",
      "width": 350,
      "height": 220,
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
    container.current!.appendChild(script);
  }, [])


  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}

export default MiniChart