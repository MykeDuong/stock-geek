import type { NextComponentType, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { HeaderImage } from "../../components"
import { pageTitleClass } from "../../utils/clientUtils"
import { trpc } from "../../utils/trpc"

const textClass = "font-raleway font-semibold text-xl"

interface RowPropsInterface {
  index?: number, 
  ticker?: string, 
  company?: string, 
  price?: number, 
  quantity?: number,
  totalValue?: number,
  transactionType?: string,
  header?: boolean
}

interface TickerInterface {
  index: number;
  ticker: string;
  company: string | undefined;
  transactionType:'buy' | 'sell';
  price: number;
  quantity: number;
  totalValue: number;
}

const History: NextPage = () => {

  const [availability, setAvailability] = useState(false);

  const [tickers, setTickers] = useState<TickerInterface[]>([]);

  const historyQuery = trpc.ticker.getHistory.useQuery(undefined,{
    onSuccess: (data) => {
      console.log(data);
      setTickers(data);
      setAvailability(true);
    }
  });

  return (
    <div>
      <HeaderImage src={"/images/history-image.png"} alt="history image" />
      <h1
        className={`${pageTitleClass} my-6`}
      >
        Trade History
      </h1>
      {availability ?
        <div
          className="relative flex flex-col mx-10"
        >
          <WatchlistRow header={true}/>
          <hr className="bg-slate-400 border-slate-400 my-2"  />
          {tickers.map(tickerInfo =>
            <WatchlistRow
              key={`key of row in watchlist for ${tickerInfo.ticker}`}
              index={tickerInfo.index}
              ticker={tickerInfo.ticker}
              company={tickerInfo.company}
              price={tickerInfo.price}
              totalValue={tickerInfo.totalValue}
              quantity={tickerInfo.quantity}
              transactionType={tickerInfo.transactionType}
            />
          )}
        </div>
        :
        <div
            className="mx-0 flex justify-center"
        >
          <ClipLoader color="#395144" />
        </div>
      }
    </div>
  )
}

const WatchlistRow: NextComponentType<any, any, RowPropsInterface> = ({ index, ticker, company, price, quantity, totalValue, transactionType, header = false }) => {
  const router = useRouter();
  return (
    <div
      className={`flex flex-row h-14 px-2 rounded-lg items-center ${(index !== undefined && index % 2 !== 0) ? 'bg-beige-300' : ''}`}
    >
      <div
        className="flex flex-row items-center gap-6 w-full mx-2"
      >
        <p
          className={`w-[12%] ${textClass}`}
        >
          {header ? "Symbol" : ticker}
        </p>
        <p
          className={`w-[40%] ${textClass}`}
        >
          {header ? "Company Name" : company}
        </p>
        <p
          className={`w-[17%] ${textClass}`}
        >
          {header ? "Transaction Price" : price?.toLocaleString('en-US')}
        </p>
        <p
          className={`w-[12%] ${textClass}`}
        >
          {header ? "Quantity" : quantity?.toLocaleString('en-US')}
        </p>
        <p
          className={`w-[12%] ${textClass}`}
        >
          {header ? "Total Value" : totalValue?.toLocaleString('en-US')}
        </p>
        <div
          className={`w-[7%]`}
        >
          {header ?
            <p
              className={`${textClass}`}
            >
              Action
            </p>
            :
            <div
              className={`rounded-lg w-14 text-center py-2 px-3 ${transactionType === 'buy' ? 'bg-green-700' : 'bg-red-700'}`}
            >
              <p
                className="font-raleway text-lg text-white"
              >
                {transactionType}
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default History