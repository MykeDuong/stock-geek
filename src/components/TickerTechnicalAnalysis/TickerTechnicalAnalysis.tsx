import type { NextComponentType } from 'next'
import React, { useEffect, useRef } from 'react'

interface PropsInterface {
  ticker: string;
}

const TickerTechnicalAnalysis: NextComponentType<any, any, PropsInterface> = ({ ticker }) => {

  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
    script.async = true;
    script.innerHTML = JSON.stringify({
      "interval": "1m",
      "width": "100%",
      "isTransparent": true,
      "height": "100%",
      "symbol": ticker,
      "showIntervalTabs": true,
      "locale": "en",
      "colorTheme": "light"
    })

    container.current?.appendChild(script);
  }, [])

  return (
    <div
      className="w-full h-full"
    >
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  )
}

export default TickerTechnicalAnalysis