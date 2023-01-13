import type { NextComponentType } from 'next'
import React from 'react'
import { AiOutlineLineChart } from 'react-icons/ai'
import { MiniChart } from '..'
import { trpc } from '../../utils/trpc'


const TrendingTickers: NextComponentType = () => {

  const { data: tickers } = trpc.ticker.getTrending.useQuery();

  return (
    <div className=" bg-beige-300 px-6 py-6  shadow-lg">

    <div
      className=" overflow-x-scroll whitespace-nowrap pb-6 flex flex-row gap-6 "
    >
      {tickers?.map((ticker) => (
        <MiniChart ticker={ticker} key={`chart for ${ticker}`} />
      ))}
    </div>
    </div>
  )
}

export default TrendingTickers