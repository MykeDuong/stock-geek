import { NextComponentType } from 'next'
import { useEffect, useRef } from 'react'

const MarketInfo: NextComponentType = () => {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js"
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "light",
      "dateRange": "12M",
      "exchange": "US",
      "showChart": true,
      "locale": "en",
      "largeChartUrl": "",
      "isTransparent": true,
      "showSymbolLogo": true,
      "showFloatingTooltip": false,
      "width": "100%",
      "height": "100%",
      "plotLineColorGrowing": "rgba(57, 81, 68, 1)",
      "plotLineColorFalling": "rgba(57, 81, 68, 1)",
      "gridLineColor": "rgba(240, 243, 250, 0)",
      "scaleFontColor": "rgba(106, 109, 120, 1)",
      "belowLineFillColorGrowing": "rgba(57, 81, 68, 0.2)",
      "belowLineFillColorFalling": "rgba(57, 81, 68, 0.2)",
      "belowLineFillColorGrowingBottom": "rgba(57, 81, 68, 0.2)",
      "belowLineFillColorFallingBottom": "rgba(57, 81, 68, 0.2)",
      "symbolActiveColor": "rgba(57, 81, 68, 0.2)"
    })
    container.current!.appendChild(script);

  }, [])


  return (
    <div
      className='w-full h-full'
    >
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>  
    </div>
  )
}

export default MarketInfo