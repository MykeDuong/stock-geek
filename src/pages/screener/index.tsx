import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next"
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Image from 'next/image'
import { AiOutlineLineChart, AiFillQuestionCircle } from "react-icons/ai"

import MiniChart from "../../components/MiniChart/MiniChart"
import { trpc } from "../../utils/trpc"
import { appRouter } from "../../server/trpc/router/_app";
import { createContext, createContextInner } from "../../server/trpc/context";
import { useState } from "react";

const Screener: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

  const { data: trendingTickers } = trpc.ticker.getTrending.useQuery();

  const [createScreener, setCreateScreener] = useState(false);
  const [viewSavedScreener, setViewSavedScreener] = useState(false);

  return (
    <div
      className="relative"
    >
      <div
        className="relative overflow-hidden h-72 w-full overflow-hidden"
      > 
        <Image src={"/images/screener-image.png"} alt={"screener-image"} style={{"objectFit": "cover"}} fill />
      </div>
      <div
        className=""
      >
        <h1
          className="text-4xl mt-8 text-center font-raleway font-semibold text-green-700 uppercase"
        >
          Stock Screener
        </h1>
        <div
          className="flex flex-row ml-6 mt-6 mb-2 gap-2 items-center"
        >
          <AiOutlineLineChart style={{ height: '2.4rem', width: '2.4rem'}}/>
          <h2
            className="text-xl font-raleway font-semibold text-slate-700"
          >
            Trending Tickers
          </h2>
        </div>
        <div
          className="bg-beige-300 pt-8 px-6 overflow-x-scroll whitespace-nowrap h-80 flex flex-row gap-6"
        >
          {trendingTickers?.map((ticker: {symbol: string}) => (
            <MiniChart ticker={ticker.symbol} key={`chart for ${ticker.symbol}`} />
          ))}
        </div>
        
      </div>
      <div
        className="mt-14 flex flex-row justify-center gap-40"
      >
        <button
          className={`py-3 px-4 text-white rounded-lg hover:scale-105 ${createScreener ? "bg-beige-600" : "bg-green-700" }`}
          onClick={() => setCreateScreener(!createScreener)}
        >
          Create new Screener
        </button>
        <button
          className={`py-3 px-4 text-white rounded-lg hover:scale-105 ${viewSavedScreener ? "bg-beige-600" : "bg-green-700" }`}
          onClick={() => setViewSavedScreener(!viewSavedScreener)}
        >
          View Saved Screener
        </button>
      </div>
      {createScreener && 
        <div
          className="absolute inset-1/4 z-10 bg-beige-300 min-h-fit min-w-fit p-4 flex flex-col rounded-md"
        >
          <h1
            className="text-3xl text-raleway text-semibold text-green-700"
          >Create Filters</h1>
          <div
            className="flex flex-row my-2 p-3 bg-beige-200 rounded-md shadow-lg items-center"
          >
            <h2
              className="text-xl font-raleway mr-1"
            >
              Market Capitalization
            </h2>
            <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />

          </div>
        </div>
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