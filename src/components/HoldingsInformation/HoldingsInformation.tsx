import type { NextComponentType } from 'next'
import { useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc'
import HoldingsRow from './HoldingsRow/HoldingsRow';

const columnNameClass = 'font-raleway text-lg font-semibold capitalize'

interface HoldingsInterface {
  ticker: string;
  company: string,
  currentPrice: number,
  purchasePrice: number,
  quantity: number
}

const HoldingsInformation: NextComponentType = () => {

  const [totalValue, setTotalValue] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0)
  const [totalChange, setTotalChange] = useState(0);
  const [holdingsDataAvailable, setHoldingsDataAvailable] = useState(false);
  const [holdings, setHoldings] = useState<HoldingsInterface[]>([])
  const holdingsQuery = trpc.portfolio.getHoldings.useQuery(undefined, {
    onSuccess: (data) => {
      setHoldings(data)
    }
  });

  useEffect(() => {
    let tv = 0 // totalValue
    let tp = 0 // totalPurchase
    setHoldingsDataAvailable(true)
    holdings.forEach(ticker => {
      tv += ticker.currentPrice * ticker.quantity;
      tp += ticker.purchasePrice * ticker.quantity;
    })
    setTotalValue(tv);
    setTotalPurchase(tp);
    setTotalChange(tv - tp);
  }, [holdings])

  return (
    <div
      className={`w-full h-full bg-beige-300 shadow-lg px-4 pt-4 pb-4`}
    >
      <div
        className="flex flex-row gap-8"
      >
        <div>
          <h3
            className="font-raleway text-lg uppercase text-beige-700"
          >
            Total Value
          </h3>
          <p
            className={`font-raleway text-xl font-semibold`}

          >
            {`$${totalValue.toLocaleString('en-US')}`}
          </p>
        </div>
        <div>
          <h3
            className="font-raleway text-lg uppercase text-beige-700"

          >
            Total Gains/Loss
          </h3>
          <p
            className={`font-raleway text-xl font-semibold ${totalChange >= 0 ? 'text-green-700' : 'text-red-700'}`}
          >
            {`${(totalChange >= 0) ? "+" : "-"} $${((Math.abs(totalChange)).toLocaleString('en-US'))} (${(totalPurchase > 0 ? (totalChange)/ totalPurchase * 100 : 0).toLocaleString('en-US')}%)`}
          </p>
        </div>
      </div>
      {/* Column Name */}
      <div
        className="border-slate-400 border-b border-t flex flex-row px-4 py-3 mt-6"
      >
        <div
          className="w-[10%]"
        >
          <h3
            className={`${columnNameClass}`}
          >
            Symbol
          </h3>
        </div>
        <div
          className="w-[18%]"
        >
          <h3
            className={`${columnNameClass}`}
          >
            Company Name
          </h3>
        </div>
        <div
          className="w-[15%]"
        >
          <h3
            className={`${columnNameClass}`}
          >
            Current Price
          </h3>
        </div>
        <div
          className="w-[15%]"
        >
          <h3
            className={`${columnNameClass}`}
          >
            Purchase Price
          </h3>
        </div>
        <div
          className="w-[10%]"
        >
          <h3
            className={`${columnNameClass}`}
          >
            Quantity
          </h3>
        </div>
        <div
          className="w-[10%]"
        >
          <h3
            className={`${columnNameClass}`}
          >
            Total value
          </h3>
        </div>
        <div
          className="w-[15%]"
        >
          <h3
            className={`${columnNameClass}`}
          >
            Total Gain/Loss
          </h3>
        </div>
        <div
          className="w-[7%] text-center"
        >
          <h3
            className={`${columnNameClass}`}
          >
            Action
          </h3>
        </div>
      </div>

      {/* Rows */}
      <div
        className="flex items-center mt-4"
      >
        {holdingsDataAvailable ? 
          <div
            className="flex flex-col w-full gap-2"
          >
            {holdings.map((ticker) =>
              <HoldingsRow 
                key={`key for Holdings Row of ${ticker.ticker}`}
                symbol={ticker.ticker} 
                company={ticker.company} 
                currentPrice={ticker.currentPrice} 
                purchasePrice={ticker.purchasePrice} 
                quantity={ticker.quantity} 
              />
            )}
          </div>
          :
          <div>

          </div>
        }
      </div>
    </div>
  )
}

export default HoldingsInformation