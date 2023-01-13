import type { NextComponentType } from 'next'
import { useEffect, useState } from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'

import { trpc } from '../../utils/trpc'
import PortfolioInfoCell from './PortfolioInfoRow/PortfolioInfoCell'
import { portfolioHelperMessages } from '../../utils/clientUtils'
import { today } from '../../utils/constants'

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

  const [cash, setCash] = useState(10000)
  const [totalHoldingsValue, setTotalHoldingsValue] = useState(0);
  const [portfolioAge, setPortfolioAge] = useState(0);

  const [firstPortfolioValue, setFirstPortfolioValue] = useState(10000);
  const [yesterdayPortfolioValue, setYesterdayPortfolioValue] = useState(10000);

  // Queries/Mutations
  trpc.user.getUserInfo.useQuery(undefined, {
    onSuccess: (data) => {
      setCash(data.cash)
      setCashAvailable(true);
    }
  });

  trpc.portfolio.getHoldings.useQuery(undefined, {
    onSuccess: (data) => {
      let tv = 0; // total value
      let tp = 0; // total purchase
      data.forEach(ticker => {
        tv += (ticker.currentPrice ? ticker.currentPrice : 0) * ticker.quantity;
        tp += ticker.purchasePrice * ticker.quantity;
      })
      setTotalHoldingsValue(tv)
      setHoldingsAvailable(true);
    }
  });

  trpc.portfolio.getTimeSeriesValues.useQuery(undefined, {
    onSuccess: (data) => {
      if (data[0]) {
        setFirstPortfolioValue(data[0].value);
        setPortfolioAge(Math.floor(((today).getTime() - data[0].date.getTime()) / (1000 * 3600 * 24)) );
      }
      const yesterday = data[data.length - 2]
      if (yesterday) setYesterdayPortfolioValue(yesterday.value)
    }
  })

  useEffect(() => {
    if (cashAvailable && holdingsAvailable) setDataAvailable(true);
  }, [cashAvailable, holdingsAvailable])

  return (
    <div
      className={`h-full w-full bg-beige-300 shadow-lg flex flex-col px-6 py-6`}
    >
      <div
        className="flex flex-col mb-6"
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
          {dataAvailable ? currencyFormatter.format((totalHoldingsValue + cash)) : 'loading...'}
        </p>
      </div>
      {/* Account info */}
      <div
        className="flex flex-col justify-around gap-6"
      >
        <div
          className={rowClass}
        >
          <PortfolioInfoCell
            title="Today's Change"
            sign={true}
            positive={dataAvailable ? totalHoldingsValue + cash >= yesterdayPortfolioValue : true}
            value={dataAvailable ? currencyFormatter.format(Math.abs(totalHoldingsValue + cash - yesterdayPortfolioValue)) : 'loading...'}
            subvalue={dataAvailable ? percentageFormatter.format(Math.abs(totalHoldingsValue + cash - yesterdayPortfolioValue) / yesterdayPortfolioValue) : ''}
          />
          <PortfolioInfoCell
            title="Total Gain/Loss"
            sign={true}
            positive={dataAvailable ? (totalHoldingsValue + cash - firstPortfolioValue) >= 0 : true}
            value={dataAvailable ? currencyFormatter.format(Math.abs(totalHoldingsValue + cash - firstPortfolioValue)) : "loading..."}
          />
        </div>
        <div
          className={rowClass}
        >
          <PortfolioInfoCell
            title="Buying Power"
            value={dataAvailable ? currencyFormatter.format(cash + (totalHoldingsValue / 2)) : 'loading...'}
            helper={portfolioHelperMessages.buyingPower}
          />
          <PortfolioInfoCell
            title="Cash"
            value={dataAvailable ? currencyFormatter.format(cash) : 'loading...'}
            helper={portfolioHelperMessages.cash}
          />
        </div>
        <div
          className={rowClass}
        >
          <PortfolioInfoCell
            title="Cum. Return"
            sign={true}
            positive={dataAvailable ? cash + totalHoldingsValue - firstPortfolioValue >= 0 : true}
            value={dataAvailable ? percentageFormatter.format(Math.abs(cash + totalHoldingsValue - firstPortfolioValue) / firstPortfolioValue) : 'loading...'}
            helper={portfolioHelperMessages.cummulativeReturn}
          />
          <PortfolioInfoCell
            title="Annual Return"
            sign={true}
            positive={dataAvailable ? cash + totalHoldingsValue - firstPortfolioValue >= 0 : true}
            value={dataAvailable ? percentageFormatter.format(Math.abs((1 + (cash + totalHoldingsValue - firstPortfolioValue) / firstPortfolioValue)**(365 / portfolioAge) - 1)) : 'loading...'}
            helper={portfolioHelperMessages.annualReturn}
          />
        </div>
      </div>
    </div>
  )
}

export default PortfolioOverview