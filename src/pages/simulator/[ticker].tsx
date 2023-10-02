import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

import { TickerChart, TickerInfo, TickerTechnicalAnalysis, PreviewOrder, TradeOptions, CompanyProfile } from '../../components'
import TickerCoreStatistics from '../../components/TickerCoreStatistics/TickerCoreStatistics'
import { trpc } from '../../utils/trpc'

type TransactionInfoType = {
  type: 'buy' | "sell",
  quantity: number,
  bid: number | undefined,
  ask: number | undefined,
  marketState: string | undefined,
}

const TickerPage: NextPage = () => {
  // Route
  const router = useRouter();
  const { ticker: tickerRoute } = router.query;
  const ticker = tickerRoute as string;

  // Ref
  const additionalInfo = useRef<HTMLDivElement>(null)

  // States
  const [viewProfile, setViewProfile] = useState(false)
  const [viewTrade, setViewTrade] = useState(false)
  const [watchlisted, setWatchlisted] = useState(false)
  const [preview, setPreview] = useState(false)
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfoType>({
    type: "buy",
    quantity: 0,
    bid: 0,
    ask: 0,
    marketState: "",
  });

  // Queries/Mutations
  const addToWatchlistQuery = trpc.watchlist.addToWatchlist.useMutation();

  useEffect(() => {
    if (viewProfile || viewTrade) {
      additionalInfo.current?.scrollIntoView();
    }
  }, [viewProfile, viewTrade]);

  const openPreview = (transaction: TransactionInfoType) => {
    console.log(transaction);
    setTransactionInfo(transaction)
    setPreview(true);
  }

  return (
    <div
      className="relative"
    >
      <div
        className={`${(preview) && 'pointer-events-none blur-sm'}`}
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
              <TickerCoreStatistics />

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
            <CompanyProfile /> 
          }

          {/* Trade */}
          {viewTrade &&
            <TradeOptions
              onPreview={openPreview}
            /> 
          }
        </div>
      </div>

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