import type { NextComponentType } from 'next'
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc'
import StatisticsItem from './StatisticsItem/StatisticsItem';


const TickerCoreStatistics: NextComponentType = () => {
  // Route
  const router = useRouter();
  const { ticker: tickerRoute } = router.query;
  const ticker = tickerRoute as string;


  const tickerInfoQuery = trpc.ticker.getTickerInfo.useQuery({ ticker })

  return (
    <div
      className="w-full flex flex-row gap-4"
    >
      {/* Left Col */}
      <div
        className="w-1/2 flex flex-col gap-6"
      >
        <StatisticsItem
          name="Volume"
          value={tickerInfoQuery.data?.volume?.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        />
        {/* Day High */}
        <StatisticsItem
          name="Day High ($)"
          value={tickerInfoQuery.data?.dayHigh?.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        />

        {/* Day Low */}
        <StatisticsItem
          name="Day Low ($)"
          value={tickerInfoQuery.data?.dayLow?.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        />

      </div>

      {/* Right Col */}
      <div
        className="w-1/2 flex flex-col gap-6"
      >
        {/* Bid/Ask price */}
        <StatisticsItem
          name="Bid/Ask Price ($)"
          value={`${tickerInfoQuery.data?.bid?.toLocaleString('en-US', { maximumFractionDigits: 2 })}/${tickerInfoQuery.data?.ask?.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
        />

        {/* 52-week High */}
        <StatisticsItem
          name="52-week High ($)"
          value={tickerInfoQuery.data?.fiftyTwoWeekHigh?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
        />

        {/* 52-week Low */}
        <StatisticsItem
          name="52-week Low ($)"
          value={tickerInfoQuery.data?.fiftyTwoWeekLow?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
        />
      </div>
    </div>

  )
}

export default TickerCoreStatistics