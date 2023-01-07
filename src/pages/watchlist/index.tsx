import type { NextPage, NextComponentType } from "next"

import { HeaderImage } from "../../components"
import { pageTitleClass } from "../../utils/clientConstants"
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

  // const watchlistQuery = trpc.ticker.getWatchlist.useQuery()
  const multipleTickerQuery = trpc.ticker.getMultipleTickers.useQuery()

  return (
    <div>
      <HeaderImage src={"/images/watchlist-image.png"} alt={"watchlist-image"} />
      <h1
        className={`${pageTitleClass} my-6`}
      >
        Watchlist
      </h1>
      <div
        className="flex flex-col ml-10 mr-4"
      >
        <WatchlistRow header={true} />
        <hr className="bg-slate-400 border-slate-400 mx-6 my-4"  />
      </div>
    </div>
  )
}

const WatchlistRow: NextComponentType<any, any, RowPropsInterface> = ({ index, ticker, company, lastPrice, change, percentageChange, marketCap, header = true }) => {
  return (
    <div
      className="flex flex-row"
    >
      <div
        className="w-[5%]"
      >
        {!header &&
          <input
            type="checkbox"
            onClick={(e) => { }}
          />
        }
      </div>
      <div
        className="flex flex-row gap-6 w-[95%]"
      >
        <p
          className={`w-[10%] ${textClass}`}
        >
          {header ? "Symbol" : ticker}
        </p>
        <p
          className={`w-[40%] ${textClass}`}
        >
          {header ? "Company Name" : company}
        </p>
        <p
          className={`w-[10%] ${textClass}`}
        >
          {header ? "Last Price" : lastPrice}
        </p>
        <p
          className={`w-[10%] ${textClass}`}
        >
          {header ? "Change" : change}
        </p>
        <p
          className={`w-[10%] ${textClass}`}
        >
          {header ? "% Change" : percentageChange}
        </p>
        <p
          className={`w-[10%] ${textClass}`}
        >
          {header ? " Market Cap" : marketCap}
        </p>
        <div
          className={`w-[10%]`}
        >
          {header ?
            <p
              className={`${textClass}`}
            >
              Action
            </p>
            :
            <div>

            </div>

          }
        </div>
      </div>
    </div>
  )
}

export default Watchlist