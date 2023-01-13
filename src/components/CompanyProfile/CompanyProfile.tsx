import { useRouter } from 'next/router';
import { } from 'react'
import { trpc } from '../../utils/trpc'

const CompanyProfile = () => {
  // Route
  const router = useRouter();
  const { ticker: tickerRoute } = router.query;
  const ticker = tickerRoute as string;

  const tickerInfoQuery = trpc.ticker.getTickerInfo.useQuery({ ticker })

  return (
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
  )
}

export default CompanyProfile