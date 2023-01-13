import { NextComponentType } from 'next'
import { useEffect, useRef } from 'react'

const News: NextComponentType = () => {

  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
    script.async = true;
    script.innerHTML = JSON.stringify({
      "feedMode": "all_symbols",
        "colorTheme": "light",
        "isTransparent": true,
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
        "locale": "en"
    })
    container.current!.appendChild(script);
  }, [])

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget" />
    </div>
  )
}

export default News