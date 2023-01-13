import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import React from 'react'

interface PropsInterface {
  symbol: string;
  company: string;
  currentPrice: number;
  purchasePrice: number;
  quantity: number;
}

const cellClass = 'flex items-center'

const cellTextClass = 'font-raleway text-lg font-medium capitalize'

const HoldingsRow: NextComponentType<any, any, PropsInterface> = ({ symbol, company, currentPrice, purchasePrice, quantity }) => {

  // Router
  const router = useRouter();        

  // States
  const totalValue = currentPrice * quantity;
  const buyValue = purchasePrice * quantity
  const totalChange = totalValue - buyValue;

  return (
    <div
      className="border-slate-400 flex flex-row h-12 px-4 mx-0"
    >
      <div
        className={`${cellClass} w-[10%]`}
      >
        <h3
          className={`${cellTextClass} text-beige-700`}
        >
          {symbol}
        </h3>
      </div>
      <div
        className={`${cellClass} w-[18%]`}
      >
        <h3
          className={`${cellTextClass}`}
        >
          {company}
        </h3>
      </div>
      <div
        className={`${cellClass} w-[15%]`}
      >
        <h3
          className={`${cellTextClass}`}
        >
          {currentPrice}
        </h3>
      </div>
      <div
        className={`${cellClass} w-[15%]`}
      >
        <h3
          className={`${cellTextClass}`}
        >
          {purchasePrice.toLocaleString('en-US', { maximumFractionDigits: 2})}
        </h3>
      </div>
      <div
        className={`${cellClass} w-[10%]`}
      >
        <h3
          className={`${cellTextClass}`}
        >
          {quantity}
        </h3>
      </div>
      <div
        className={`${cellClass} w-[10%]`}
      >
        <h3
          className={`${cellTextClass}`}
        >
          {totalValue.toLocaleString("en-US", { maximumFractionDigits: 2})}
        </h3>
      </div>
      <div
        className={`${cellClass} w-[15%]`}
      >
        <h3
          className={`${cellTextClass} ${totalChange >=  0 ? 'text-green-700' : 'text-red-700'}`}
        >
          {totalChange.toLocaleString('en-US', { maximumFractionDigits: 2})}
        </h3>
      </div>
      <div
        className={`${cellClass} w-[7%]`}
      >
        <button
          className="w-full font-raleway text-lg text-white px-3 py-2 bg-green-700 rounded-lg hover:scale-105"
          onClick={() => router.push(`/simulator/${symbol}`)}
        >
          Trade
        </button>
      </div>
    </div>
  )
}

export default HoldingsRow