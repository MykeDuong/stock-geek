import type { NextComponentType } from 'next'
import { useRouter } from 'next/router';
import { useRef, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useError } from '../../store';
import { trpc } from '../../utils/trpc';
import AccountInformation from './AccountInformation/AccountInformation';

type ErrorType = "ZERO_QUANTITY" | "OVERSELL" | "OVERBUY" | "MARKET_CLOSED" | null;

type TransactionInfoType = {
  type: 'buy' | "sell",
  quantity: number,
  bid: number | undefined,
  ask: number | undefined,
  marketState: string | undefined,
}

interface PropsInterface {
  onPreview: (transaction: TransactionInfoType) => void;
}

const errorMessage = {
  ZERO_QUANTITY: "Please enter a quantity larger than 0.",
  OVERSELL: "You may have entered a quantity larger than the number of chosen stock in your portfolio. Please try again.",
  OVERBUY: "You may not have enough cash in your account to make this transaction. Please try again.",
  MARKET_CLOSED: "The market is currently closed. Please try again later."
}

const AccountInfoHelper = {
  accountValue: "Displays the total current value of your portfolio.",
  buyingPower: "The total value of your cash and margin accounts that can be used to make trades.\nCalculated as: Cash + 50% (Long Stocks) - 150% (Shorted Stocks) (Investopedia)",
  cash: 'Total amount of cash available for making trades.',
}

const TradeOptions: NextComponentType<any, any, PropsInterface> = ({ onPreview }) => {
  // Route
  const router = useRouter();
  const { ticker: tickerRoute } = router.query;
  const ticker = tickerRoute as string;

  // Stores
  const { setMessage, setAppear } = useError();

  // States
  const [userCash, setUserCash] = useState(0);
  const [openType, setOpenType] = useState(false);
  const [sellAvailability, setSellAvailability] = useState(0);
  const [holdingsValue, setHoldingsValue] = useState(0);
  const [readyToTrade, setReadyToTrade] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfoType>({
    type: "buy",
    quantity: 0,
    bid: 0,
    ask: 0,
    marketState: "",
  });

  // Refs
  const quantityRef = useRef<HTMLInputElement>(null)

  // Queries/Mutations
  trpc.user.getUserInfo.useQuery(undefined, {
    onSuccess: (data) => {
      setUserCash(data.cash);
    }
  })

  trpc.portfolio.getHoldings.useQuery(undefined, {
    onSuccess: (data) => {
      let totalHoldingsValue = 0
      data.forEach(tickerRow => {
        if (tickerRow.currentPrice)
          totalHoldingsValue += tickerRow.quantity * (tickerRow.currentPrice)
        if (tickerRow.ticker === ticker)
          setSellAvailability(tickerRow.quantity)
      })
      setHoldingsValue(totalHoldingsValue);
      setReadyToTrade(true)
    }
  })

  trpc.ticker.getTickerInfo.useQuery(
    { ticker },
    {
      onSuccess: (data) => {
        console.log(data.marketState);
        setTransactionInfo({ ...transactionInfo, bid: data.bid, ask: data.ask, marketState: data.marketState })
      }
    }
  )

  // Behaviors
  const setError = (code: ErrorType) => {
    if (code === null) return
    setMessage(errorMessage[code]);
    setAppear();
  }

  const handlePreview = () => {
    if (transactionInfo.marketState !== "REGULAR") {
      setError("MARKET_CLOSED")
    } else if (transactionInfo.quantity === 0) {
      setError("ZERO_QUANTITY")
    } else if (transactionInfo.type === "buy" && userCash < (transactionInfo.quantity * transactionInfo.ask!)) {
      setError("OVERBUY")
    } else if (transactionInfo.type === "sell" && sellAvailability < transactionInfo.quantity) {
      setError("OVERSELL");
    } else {
      onPreview(transactionInfo);
    }
  }

  const setMaxQuant = () => {
    let maxQuant = 0
    if (transactionInfo.type === "buy") {
      if (!transactionInfo.ask || transactionInfo.ask === 0) {
        maxQuant = 0
      }
      else {
        maxQuant = Math.floor(userCash / transactionInfo.ask)
      }
    } else {
      maxQuant = Math.floor(sellAvailability);
    }
    setTransactionInfo({ ...transactionInfo, quantity: maxQuant });
  }

  return (
    <div
      className=" mt-20 mb-10 flex flex-col gap-10"
    >
      {/* Account Detail */}
      <div
        className="w-7/12 pr-6 flex flex-row gap justify-between"
      >
        {/* Account value */}
        <div
          className="w-2/5"
        >
          <AccountInformation 
            name="Account Value" 
            value={userCash + holdingsValue} 
            helper={AccountInfoHelper.accountValue}  
          />
        </div>

        {/* Buying Power */}
        <div
          className="w-2/5 border-l border-r px-5"
        >
          <AccountInformation
            name="Buying Power"
            value={userCash + holdingsValue / 2}
            helper={AccountInfoHelper.accountValue}  
          />
        </div>

        {/* Cash */}
        <div
          className="w-1/5 flex-col px-5"
        >
          <AccountInformation
            name="Cash"
            value={userCash}
            helper={AccountInfoHelper.accountValue}  
          />
        </div>
      </div>

      {/* Transaction information */}
      <div
        className="flex flex-col gap-12"
      >
        {/* First Row */}
        <div
          className=" flex flex-row"
        >
          {/* Action */}
          <div
            className="relative flex flex-col"
          >
            <p
              className="font-raleway font-semibold text-xl text-green-700"
            >
              Action
            </p>
            <div
              className="flex flex-row items-center gap-20"
            >
              {/* Action Button */}
              <div
                className="bg-transparent relative border border-solid rounded-md border-black h-14 font-normal font-raleway text-black  w-80"
              >
                <button
                  className="px-3 h-full w-full"
                  onClick={() => setOpenType(!openType)}
                >
                  <p
                    className="float-left text-xl capitalize"
                  >
                    {transactionInfo.type}
                  </p>
                  <div
                    className="float-right mt-2"
                  >
                    <RiArrowDownSLine />
                  </div>
                </button>

                {/* Drop down */}
                {openType &&
                  <div
                    className="absolute z-10 top-14 w-full bg-beige-500 rounded-md flex flex-col"
                  >
                    <button
                      value="buy"
                      className="font-raleway text-xl capitalize p-3 text-left hover:bg-beige-600 rounded-md"
                      onClick={(e) => {
                        const value = (e.target as HTMLButtonElement).value
                        if (value === "buy")
                          setTransactionInfo({ ...transactionInfo, type: value })
                        setOpenType(false)
                      }}
                    >
                      buy
                    </button>
                    <button
                      value="sell"
                      className="font-raleway text-xl capitalize p-3 text-left hover:bg-beige-600 rounded-md"
                      onClick={(e) => {
                        const value = (e.target as HTMLButtonElement).value
                        if (value === "sell")
                          setTransactionInfo({ ...transactionInfo, type: value })
                        setOpenType(false)
                      }}
                    >
                      sell
                    </button>
                  </div>
                }
              </div>
              {/* Market State */}
              <div
                className="my-0"
              >
                {transactionInfo.marketState !== "REGULAR" ?
                  <div
                    className="flex flex-row gap-1 items-center"
                  >
                    <BiXCircle
                      style={{ color: "#941D1D", height: "1.25rem", width: '1.25rem' }}
                    />
                    <p
                      className='font-raleway text-lg text-red-700'
                    >
                      Market is closed
                    </p>
                  </div>
                  :
                  <div
                    className="flex flex-row gap-1 items-center"
                  >
                    <BiCheckCircle
                      style={{ color: "#395144", height: "1.25rem", width: '1.25rem' }}
                    />
                    <p
                      className='font-raleway text-lg text-green-700'
                    >
                      Market is open
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div
          className="flex flex-row gap-20"
        >
          {/* Quantity */}
          <label
            className="flex flex-col w-80"
          >
            <div>
              <h2
                className="float-left font-raleway font-semibold text-xl text-green-700"
              >
                Quantity
              </h2>
              <button
                className="float-right h-fit flex flex-row gap-1 items-center"
                onClick={setMaxQuant}
              >
                <AiFillEye />
                <p>Show Max</p>
              </button>
            </div>
            <input
              ref={quantityRef}
              className="text-2xl bg-transparent relative border border-solid rounded-md border-black h-14 font-normal font-raleway text-black px-3 "
              type="number"
              min='0'
              value={transactionInfo.quantity !== 0 ? transactionInfo.quantity : ''}
              pattern="[0-9]*"
              onChange={(e) => {
                setTransactionInfo({ ...transactionInfo, quantity: +e.target.value });
              }}
            />
          </label>

          {/* Estimate Price */}
          <div
            className="flex flex-col w-80"
          >
            <h2
              className="font-raleway font-semibold text-xl text-green-700"
            >
              Est. Price
            </h2>
            <div
              className="px-3 border border-solid rounded-md border-black h-14 flex items-center"
            >
              <p
                className="font-raleway text-black text-2xl"
              >
                {transactionInfo.marketState !== "REGULAR" ? "" : (transactionInfo.type === "buy" ? transactionInfo.ask : transactionInfo.bid)}
              </p>
            </div>
          </div>

          {/* Total Value */}
          <div
            className="flex flex-col w-80"
          >
            <h2
              className="font-raleway font-semibold text-xl text-green-700"
            >
              Total Value
            </h2>
            <div
              className="px-3 border border-solid rounded-md border-black h-14 flex items-center"
            >
              <p
                className="font-raleway text-black text-2xl"
              >
                {transactionInfo.marketState !== "REGULAR" ? "" : (transactionInfo.quantity * (transactionInfo.type === "buy" ? transactionInfo.ask! : transactionInfo.bid!)).toLocaleString('en-US')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction command */}
      <div
        className="pr-4 mt-4 flex flex-row gap-10 justify-start w-7/12"
      >
        <button
          className={`py-4 w-1/2 rounded-lg font-raleway text-xl text-white bg-red-700 hover:scale-105`}
          onClick={() => {
            setTransactionInfo({ ...transactionInfo, type: "buy", quantity: 0 })
          }}
        >
          Clear Order
        </button>
        <button
          className={`py-4 w-1/2 rounded-lg font-raleway text-xl text-white ${readyToTrade ? "bg-green-700 hover:scale-105" : 'pointer-events-none bg-beige-700'}`}
          onClick={handlePreview}
        >
          {readyToTrade ? 'Preview Order' : 'Loading Details...'}
        </button>
      </div>
    </div>
  )
}

export default TradeOptions