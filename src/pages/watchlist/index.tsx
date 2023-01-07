import type { NextPage, NextComponentType } from "next"
import { useRef, useState, forwardRef } from "react";
import { ClipLoader } from 'react-spinners';

import { HeaderImage } from "../../components"
import { pageTitleClass, nFormatter } from "../../utils/clientUtils"
import { trpc } from "../../utils/trpc";

interface RowPropsInterface {
  index?: number;
  ticker?: string;
  company?: string;
  lastPrice?: number;
  change?: number;
  percentageChange?: number;
  marketCap?: number;
  header?: boolean
}

const textClass = "font-raleway font-semibold text-xl"

const Watchlist: NextPage = () => {

  const [availability, setAvailability] = useState(false);
  const tickerRef = useRef<(HTMLInputElement|null)[]>([]);

  // const watchlistQuery = trpc.ticker.getWatchlist.useQuery()
  const multipleTickerQuery = trpc.ticker.getMultipleTickers.useQuery(undefined, {
    onSuccess: () => {
      setAvailability(true);
    }
  })

  const handleRemoveFromWatchlist = () => {
    const toBeRemoved: string[] = [];
    

  }

  return (
    <div>
      <HeaderImage src={"/images/watchlist-image.png"} alt={"watchlist-image"} />
      <h1
        className={`${pageTitleClass} my-6`}
      >
        Watchlist
      </h1>
      {
        availability ?
        <div
          className="relative flex flex-col ml-10 mr-4"
        >
          <WatchlistRow header={true}/>
          <hr className="bg-slate-400 border-slate-400 mx-6 my-2"  />
          {multipleTickerQuery.data!.map(tickerInfo =>
            <WatchlistRow
              key={`key of row in watchlist for ${tickerInfo.ticker}`}
              index={tickerInfo.index}
              ticker={tickerInfo.ticker}
              company={tickerInfo.company}
              lastPrice={tickerInfo.lastPrice}
              change={tickerInfo.change}
              percentageChange={tickerInfo.percentageChange}
              marketCap={tickerInfo.marketCap}
              ref={(ref) => (tickerRef.current?.push(ref))}
            />
          )}
          <div
            className="relative mx-0 mt-10"
          >
            <button
              className="float-right bg-red-700 font-raleway text-lg text-white rounded-lg w-fit px-6 py-4 hover:scale-105"
              onClick={handleRemoveFromWatchlist}
            >
              Remove chosen tickers
            </button> 
          </div>
        </div>
        :
        <div>
          <ClipLoader color="#395144" />
        </div>
      }
    </div>
  )
}

const WatchlistRow = forwardRef<HTMLInputElement, RowPropsInterface>(({ index, ticker, company, lastPrice, change, percentageChange, marketCap, header = false }, ref) => {
  console.log(index);
  return (
    <div
      className={`flex flex-row h-14 px-2 rounded-lg items-center ${(index !== undefined && index % 2 !== 0) ? 'bg-beige-300' : ''}`}
    >
      <div
        className="w-[3%]"
      >
        {!header &&
          <input
            type="checkbox"
            ref={ref}
            onClick={(e) => { }}
          />
        }
      </div>
      <div
        className="flex flex-row items-center gap-6 w-[97%]"
      >
        <p
          className={`w-[10%] ${textClass}`}
        >
          {header ? "Symbol" : ticker}
        </p>
        <p
          className={`w-[30%] ${textClass}`}
        >
          {header ? "Company Name" : company}
        </p>
        <p
          className={`w-[12%] ${textClass}`}
        >
          {header ? "Last Price" : lastPrice}
        </p>
        <p
          className={`w-[12%] ${textClass} ${change && (change > 0 ? 'text-green-700' : 'text-red-700')}`}
        >
          {header ? "Change" : change?.toLocaleString('en-US')}
        </p>
        <p
          className={`w-[12%] ${textClass} ${percentageChange && (percentageChange > 0 ? 'text-green-700' : 'text-red-700')}`}
        >
          {header ? "% Change" : `${percentageChange?.toLocaleString('en-US')}%`}
        </p>
        <p
          className={`w-[12%] ${textClass}`}
        >
          {header ? " Market Cap" : (marketCap ? nFormatter(marketCap, 2) : '')}
        </p>
        <div
          className={`w-[12%]`}
        >
          {header ?
            <p
              className={`${textClass}`}
            >
              Action
            </p>
            :
            <button
              className="font-raleway text-md text-white bg-green-700 py-2 px-3 rounded-lg hover:scale-105"
            >
              Trade
            </button>
          }
        </div>
      </div>
    </div>
  )
})
WatchlistRow.displayName="Watchlist Row"

export default Watchlist