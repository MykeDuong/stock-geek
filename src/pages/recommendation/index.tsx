import { NextPage } from "next"
import { useRouter } from "next/router";
import { useRef, useState } from 'react'
import { AiOutlineSearch, AiOutlineWarning } from 'react-icons/ai'
import { HeaderImage, SearchBar, TickerInfo } from "../../components";
import { pageTitleClass } from "../../utils/clientUtils";
import { trpc } from '../../utils/trpc';



const Recommendation: NextPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState('');

  const [fetchResult, setFetchResult] = useState(false);

  const recommendationQuery = trpc.ticker.getRecommendations.useQuery({ searchText }, {
    enabled: fetchResult,
    onSuccess: (data) => {
      setFetchResult(false);
    }
  })

  const handleFind = () => {
    setSearchText(searchRef.current ? searchRef.current.value : '');
    setFetchResult(true);
  }

  const handleClear = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  }

  return (
    <div
      className="flex flex-col items-center mb-10"
    >
      <HeaderImage src="/images/recommendation-image.png" alt="recommendation-image" />

      <h1
        className={`${pageTitleClass} mt-6 mb-16`}
      >
        Stock Recommendation
      </h1>

      <h2
        className='text-2xl font-raleway mb-6 font-medium'
      >
        Enter a Stock Symbol(s) to Generate Recommendations of Similar Stocks.
      </h2>

      {/* Search Bar */}
      <div
        className="w-10/12 mb-6"
      >
        <SearchBar placeholder={"Type a Stock Symbol(s) here, separated by commas, e.g. AAPL, GOOG"} ref={searchRef} />
      </div>
      <div
        className="w-2/5 mt-4 flex flex-row justify-center gap-24 mb-6"
      >
        <button
          className='w-52 min-h-fit py-4 bg-green-700 rounded-lg text-white text-xl font-raleway hover:scale-105'
          onClick={handleFind}
        >
          Find Similar Stocks
        </button>
        <button
          className='w-52 min-h-fitpy-4 bg-red-700 rounded-lg text-white text-xl font-raleway hover:scale-105'
          onClick={handleClear}
        >
          Clear Stock Input
        </button>
      </div>
      <div
        className="flex flex-row gap-2 items-center mb-16"
      >
        <AiOutlineWarning style={{ height: '1.5rem', width: '1.5rem' }} />
        <p
          className="font-raleway italic text-xl"
        >
          If there is no result, you may have entered an invalid stock symbol. Please clear input and try again.
        </p>
      </div>
      {recommendationQuery.isSuccess && (
        <div
          className="w-full px-6"
        >
          <div
            className="flex flex-col gap-6 w-full"
          >
            {recommendationQuery.data.map(ticker => (
              <TickerInfo ticker={ticker} key={`rec ticker for ${ticker} `} />
            ))}
          </div>

        </div>
      )}
    </div>
  )
}

export default Recommendation