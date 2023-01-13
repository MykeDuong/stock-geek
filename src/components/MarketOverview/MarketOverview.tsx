import type { NextComponentType } from 'next'
import { AiOutlineFundView } from 'react-icons/ai'
import MarketPerformance from '../MarketPerformance/MarketPerformance'
import News from '../News/News'
import TickerBanner from '../TickerBanner/TickerBanner'

const MarketOverview: NextComponentType = () => {
  return (
    <div
      className="bg-beige-300 mt-6 p-4 flex flex-col shadow-lg"
    >
      <TickerBanner />
      <div
        className="w-full flex flex-row gap-2"
      >
        <div
          className="w-2/3 min-h-[32rem] h-[32rem]"
        >
          <MarketPerformance />
        </div>
        <div
          className="w-1/3 min-h-[32rem] h-[32rem]"
        >
          <News />
        </div>
      </div>
    </div>
  )
}

export default MarketOverview