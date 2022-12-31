import { useState } from "react";
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next"
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Image from 'next/image'
import { AiOutlineLineChart, AiFillQuestionCircle } from "react-icons/ai"
import { VscFilter } from "react-icons/vsc";

import { Filter, MultiRangeSlider, TrendingTickers } from "../../components";
import MiniChart from "../../components/MiniChart/MiniChart"
import { trpc } from "../../utils/trpc"
import { appRouter } from "../../server/trpc/router/_app";
import { createContext, createContextInner } from "../../server/trpc/context";
import { useCurrentDir, useScreenerFilter } from "../../store";
import { useRouter } from 'next/router';

const Screener: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter();

  const { value } = useScreenerFilter()
  const { currentDir } = useCurrentDir()

  const { data: trendingTickers } = trpc.ticker.getTrending.useQuery();

  const [editScreener, setEditScreener] = useState(false);
  const [viewSavedScreener, setViewSavedScreener] = useState(false);
  const [viewResult, setViewResult] = useState(false);

  const handleSearch = () => {
    setViewResult(true);
    setEditScreener(false);
    router.push(`screener/#result`);
  }

  return (
    <div
      className='relative'
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
            className="text-5xl mt-8 text-center font-raleway font-bold text-green-700 uppercase"
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
              className="mt-20 mx-8"
            >
              <div
                className=""
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
                <button
                  className="" 
                >
                
                </button>
              </div>
              <div>

              </div>
              <div>
                
              </div>
            </div>
          }
        </div>
      </div>
      {editScreener && 
        <Filter onClose={() => setEditScreener(false)} onSearch={() => handleSearch()} />
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