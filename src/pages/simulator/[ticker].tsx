import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillEye, AiFillQuestionCircle } from 'react-icons/ai'
import { BiArrowBack, BiCheckCircle, BiXCircle } from 'react-icons/bi'
import { RiArrowDownSLine } from 'react-icons/ri'
import { string } from 'zod'

import { TickerChart, TickerInfo, TickerTechnicalAnalysis, Error, PreviewOrder } from '../../components'
import { trpc } from '../../utils/trpc'

type ErrorType = "ZERO_QUANTITY" | "OVERSELL" | "OVERBUY" | "MARKET_CLOSED" |  null;

type TransactionInfoType = {
  type: 'buy' | "sell",
  quantity: number,
  bid: number | undefined,
  ask: number | undefined,
  marketState: string | undefined,
}

const errorMessage = {
  ZERO_QUANTITY: "Please enter a quantity larger than 0.",
  OVERSELL: "You may have entered a quantity larger than the number of chosen stock in your portfolio. Please try again.",
  OVERBUY: "You may not have enough cash in your account to make this transaction. Please try again.",
  MARKET_CLOSED: "The market is currently closed. Please try again later."
}

const TickerPage: NextPage = () => {
  // Route
  const router = useRouter();
  const { ticker: tickerRoute } = router.query;
  const ticker = tickerRoute as string;

  // Ref
  const additionalInfo = useRef<HTMLDivElement>(null)
  const quantityRef = useRef<HTMLInputElement>(null)

  // States
  const [viewProfile, setViewProfile] = useState(false)
  const [viewTrade, setViewTrade] = useState(false)
  const [watchlisted, setWatchlisted] = useState(false)
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState<ErrorType>(null);
  const [openType, setOpenType] = useState(false);
  const [availability, setAvailability] = useState(0);
  const [readyToTrade, setReadyToTrade] = useState(false);

  // Queries/Mutations
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfoType>({
    type: "buy",
    quantity: 0,
    bid: 0,
    ask: 0,
    marketState: "",
  });

  const addToWatchlistQuery = trpc.watchlist.addToWatchlist.useMutation();

  const tickerInfoQuery = trpc.ticker.getTickerInfo.useQuery(
    { ticker },
    {
      onSuccess: (data) => {
        console.log(data.marketState);
        setTransactionInfo({ ...transactionInfo, bid: data.bid, ask: data.ask, marketState: data.marketState })
      }
    }
  )

  const availabilityQuery = trpc.portfolio.getAvailability.useQuery({ ticker }, {
    onSuccess: (data) => {
      setAvailability(data);
      setReadyToTrade(true);
    }
  });

  const { data: userData } = trpc.user.getUserInfo.useQuery();

  useEffect(() => {
    if (viewProfile || viewTrade) {
      additionalInfo.current?.scrollIntoView();
    }
  }, [viewProfile, viewTrade]);

  return (
    <div
      className="relative"
    >
      <div
        className={`${(error || preview) && 'pointer-events-none blur-sm'}`}
      >
        {/* Back */}
        <div
          className="w-full h-20 pt-4 px-10"
        >
          <button
            className="bg-beige-600 py-2 px-3 font-raleway text-sm rounded-lg flex flex-row gap-1 items-center"
            onClick={() => { router.push('/simulator') }}
          >
            <BiArrowBack style={{ height: '1.2rem', width: '1.2rem' }} />
            Back to Search Results
          </button>
        </div>

        {/* Ticker Data */}
        <div
          className="mx-10"
        >
          {/* Ticker Info */}
          <div
            className="mb-6"
          >
            {ticker !== "" &&
              <TickerInfo ticker={ticker} showButton={false} />
            }
          </div>

          <div
            className="flex flex-row gap-6 w-full h-[36rem] min-h-fit"
          >
            {/* Ticker Information */}
            <div
              className="flex flex-col w-7/12"
            >
              {/* Essential Information */}
              <div
                className="w-full flex flex-row gap-4"
              >
                {/* Left Col */}
                <div
                  className="w-1/2 flex flex-col gap-6"
                >
                  {/* Volume */}
                  <div
                    className="border-b min-h-fit px-1 py-2 overflow-auto"
                  >
                    <p
                      className="font-raleway text-xl font-semibold float-left"
                    >
                      Volume
                    </p>
                    <p
                      className="font-raleway text-xl float-right"
                    >
                      {tickerInfoQuery.data?.volume?.toLocaleString("en-US")}
                    </p>
                  </div>

                  {/* Day High */}
                  <div
                    className="border-b min-h-fit px-1 py-2 overflow-auto"
                  >
                    <p
                      className="font-raleway text-xl font-semibold float-left"
                    >
                      Day High ($)
                    </p>
                    <p
                      className="font-raleway text-xl float-right"
                    >
                      {tickerInfoQuery.data?.dayHigh}
                    </p>
                  </div>

                  {/* Day Low */}
                  <div
                    className="border-b min-h-fit px-1 py-2 overflow-auto"
                  >
                    <p
                      className="font-raleway text-xl font-semibold float-left"
                    >
                      Day Low ($)
                    </p>
                    <p
                      className="font-raleway text-xl float-right"
                    >
                      {tickerInfoQuery.data?.dayLow}
                    </p>
                  </div>
                </div>
                {/* Right Col */}
                <div
                  className="w-1/2 flex flex-col gap-6"
                >
                  {/* Bid/Ask price */}
                  <div
                    className="border-b min-h-fit px-1 py-2 overflow-auto"
                  >
                    <p
                      className="font-raleway text-xl font-semibold float-left"
                    >
                      Bid/Ask Price ($)
                    </p>
                    <p
                      className="font-raleway text-xl float-right"
                    >
                      {`${tickerInfoQuery.data?.bid}/${tickerInfoQuery.data?.ask}`}
                    </p>
                  </div>

                  {/* 52-week High */}
                  <div
                    className="border-b min-h-fit px-1 py-2 overflow-auto"
                  >
                    <p
                      className="font-raleway text-xl font-semibold float-left"
                    >
                      52-week High ($)
                    </p>
                    <p
                      className="font-raleway text-xl float-right"
                    >
                      {tickerInfoQuery.data?.fiftyTwoWeekHigh}
                    </p>
                  </div>

                  {/* 52-week Low */}
                  <div
                    className="border-b min-h-fit px-1 py-2 overflow-auto"
                  >
                    <p
                      className="font-raleway text-xl font-semibold float-left"
                    >
                      52-week Low ($)
                    </p>
                    <p
                      className="font-raleway text-xl float-right"
                    >
                      {tickerInfoQuery.data?.fiftyTwoWeekLow}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Analysis */}
              <div
                className="w-full flex flex-col justify-center items-center"
              >
                <div
                  className="w-3/5 min-h-[25rem]"
                >
                  <TickerTechnicalAnalysis ticker={ticker} />
                </div>
              </div>
            </div>

            {/* Ticker Chart */}
            <div
              className="w-5/12 h-full"
            >
              {ticker !== '' &&
                <TickerChart ticker={ticker} />
              }
            </div>
          </div>
        </div>

        {/* Profile and Trade */}
        <div
          className={`mx-10 p-2 ${viewProfile && 'min-h-screen'} ${viewTrade && 'min-h-screen'}`}
          ref={additionalInfo}
        >
          {/* Button */}
          <div
            className="pr-6 mt-4 flex flex-row gap-10 justify-start w-7/12"
          >
            <button
              className={`py-4 w-1/3 rounded-lg font-raleway text-xl text-white ${viewProfile ? 'bg-beige-600' : 'bg-green-700'} hover:scale-105`}
              onClick={() => {
                setViewTrade(false)
                setViewProfile(!viewProfile);
              }}
            >
              Company Profile
            </button>
            <button
              className={`py-4 w-1/3 rounded-lg font-raleway text-xl text-white ${viewTrade ? 'bg-beige-600' : 'bg-green-700'} hover:scale-105`}
              onClick={() => {
                setViewProfile(false);
                setViewTrade(!viewTrade);
              }}
            >
              Trade
            </button>
            <button
              className={`py-4 w-1/3 rounded-lg font-raleway text-xl text-white ${watchlisted ? 'bg-beige-600 pointer-events-none' : 'bg-green-700 hover:scale-105'}`}
              onClick={() => {
                setWatchlisted(true);
                addToWatchlistQuery.mutate({ ticker })
              }}
            >
              {watchlisted ? 'Added to Watchlist' : "Add to Watchlist"}
            </button>
          </div>

          {/* Profile */}
          {viewProfile &&
            <div
              className="w-7/12 pr-6 mt-20 mb-10 flex flex-col gap-10"
            >
              <div
                className="flex flex-col gap-2"
              >
                <h2
                  className="capitalize font-raleway text-3xl text-green-700 font-semibold"
                >
                  Company Name
                </h2>
                <hr className="h border-slate-500" />
                <p
                  className="font-raleway text-xl"
                >
                  {tickerInfoQuery.data?.name}
                </p>
              </div>
              <div
                className="flex flex-col gap-2"
              >
                <h2
                  className="capitalize font-raleway text-3xl text-green-700 font-semibold"
                >
                  Sector
                </h2>
                <hr className="h border-slate-500" />
                <p
                  className="font-raleway text-xl"
                >
                  {tickerInfoQuery.data?.sector}
                </p>
              </div>
              <div
                className="flex flex-col gap-2"
              >
                <h2
                  className="capitalize font-raleway text-3xl text-green-700 font-semibold"
                >
                  Industry
                </h2>
                <hr className="h border-slate-500" />
                <p
                  className="font-raleway text-xl"
                >
                  {tickerInfoQuery.data?.industry}
                </p>
              </div>
              <div
                className="flex flex-col gap-2"
              >
                <h2
                  className="capitalize font-raleway text-3xl text-green-700 font-semibold"
                >
                  Employees
                </h2>
                <hr className="h border-slate-500" />
                <p
                  className="font-raleway text-xl"
                >
                  {tickerInfoQuery.data?.employees?.toLocaleString('en-US')}
                </p>
              </div>
              <div
                className="flex flex-col gap-2"
              >
                <h2
                  className="capitalize font-raleway text-3xl text-green-700 font-semibold"
                >
                  Business Summary
                </h2>
                <hr className="h border-slate-500" />
                <p
                  className="font-raleway text-xl"
                >
                  {tickerInfoQuery.data?.summary}
                </p>
              </div>
            </div>
          }

          {/* Trade */}
          {viewTrade &&
            <div
              className=" mt-20 mb-10 flex flex-col gap-10"
            >
              {/* Account Detail */}
              <div
                className="w-7/12 pr-6 flex flex-row gap justify-between"
              >
                {/* Account value */}
                <div
                  className="w-2/5 flex-col"
                >
                  <div
                    className="flex flex-row gap-2 items-center"
                  >
                    <p
                      className="capitalize font-raleway text-xl text-green-700 font-semibold"
                    >
                      Account Value
                    </p>
                    <AiFillQuestionCircle />
                  </div>
                  <p
                    className="font-raleway text-xl"
                  >
                    {`$${userData.cash.toLocaleString('en-US')}`}
                  </p>
                </div>

                {/* Buying Power */}
                <div
                  className="w-2/5 flex-col border-l border-r px-5"
                >
                  <div
                    className="flex flex-row gap-2 items-center"
                  >
                    <p
                      className="capitalize font-raleway text-xl text-green-700 font-semibold"
                    >
                      Buying Power
                    </p>
                    <AiFillQuestionCircle />
                  </div>
                  <p
                    className="font-raleway text-xl"
                  >
                    $10,000.00
                  </p>
                </div>

                {/* Cash */}
                <div
                  className="w-1/5 flex-col px-5"
                >
                  <div
                    className="flex flex-row gap-2 items-center"
                  >
                    <p
                      className="capitalize font-raleway text-xl text-green-700 font-semibold"
                    >
                      Cash
                    </p>
                    <AiFillQuestionCircle />
                  </div>
                  <p
                    className="font-raleway text-xl"
                  >
                    $10,000.00
                  </p>
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
                        onClick={() => {
                          let maxQuant = 0
                          if (transactionInfo.type === "buy") {
                            if (!transactionInfo.ask || transactionInfo.ask === 0) {
                              maxQuant = 0
                            }
                            else {
                              maxQuant = Math.floor(userData.cash / transactionInfo.ask)
                            }
                          } else {
                            maxQuant = Math.floor(availability);
                          }
                          setTransactionInfo({ ...transactionInfo, quantity: maxQuant });
                        }}
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
                        {console.log(transactionInfo.marketState)}
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
                  onClick={() => {
                    if (transactionInfo.marketState !== "REGULAR") {
                      setError("MARKET_CLOSED")
                    } else if (transactionInfo.quantity === 0) {
                      setError("ZERO_QUANTITY")
                    } else if (transactionInfo.type === "buy" && userData.cash < (transactionInfo.quantity * transactionInfo.ask)) {
                      setError("OVERBUY")
                    } else if (transactionInfo.type === "sell" && availability < transactionInfo.quantity) {
                      setError("OVERSELL");
                    } else {
                      setPreview(true);
                    }
                  }}
                >
                  {readyToTrade ? 'Preview Order' : 'Loading Details...'}
                </button>
              </div>
            </div>
          }
        </div>
      </div>

      {/* Error */}
      {error &&
        <Error message={errorMessage[error]} onClose={() => setError(null)} />
      }

      {/* Preview and Trade */}
      {preview &&
        <PreviewOrder
          ticker={ticker}
          type={transactionInfo.type}
          price={transactionInfo.type === "buy" ? transactionInfo.ask! : transactionInfo.bid!}
          quantity={transactionInfo.quantity}
          onClose={() => setPreview(false)}
        />
      }
    </div>
  )
}

export default TickerPage