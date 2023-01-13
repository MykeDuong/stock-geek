import type{ NextComponentType } from 'next';
import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise: Promise<() => void>;

const MarketPerformance: NextComponentType = () => {
  const onLoadScriptRef = useRef<any>();

  useEffect(() => {
    const createWidget = () => {
      if (document.getElementById('tradingview_6cee2') && 'TradingView' in window) {
        new (window.TradingView as any).MediumWidget({
          symbols: [["S&P 500", "OANDA:SPX500USD|12M"], ["US100", "CURRENCYCOM:US100|12M"], ["US Wall Street 30", "OANDA:US30USD|12M"]],
          chartOnly: false,
          width: "100%",
          height: "100%",
          locale: "en",
          colorTheme: "light",
          backgroundColor: "#E5E0BD",
          autosize: false,
          showVolume: false,
          hideDateRanges: false,
          hideMarketStatus: false,
          scalePosition: "right",
          scaleMode: "Normal",
          fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          fontSize: "10",
          noTimeScale: false,
          valuesTracking: "1",
          chartType: "line",
          container_id: "tradingview_6cee2"
        });
      }
    }

    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = () => resolve(() => {return});
        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {onLoadScriptRef.current = null};
  }, []);

  return (
    <div
      className="w-full h-full"
    >
      <div className='tradingview-widget-container'>
        <div id='tradingview_6cee2' />
      </div>
    </div>
  );
}

export default MarketPerformance