import { NextPage } from "next"
import { AiFillQuestionCircle } from "react-icons/ai"
import { HoldingsInformation, PortfolioOverview, PortfolioPerformanceChart } from "../../components"
import { pageTitleClass } from "../../utils/clientUtils"

const titleCardClass = 'text-slate-700 font-raleway text-2xl font-bold'

const Portfolio: NextPage = () => {
  return (
    <div>
      <h1
        className={`${pageTitleClass} my-10`}
      >
        My Portfolio
      </h1>
      {/* Upper page */}
      <div
        className="flex flex-row mx-10 gap-20"
      >
        {/* Overview */}
        <div
          className="flex flex-col w-[40%]"
        >
          <h2
            className={`${titleCardClass}`}
          >
            Overview
          </h2>
          <div
            className="min-h-[30rem]"
          >
            <PortfolioOverview />

          </div>
        </div>
        {/* Overview */}
        <div
          className="flex flex-col w-[60%]"
        >
          <h2
            className={`${titleCardClass}`}
          >
            Performance
          </h2>
          <div
            className="min-h-[30rem]"
          >
            <PortfolioPerformanceChart />

          </div>
        </div>
      </div>
      <div
        className="flex flex-col mx-10 mt-10"
      >
        <h2
          className={`${titleCardClass}`}
        >
          Holdings
        </h2>
        <div
          className="w-full"
        >
          <HoldingsInformation />

        </div>
      </div>
    </div>
  )
}

export default Portfolio