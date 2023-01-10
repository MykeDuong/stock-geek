import type { NextComponentType } from 'next';
import React from 'react'

interface PropsInterface {
  symbol: string;
  company: string;
  currentPrice: number;
  purchasePrice: number;
  quantity: number;
}

const cellTextClass = 'font-raleway text-lg capitalize'

const HoldingsRow: NextComponentType<any, any, PropsInterface> = ({ symbol, company, currentPrice, purchasePrice, quantity }) => {
  const totalValue = currentPrice * quantity;
  const buyValue = purchasePrice * quantity
  const totalChange = totalValue - buyValue;

  return (
    <div
      className="border-slate-400 flex flex-row h-12 px-4 mx-0"
    >
      <div
        className="w-[10%]"
      >
        <h3
          className={`${cellTextClass} text-beige-700`}
        >
          {symbol}
        </h3>
      </div>
      <div
        className="w-[18%]"
      >
        <h3
          className={`${cellTextClass}`}
        >
          {company}
        </h3>
      </div>
      <div
        className="w-[15%]"
      >
        <h3
          className={`${cellTextClass}`}
        >
          {currentPrice}
        </h3>
      </div>
      <div
        className="w-[15%]"
      >
        <h3
          className={`${cellTextClass}`}
        >
          {purchasePrice.toLocaleString('en-US')}
        </h3>
      </div>
      <div
        className="w-[10%]"
      >
        <h3
          className={`${cellTextClass}`}
        >
          {quantity}
        </h3>
      </div>
      <div
        className="w-[10%]"
      >
        <h3
          className={`${cellTextClass}`}
        >
          {totalValue.toLocaleString("en-US")}
        </h3>
      </div>
      <div
        className="w-[15%]"
      >
        <h3
          className={`${cellTextClass} ${totalChange > 0 ? 'text-green-700' : 'text-red-700'}`}
        >
          {totalChange.toLocaleString('en-US')}
        </h3>
      </div>
      <div
        className="w-[7%] text-center"
      >
        <button
          className="font-raleway text-lg text-white px-3 py-2 bg-green-700 rounded-lg"
        >
          Trade
        </button>
      </div>
    </div>
  )
}

export default HoldingsRow