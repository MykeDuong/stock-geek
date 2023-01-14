import { useState } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next"
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Image from 'next/image'
import { AiOutlineLineChart } from "react-icons/ai"
import { VscFilter } from "react-icons/vsc";
import { ClipLoader } from "react-spinners";

import { Filter, SavedScreeners, SaveScreener, TickerInfo, TrendingTickers } from "../../components";
import { trpc } from "../../utils/trpc"
import { appRouter } from "../../server/trpc/router/_app";
import { createContextInner } from "../../server/trpc/context";
import { useScreenerFilter } from "../../store";
import { useRouter } from 'next/router';
import { formatScreener, pageTitleClass } from "../../utils/clientUtils";
import { screenerConstants } from "../../utils/constants";

const Screener: NextPage = (props) => {

  // Router
  const router = useRouter();

  // Store
  const { value } = useScreenerFilter()

  // States
  const [editScreener, setEditScreener] = useState(false);
  const [viewSavedScreeners, setViewSavedScreeners] = useState(false);
  const [viewResult, setViewResult] = useState(false);
  const [viewSaveScreener, setViewSaveScreener] = useState(false)
  const [fetchResult, setFetchResult] = useState(false);

  const [queryValue, setQueryValue] = useState<{
    marketCap: { min: number | null, max: number | null },
    avgVolume: { min: number | null, max: number | null },
    PE: { min: number, max: number },
    DE: { min: number, max: number },
    beta: { min: number, max: number },
    price: { min: number, max: number },
  }>(formatScreener(value));

  const screenerQuery = trpc.screener.getScreenerResult.useQuery(queryValue, {
    enabled: fetchResult,
    onSuccess: () => {
      setFetchResult(false);
    }
  })

  const handleSearch = async () => {
    setViewResult(true);
    setEditScreener(false);

    setQueryValue(formatScreener(value));
    setFetchResult(true)

    router.push(`screener/#result`);
  }

  return (
    <div
      className='relative mb-10'
    >
      <div
        className={`relative ${(editScreener || viewSaveScreener || viewSavedScreeners) && 'pointer-events-none blur-sm'} ease-out duration-100`}
      >
        <div
          className="relative h-72 w-full overflow-hidden"
        >
          <Image src={"/assets/screener-image.png"} alt={"screener-image"} style={{ "objectFit": "cover" }} fill />
        </div>

        <h1
          className={`${pageTitleClass} mt-8 mb-10`}
        >
          Stock Screener
        </h1>
        <div>
          <div
            className="flex flex-row items-center gap-2 mb-3"
          >
            <AiOutlineLineChart style={{ height: '2.4rem', width: '2.4rem' }} color="#395144" />
            <h2
              className="text-2xl font-raleway font-bold text-slate-700"
            >
              Trending Tickers
            </h2>
          </div>
          <TrendingTickers />
        </div>
        <div
          className={`mt-10 pt-8 flex flex-col ${viewResult && 'min-h-screen'}`}
          id="result"
        >
          <div
            className="flex flex-row justify-center gap-40"
          >
            <button
              className={`py-5 px-6 max-h-fit text-xl text-white font-raleway rounded-xl hover:scale-105 ${editScreener ? "bg-beige-600" : "bg-green-700"}`}
              onClick={() => setEditScreener(!editScreener)}
            >
              Create New Screener
            </button>
            <button
              className={`py-5 px-6 text-xl text-white font-raleway rounded-xl hover:scale-105 ${viewSavedScreeners ? "bg-beige-600" : "bg-green-700"}`}
              onClick={() => setViewSavedScreeners(!viewSavedScreeners)}
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
                  onClick={() => setEditScreener(true)}
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
        <SaveScreener onClose={() => { setViewSaveScreener(false) }} />
      }
      {viewSavedScreeners &&
        <SavedScreeners
          onClose={() => setViewSavedScreeners(false)}
          onSearch={async () => {
            setViewSavedScreeners(false);
            await handleSearch();
          }}
        />
      }
    </div>
  )
}

export default Screener