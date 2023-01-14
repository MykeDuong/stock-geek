import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { AiOutlineWarning } from "react-icons/ai"

import { MarketInfo, SearchBar } from "../../components"
import { trpc } from "../../utils/trpc"
import { pageTitleClass } from "../../utils/clientUtils"

const Simulator: NextPage = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null)

  const [searchText, setSearchText] = useState('');
  const [fetchResult, setFetchResult] = useState(false);

  const searchQuery = trpc.ticker.search.useQuery({ searchText }, {
    enabled: fetchResult,
    onSuccess: () => {
      setFetchResult(false);
    }
  })

  const handleSearch = () => {
    setSearchText(searchRef.current ? searchRef.current.value : '');
    if (searchText === '') {
      return
    } else
      setFetchResult(true);
  }

  return (
    <div
      className="min-h-fit pb-20 bg-beige-400"
    >
      <h1
        className={`${pageTitleClass} my-6`}
      >
        Trade Simulator
      </h1>
      <p
        className="font-raleway text-2xl font-semibold text-center mb-5"
      >
        Enter a Stock Symbol to Search
      </p>
      <div
        className="flex flex-row gap-2 mx-10 justify-center mb-5 text-center"
      >
        <AiOutlineWarning color="#000000" style={{ height: '1.5rem', width: '1.5rem' }} />
        <p
          className="font-raleway text-xl italic text-center"
        >
          If there is no result, you may have entered an invalid stock symbol. Please clear input and try again.
        </p>

      </div>
      <div
        className="relative mx-28"
      >
        <SearchBar placeholder={"Type Stock Symbol here, i.e. AAPL"} ref={searchRef} onChange={handleSearch} />
        
        {searchQuery.isSuccess &&
          <div
            className="absolute z-10 w-full bg-beige-200 rounded-2xl"
          >
            {searchQuery.data.length !== 0 ? 
              <div
                className="flex flex-col"
              >
                {searchQuery.data.map(ticker => (
                  <button
                    className="px-12 py-2 rounded-xl hover:bg-beige-600"
                    key={`result of ${ticker.symbol}`}
                    onClick={() => {router.push({
                      pathname: '/simulator/[ticker]',
                      query: { ticker: ticker.symbol }
                    })}}
                  >
                    <p
                      className="font-raleway float-left text-lg"
                    >
                      {ticker.symbol}
                    </p>
                    <p
                      className="font-raleway float-right text-lg"
                    >
                      {ticker.name}
                    </p>
                  </button>
                ))}
              </div>
                :
              <p
                className="font-raleway text-slate-500 text-lg italic py-3 px-12"
              >
                No matched ticker
              </p>
            }
          </div>

        }
      </div>
      
      <div
        className="w-full px-40 flex flex-row items-center gap-10 mt-6"
      >
        <div
          className="text-center flex flex-col gap-6 w-1/2"
        >
          <h1
            className="font-raleway text-4xl uppercase text-red-700 font-bold"
          >
            Stock Market Performance
          </h1>
          <p
            className="font-raleway text-xl"
          >
            Check out the top gaining, losing, and most active stocks for the day. It updates based on current market activity - so you’ll always see the most relevant stocks.
          </p>
        </div>
        <div
          className="w-1/2 h-[36rem]"
        >
          <MarketInfo />
        </div>
      </div>
    </div>
  )
}

export default Simulator