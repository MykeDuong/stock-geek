import type { NextComponentType } from 'next'
import { useEffect, useState } from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'

import { trpc } from '../../utils/trpc'
import PortfolioInfoCell from './PortfolioInfoRow/PortfolioInfoCell'
import { portfolioHelperMessages } from '../../utils/clientUtils'

const questionPromptClass = { height: '1rem', width: '1rem' }

const rowClass = 'flex flex-row gap-2 h-1/3'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2
});

const PortfolioOverview: NextComponentType = () => {

  // States
  const [dataAvailable, setDataAvailable] = useState(false);
  const [holdingsAvailable, setHoldingsAvailable] = useState(false);
  const [cashAvailable, setCashAvailable] = useState(false);
  const [accountValueHelper, setAccountValueHelper] = useState(false);

  const [cash, setCash] = useState(0)
  const [totalHoldingsValue, setTotalHoldingsValue] = useState(0);
  const [totalPurchaseValue, setTotalPurchaseValue] = useState(0);

  const userQuery = trpc.user.getUserInfo.useQuery(undefined, {
    onSuccess: (data) => {
      setCash(data.cash)
      setCashAvailable(true);
    }
  });

  const holdingsQuery = trpc.portfolio.getHoldings.useQuery(undefined, {
    onSuccess: (data) => {
      let tv = 0; // total value
      let tp = 0; // total purchase
      data.forEach(ticker => {
        tv += ticker.currentPrice * ticker.quantity;
        tp += ticker.purchasePrice * ticker.quantity;
      })
      setTotalHoldingsValue(tv)
      setTotalPurchaseValue(tp)
      setHoldingsAvailable(true);
    }
  });

  useEffect(() => {
    if (cashAvailable && holdingsAvailable) setDataAvailable(true);
  }, [cashAvailable, holdingsAvailable])

  return (
    <div
      className={`h-full w-full bg-beige-300 shadow-lg flex flex-col px-6 pt-6`}
    >
      <div
        className="flex flex-col mb-10"
      >
        <div
          className="flex flex-row gap-2 items-center"
        >
          <h3
            className="font-raleway text-2xl text-beige-700 font-semibold uppercase "
          >
            Account Value
          </h3>
          <div
            className="flex items-center"
            onMouseMove={() => setAccountValueHelper(true)}
            onMouseLeave={() => setAccountValueHelper(false)}
          >
            <AiFillQuestionCircle style={questionPromptClass} />
            <div
              className="relative"
            >
              {accountValueHelper &&
                <div
                  className="absolute z-10 w-80 bg-beige-300 border rounded-lg p-2"
                >
                  {portfolioHelperMessages.accountValue}
                </div>
              }
            </div>
          </div>
        </div>
        <p
          className="font-raleway text-4xl font-semibold"
        >
          {dataAvailable ? currencyFormatter.format((totalHoldingsValue + cash)) : ''}
        </p>
      </div>
      {/* Account info */}
      <div
        className="flex flex-col justify-around h-full"
      >
        <div
          className={rowClass}
        >
          <PortfolioInfoCell
            title="Today's Change"
            sign={true}
            positive={10000 > 0}
            value={currencyFormatter.format(100)}
            subvalue={percentageFormatter.format(0.1)}
          />
          <PortfolioInfoCell
            title="Total Gain/Loss"
            sign={true}
            positive={(totalHoldingsValue + cash - 10000) >= 0}
            value={currencyFormatter.format(Math.abs(totalHoldingsValue + cash - 10000))}
          />
        </div>
        <div
          className={rowClass}
        >
          <PortfolioInfoCell
            title="Buying Power"
            value={currencyFormatter.format(cash + (totalHoldingsValue / 2))}
            helper={portfolioHelperMessages.buyingPower}
          />
          <PortfolioInfoCell
            title="Cash"
            value={currencyFormatter.format(cash)}
            helper={portfolioHelperMessages.cash}
          />
        </div>
        <div
          className={rowClass}
        >
          <PortfolioInfoCell
            title="Cum. Return"
            sign={true}
            positive={cash + totalHoldingsValue - 10000 >= 0}
            value={percentageFormatter.format(Math.abs(cash + totalHoldingsValue - 10000) / 10000)}
            helper={portfolioHelperMessages.cummulativeReturn}
          />
          <PortfolioInfoCell
            title="Annual Return"
            sign={true}
            positive={cash + totalHoldingsValue - 10000 >= 0}
            value={percentageFormatter.format(Math.abs(cash + totalHoldingsValue - 10000) / 10000)}
            helper={portfolioHelperMessages.annualReturn}
          />
        </div>
      </div>
    </div>
  )
}

export default PortfolioOverview