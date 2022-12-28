import { NextPage } from "next"
import { useRef } from 'react'
import { AiOutlineSearch, AiOutlineWarning } from 'react-icons/ai'
import { TickerInfo } from "../../components";
import { trpc } from '../../utils/trpc';



const Recommendation: NextPage = () => {
  const inputTickerRef = useRef<HTMLInputElement>(null);

  const handleFind = () => {
    const ticker = inputTickerRef.current ? inputTickerRef.current.value : '';
    
  }

  const handleClear = () => {
    if (inputTickerRef.current) {
      inputTickerRef.current.value = "";
    }
  }

  return (
    <div
      className="flex flex-col items-center"
    >
      <h1
        className="text-4xl mt-6 mb-4 font-raleway font-semibold"
      >
        Stock Recommendation
      </h1>

      <p
        className='text-xl text-slate-600'
      >
        Enter a Stock Symbol to Generate Recommendations.
      </p>

      <div
        className="flex flex-row items-center mb-6 gap-1"
      >
        <AiOutlineWarning style={{ height: '2rem', width: '2rem', color: "#8B4000" }} />
        <p
          className='text-xl text-slate-600'
        >
          If you see no result, you may have entered an invalid Stock Symbol
        </p>
      </div>

      {/* Search Bar */}
      <div 
        className='h-10 w-3/5 border border-solid border-black rounded-3xl flex flex-row items-center gap-2 pl-2 pr-6'
      >
        <AiOutlineSearch style={{ height: '1.8rem', width: '1.8rem', color: '#475569' }} />
        <input 
          className="bg-transparent w-full outline-none font-nunito"
          placeholder="Type a Stock Symbol, e.g AAPL"
          ref={inputTickerRef}
        />
      </div>
      <div
        className="h-12 w-2/5 mt-4 flex flex-row justify-center gap-10"
      >
        <button
          className='h-full w-51 bg-green-600 rounded-lg text-white text-lg font-nunito px-3'
          onClick={handleFind}
        >
          Find Similar Stocks
        </button>
        <button
          className='h-full w-51 bg-slate-900 rounded-lg text-white text-lg font-nunito px-4'
          onClick={handleClear}
        >
          Clear Stock Input
        </button>
      </div>

      <TickerInfo ticker={"AAPL"} />
    </div>
  )
}

export default Recommendation