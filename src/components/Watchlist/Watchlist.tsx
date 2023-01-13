import type { NextComponentType } from 'next'
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { trpc } from '../../utils/trpc';
import WatchlistRow from './WatchlistRow/WatchlistRow';

type TickerType = {
  index: number;
  ticker: string;
  company: string | undefined;
  lastPrice: number | undefined;
  change: number | undefined;
  percentageChange: number | undefined;
  marketCap: number | undefined;
}

const Watchlist: NextComponentType = () => {

  const [availability, setAvailability] = useState(false);
  const [tickers, setTickers] = useState<TickerType[]>([])

  const removeTickerMutation = trpc.watchlist.deleteFromWatchlist.useMutation({
    onSuccess: () => {multipleTickerQuery.refetch()}
  });

  const multipleTickerQuery = trpc.watchlist.getWatchlist.useQuery(undefined, {
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
      {
        availability ?
        <div
          className="relative flex flex-col"
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

export default Watchlist