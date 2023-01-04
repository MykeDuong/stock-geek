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
 
  const [viewProfile, setViewProfile] = useState(false)
  const [viewTrade, setViewTrade] = useState(false)



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
            className="flex flex-col w-7/12"
          >
            <div
              className="w-full flex flex-row gap-4"
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
                className="w-3/5 min-h-[25rem]"
              >
                <TickerTechnicalAnalysis ticker={ticker} />
              </div>
            </div>
          </div>

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
        id='additionalInfo'
      >
        {/* Button */}
        <div
          className="pr-6 mt-4 flex flex-row gap-10 justify-start w-7/12"
          onClick={() => {
            setViewTrade(false)

            setViewProfile(!viewProfile);
            router.push(router.asPath + '/#additionalInfo')
          }}
        >
          <button
            className="py-4 w-1/2 bg-green-700 rounded-lg font-raleway text-xl text-white hover:scale-105"
          >
            Company Profile
          </button>
          <button
            className="py-4 w-1/2 bg-green-700 rounded-lg font-raleway text-xl text-white hover:scale-105"
            onClick={() => {

              setViewProfile(false)
              
              setViewTrade(!viewTrade);
              router.push(router.asPath + '/#additionalInfo')
            }}
          >
            Trade
          </button>
        </div>
        
        {viewProfile && 
          <div
            className="w-7/12 pr-6 mt-20 flex flex-col gap-10"
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
                className="font-raleway text-lg"
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
        

      </div>
    </div>
  )
}

export default TickerPage