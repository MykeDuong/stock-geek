import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { trpc } from "../../utils/trpc";

interface PropsInterface {
  ticker: string,
  showButton?: boolean,
}

export const TickerInfo: NextComponentType<any, any, PropsInterface> = ({ ticker, showButton = true }) => {

  const [watchlisted, setWatchlisted] = useState(false);

  const addToWatchlistQuery = trpc.watchlist.addToWatchlist.useMutation();

  const router = useRouter()
  const container = useRef<HTMLDivElement>(null);

  const handleWatchlist = () => {
    addToWatchlistQuery.mutate({ ticker });
    setWatchlisted(true);
  }

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
      className="relative bg-beige-200 rounded-xl shadow-lg"
    >
      {showButton && 
        <div
          className='absolute right-2 top-14 flex flex-row gap-2'
        >
          <button
            className="bg-green-700 text-white font-raleway rounded-xl py-2 px-4 hover:scale-105"
            onClick={() => router.push('/simulator/' + ticker )}
          >
            Trade
          </button>
          
          <button
            className={`bg-beige-700 text-white font-raleway rounded-xl py-2 px-4 ${watchlisted ? 'pointer-events-none': 'hover:scale-105'}`}
            onClick={handleWatchlist}
          >
            {watchlisted ? 'Watchlisted' : "Watchlist"}
          </button>
        </div>
      }
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  )
}

export default TickerInfo