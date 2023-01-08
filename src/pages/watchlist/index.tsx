import type { NextPage, NextComponentType } from "next"
import { useRouter } from "next/router";
import {  useState } from "react";
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
  onRemove?: (ticker: string) => void
  header?: boolean
}

type TickerType = {
  index: number;
  ticker: string;
  company: string | undefined;
  lastPrice: number | undefined;
  change: number | undefined;
  percentageChange: number | undefined;
  marketCap: number | undefined;
}

const textClass = "font-raleway font-semibold text-xl"

const Watchlist: NextPage = () => {

  const [availability, setAvailability] = useState(false);
  const [tickers, setTickers] = useState<TickerType[]>([])

  const removeTickerMutation = trpc.ticker.deleteFromWatchlist.useMutation({
    onSuccess: () => {multipleTickerQuery.refetch()}
  });

  const multipleTickerQuery = trpc.ticker.getWatchlist.useQuery(undefined, {
    onSuccess: (data) => {
      setAvailability(true);
      setTickers(data)
    }
  })

  const handleDeleteFromWatchlist = async (ticker : string) => {
    setTickers(tickers.filter((singleTicker) => singleTicker.ticker !== ticker))
    removeTickerMutation.mutate({ ticker });
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
          <hr className="border-slate-400 my-2"  />
          {tickers.map(tickerInfo =>
            <WatchlistRow
              key={`key of row in watchlist for ${tickerInfo.ticker}`}
              index={tickerInfo.index}
              ticker={tickerInfo.ticker}
              company={tickerInfo.company}
              lastPrice={tickerInfo.lastPrice}
              change={tickerInfo.change}
              percentageChange={tickerInfo.percentageChange}
              marketCap={tickerInfo.marketCap}
              onRemove={handleDeleteFromWatchlist}
            />
          )}
        </div>
        :
        <div
            className="mx-0 flex justify-center"
        >
          <ClipLoader color="#395144" />
        </div>
      }
    </div>
  )
}

const WatchlistRow: NextComponentType<any, any, RowPropsInterface> = ({ index, ticker, company, lastPrice, change, percentageChange, marketCap, onRemove, header = false }) => {
  const router = useRouter();
  return (
    <div
      className={`flex flex-row h-14 px-2 rounded-lg items-center ${(index !== undefined && index % 2 !== 0) ? 'bg-beige-300' : ''}`}
    >
      <div
        className="flex flex-row items-center gap-6 w-full"
      >
        <p
          className={`w-[10%] ${textClass}`}
        >
          {header ? "Symbol" : ticker}
        </p>
        <p
          className={`w-[27%] ${textClass}`}
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
          className={`w-[15%]`}
        >
          {header ?
            <p
              className={`${textClass}`}
            >
              Action
            </p>
            :
            <div
              className="flex flex-row gap-2"
            >
              <button
                className="font-raleway text-md text-white bg-green-700 py-2 px-3 rounded-lg hover:scale-105"
                onClick={() => router.push(`/simulator/${ticker}`)}
              >
                Trade
              </button>
              <button
                className="font-raleway text-md text-white bg-red-700 py-2 px-3 rounded-lg hover:scale-105"
                onClick={() => onRemove && ticker && onRemove(ticker)}
              >
                Remove
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Watchlist