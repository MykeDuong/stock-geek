import type { NextComponentType } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import { nFormatter } from '../../../utils/clientUtils';

interface PropsInterface {
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


const textClass = "font-raleway font-semibold text-xl"


const WatchlistRow: NextComponentType<any, any, PropsInterface> = ({ index, ticker, company, lastPrice, change, percentageChange, marketCap, onRemove, header = false }) => {
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

export default WatchlistRow