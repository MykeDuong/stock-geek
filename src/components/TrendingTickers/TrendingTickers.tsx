import { NextComponentType } from 'next'
import React from 'react'
import { MiniChart } from '..'

interface PropsInterface {
  tickers?: string[]
}

const TrendingTickers: NextComponentType<any, any, PropsInterface> = ({ tickers }) => {
  return (
    <div
      className="bg-beige-300 pt-8 px-6 overflow-x-scroll whitespace-nowrap h-80 flex flex-row gap-6"
    >
      {tickers?.map((ticker) => (
        <MiniChart ticker={ticker} key={`chart for ${ticker}`} />
      ))}
    </div>
  )
}

export default TrendingTickers