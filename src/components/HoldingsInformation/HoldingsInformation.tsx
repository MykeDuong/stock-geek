import type { NextComponentType } from 'next'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'

const columnNameClass = 'font-raleway text-lg capitalize'

const HoldingsInformation: NextComponentType = () => {

  const [holdings, setHoldings] = useState([])
  const holdingsQuery = trpc.portfolio.getHoldings.useQuery();

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
            className={`font-raleway text-xl`}

          >
            $10000
          </p>
        </div>
        <div>
          <h3
            className="font-raleway text-lg uppercase text-beige-700"

          >
            Total Gains/Loss
          </h3>
          <p
            className={`font-raleway text-xl`}
          >
            {`+ $100.00  (10.00%)`}
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
    </div>
  )
}

export default HoldingsInformation