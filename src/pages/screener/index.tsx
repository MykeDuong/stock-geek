import { useState } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next"
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Image from 'next/image'
import { AiOutlineLineChart } from "react-icons/ai"
import { VscFilter } from "react-icons/vsc";
import { ClipLoader } from "react-spinners";

import { Filter, SaveScreener, TickerInfo, TrendingTickers } from "../../components";
import { trpc } from "../../utils/trpc"
import { appRouter } from "../../server/trpc/router/_app";
import { createContextInner } from "../../server/trpc/context";
import { useScreenerFilter } from "../../store";
import { useRouter } from 'next/router';
import { pageTitleClass, screenerConstants } from "../../utils/clientUtils";

const Screener: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter();

  const { value } = useScreenerFilter()

  const { data: trendingTickers } = trpc.ticker.getTrending.useQuery();

  const [editScreener, setEditScreener] = useState(false);
  const [viewSavedScreener, setViewSavedScreener] = useState(false);
  const [viewResult, setViewResult] = useState(false);
  const [viewSaveScreener, setViewSaveScreener] = useState(false);

  const [fetchResult, setFetchResult] = useState(false);

  const queryOptions: {
    marketCap: { min: number | null, max: number | null },
    avgVolume: { min: number | null, max: number | null },
    PE: { min: number, max: number },
    DE: { min: number, max: number },
    beta: { min: number, max: number },
    price: { min: number, max: number },
  } = { ...value };

  const screenerQuery = trpc.ticker.getScreenerResult.useQuery(queryOptions, {
    enabled: fetchResult,
    onSuccess: () => {
      setFetchResult(false);
    }
  })

  const handleSearch = async () => {
    setViewResult(true);
    setEditScreener(false);

    if (queryOptions.marketCap.min === screenerConstants.marketCap.min - 1) {
      queryOptions.marketCap.min = null;
    }

    if (queryOptions.marketCap.max === screenerConstants.marketCap.max + 1) {
      queryOptions.marketCap.max = null;
    }

    if (queryOptions.avgVolume.min === screenerConstants.avgVolume.min - 1) {
      queryOptions.avgVolume.min = null;
    }

    if (queryOptions.avgVolume.max === screenerConstants.avgVolume.max + 1) {
      queryOptions.avgVolume.max = null;
    }

    setFetchResult(true)

    router.push(`screener/#result`);
  }

  return (
    <div
      className='relative mb-10'
    >
      <div
        className={`relative ${editScreener && 'pointer-events-none blur-sm'} ease-out duration-100`}
      >
        <div
          className="relative h-72 w-full overflow-hidden"
        > 
          <Image src={"/images/screener-image.png"} alt={"screener-image"} style={{"objectFit": "cover"}} fill />
        </div>
        <div
          className=""
        >
          <h1
            className={`${pageTitleClass} mt-8`}
          >
            Stock Screener
          </h1>
          <div
            className="flex flex-row ml-6 mt-6 mb-2 gap-2 items-center"
          >
            <AiOutlineLineChart style={{ height: '2.4rem', width: '2.4rem'}}/>
            <h2
              className="text-2xl font-raleway font-bold text-slate-700"
            >
              Trending Tickers
            </h2>
          </div>
          <TrendingTickers tickers={trendingTickers} />
        
        </div>
        <div
          className={`mt-10 pt-8 flex flex-col ${viewResult && 'min-h-screen'}`}
          id="result"
        >
          <div
            className="flex flex-row justify-center gap-40"
          >
            <button
              className={`py-5 px-6 max-h-fit text-xl text-white font-raleway rounded-xl hover:scale-105 ${editScreener ? "bg-beige-600" : "bg-green-700" }`}
              onClick={() => setEditScreener(!editScreener)}
            >
              Create New Screener
            </button>
            <button
              className={`py-5 px-6 text-xl text-white font-raleway rounded-xl hover:scale-105 ${viewSavedScreener ? "bg-beige-600" : "bg-green-700" }`}
              onClick={() => setViewSavedScreener(!viewSavedScreener)}
            >
              View Saved Screeners
            </button>
          </div>
          {viewResult &&
            <div
              className="mt-20 mx-8 flex flex-col"
            >
              <div
                className="mb-6"
              >
                <h1
                  className="text-3xl font-raleway font-semibold text-green-700 uppercase float-left"
                >
                  Screening Results
                </h1>
                <button
                  className={`flex flex-row items-center gap-2 float-right bg-red-700 text-white py-4 px-4 font-raleway text-xl rounded-lg hover:scale-105`}
                >
                  <VscFilter style={{ height: '1.5rem', width: '1.5rem' }} />
                  Show filters
                </button>
              </div>
              <div
                className="mb-8"
              >
                {screenerQuery.isSuccess ?
                  <div
                    className="flex flex-col gap-4"
                  >
                    {screenerQuery.data.map(ticker => 
                      <TickerInfo ticker={ticker} key={`ticker of ${ticker}`} />
                    )}
                  </div> 
                    : 
                  <ClipLoader color="" />
                }
              </div>
              <div
              >
                <button
                  className="bg-green-700 float-right p-4 font-raleway text-white text-xl rounded-md hover:scale-105"
                  onClick={() => setViewSaveScreener(true)}
                >
                  Save Screener
                </button>
              </div>
            </div>
          }
        </div>
      </div>
      {editScreener && 
        <Filter onClose={() => setEditScreener(false)} onSearch={() => handleSearch()} />
      }
      {viewSaveScreener && 
        <SaveScreener onClose={() => {setViewSaveScreener(false)}} />
      }
    </div>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
  });

  await ssg.ticker.getTrending.prefetch();
  
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 86400
  }
}

export default Screener