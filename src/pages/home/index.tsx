import type { NextPage } from "next";
import { useState } from "react";
import { AiOutlineFundView, AiOutlineLineChart } from "react-icons/ai";
import { icons } from "react-icons/lib";
import { RiBookMarkLine, RiCalendarTodoFill } from "react-icons/ri";
import { TickerBanner, MarketPerformance, News, MarketOverview, TrendingTickers, PortfolioOverview, PortfolioPerformanceChart, Watchlist } from "../../components";
import { trpc } from "../../utils/trpc";
import Portfolio from "../portfolio";

const iconStyle = { height: '2rem', width: '2rem', color: "#395144" }

const sidePadding = 'px-10'

const Home: NextPage = () => {

  const [username, setUsername] = useState('')

  trpc.user.getUserInfo.useQuery(undefined, {
    onSuccess: (data) => {
      setUsername(data.username);
    }
  })

  return (
    <div
      className={`pb-10 pt-12 flex flex-col gap-28`}
    >
      <h1
        className={`${sidePadding} font-raleway text-5xl text-green-700 font-semibold`}
      >
        {`Welcome back, ${username}!`}
      </h1>

      {/* Market Overview */}
      <div
        className={`${sidePadding}`}
      >
        <div
          className="flex flex-row items-center gap-2"
        >
          <AiOutlineFundView style={iconStyle} />
          <h2
            className="font-raleway text-3xl text-green-700 font-semibold"
          >
            Market Overview
          </h2>
        </div>
        <MarketOverview />
      </div>


      {/* Trending Tickers */}
      <div className={`${sidePadding}`}>
        <div
          className={` flex flex-row items-center gap-2 mb-3`}
        >
          <AiOutlineLineChart style={iconStyle} />
          <h2
            className="text-2xl font-raleway font-bold text-slate-700"
          >
            Trending Tickers
          </h2>
        </div>
        <TrendingTickers />
      </div>

      {/* My Portfolio Overview */}
      <div
        className={`${sidePadding}`}
      >
        <div
          className={`flex flex-row items-center gap-2 mb-3`}
        >
          <RiBookMarkLine style={iconStyle} />
          <h2
            className="text-2xl font-raleway font-bold text-slate-700"
          >
            My Portfolio Overview
          </h2>
        </div>
        <div className="flex flex-row gap-20">
          <div
            className="w-[40%]"
          >
            <PortfolioOverview />
          </div>
          <div
            className="w-[60%]"
          >
            <PortfolioPerformanceChart />
          </div>
        </div>
      </div>

      {/* My Watchlist */}
      <div className={`${sidePadding}`}>
        <div
          className={`flex flex-row items-center gap-2 mb-3`}
        >
          <RiCalendarTodoFill style={iconStyle} />
          <h2
            className="text-2xl font-raleway font-bold text-slate-700"
          >
            My Watchlist
          </h2>

        </div>
        <Watchlist />
      </div>
    </div>
  )
}

export default Home;