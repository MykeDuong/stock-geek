import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { TickerChart, TickerInfo, TickerTechnicalAnalysis } from '../../components'
import { trpc } from '../../utils/trpc'

const TickerPage: NextPage = () => {

  const router = useRouter();
  const { ticker: tickerRoute } = router.query;

  const ticker = tickerRoute as string;

  const tickerInfoQuery= trpc.ticker.getTickerInfo.useQuery({ ticker })

  return (
    <div>
      {/* Back and TickerInfo */}
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

      {/* Ticker Information */}
      <div
        className="mx-10"
      >
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
            className="flex flex-col w-1/2"
          >
            <div
              className="w-full flex flex-row gap-10"
            >
              <div
                className="w-1/2 flex flex-col gap-6"
              >
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
              <div
                className="w-1/2 flex flex-col gap-6"
              >
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
                <div
                  className="border-b min-h-fit px-1 py-2 overflow-auto"
                >
                  <p
                    className="font-raleway text-xl font-semibold float-left"
                  >
                    52 Week High ($)
                  </p>
                  <p
                    className="font-raleway text-xl float-right"
                  >
                    {tickerInfoQuery.data?.fiftyTwoWeekHigh}
                  </p>
                </div>
                <div
                  className="border-b min-h-fit px-1 py-2 overflow-auto"
                >
                  <p
                    className="font-raleway text-xl font-semibold float-left"
                  >
                    52 Week Low ($)
                  </p>
                  <p
                    className="font-raleway text-xl float-right"
                  >
                    {tickerInfoQuery.data?.fiftyTwoWeekLow}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="w-full flex flex-col justify-center items-center"
            >
              <div
                className="w-2/3 min-h-[24.5rem]"
              >
                <TickerTechnicalAnalysis ticker={ticker} />
              </div>
            </div>

          </div>

          <div
            className="w-1/2 h-full"
          >
            {ticker !== '' &&
              <TickerChart ticker={ticker} />
            }
          </div>
        </div>
      </div>
      
      {/* Profile and Trade */}
      <div
        className={`mx-10`}
      >
        {/* Button */}
        <div
          className="pr-12 mt-4 flex flex-row gap-10 justify-start w-1/2"
        >
          <button
            className="py-4 w-1/2 bg-green-700 rounded-lg font-raleway text-xl text-white"
          >
            Company Profile
          </button>
          <button
            className="py-4 w-1/2 bg-green-700 rounded-lg font-raleway text-xl text-white"
          >
            Trade
          </button>
        </div>
        
        

      </div>
    </div>
  )
}

export default TickerPage