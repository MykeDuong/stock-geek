import { NextComponentType } from 'next'
import React, { useState } from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { VscChromeClose } from 'react-icons/vsc'

import MultiRangeSlider from '../MultiRangeSlider/MultiRangeSlider'
import { useScreenerFilter } from '../../store'

interface PropsInterface {
  onClose: (args: null | unknown) => unknown;
}

const description = {
  "marketCap": "The total dollar market value of a company's outstanding shares of stock (Investopedia).",
  "avgVolume": "How many shares are traded per day (Investopedia).",
  "PE": "The ratio for valuing a company that measures its current share price relative to its earnings per share (EPS) (Investopedia).", 
  "DE": "The ratio used to evaluate a company’s financial leverage and is calculated by dividing a company’s total liabilities by its shareholder equity (Investopedia).",
  "beta": "A measure of a stock's volatility in relation to the overall market. By definition, the market, such as the S&P 500 Index, has a beta of 1.0, and individual stocks are ranked according to how much they deviate from the market (Investopedia).",
  "price": "Indicate the current value to buyers and sellers (Investopedia).",
}

const Filter: NextComponentType<any, any, PropsInterface> = ({ onClose }) => {
  const [toggleDescription, setToggleDescription] = useState({
    "marketCap": false,
    "avgVolume": false,
    "PE": false, 
    "DE": false,
    "beta": false,
    "price": false,

  })

  return (
    <div
      className="absolute left-1/4 right-1/4 top-[15%] z-10 bg-beige-300 min-h-fit min-w-fit px-6 py-10 flex flex-col rounded-lg shadow-md"
    >
      <button
        className="absolute top-2 right-2 pointer-events-auto"
        onClick={onClose}
      >
        <VscChromeClose style={{ height: '1.5rem', width: '1.5rem' }} />
      </button>
      <h1
        className="text-4xl font-raleway font-semibold text-green-700 mb-4"
      >
        Create Filters
      </h1>

      {/* Market Cap */}
      <div
        className="flex flex-row my-2 p-3 bg-beige-200 rounded-md shadow-lg items-center"
      >
        <div
          className="w-2/5 flex flex-row items-center"
        >
          <h2
            className="text-xl font-raleway mr-1"
          >
            Market Capitalization
          </h2>
          <div
            onMouseEnter={() => setToggleDescription({ ...toggleDescription, "marketCap": true })}
            onMouseLeave={() => setToggleDescription({ ...toggleDescription, "marketCap": false })}

          >
            <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
          </div>
          <div
            className='relative h-full'
          >
            <div
              className={`absolute top-[-10px] left-0 z-50 w-80 bg-beige-300 border-solid border-black border p-3 rounded-lg ${!toggleDescription["marketCap"] && 'invisible'}`}
            >
              <p
                className='font-raleway'
              >{description["marketCap"]}</p>
            </div>
          </div>
        </div>
        <div
          className="w-3/5"
        >
          <MultiRangeSlider min={50*10**6} max={2 * 10**12} size={"large"} filterType="marketCap" />
        </div>
      </div>

      {/* Average Volume */}
      <div
        className="flex flex-row my-2 p-3 bg-beige-200 rounded-md shadow-lg items-center"
      >
        <div
          className="w-2/5 flex flex-row items-center"
        >
          <h2
            className="text-xl font-raleway mr-1"
          >
            Average Volume
          </h2>
          <div
            onMouseEnter={() => setToggleDescription({ ...toggleDescription, "avgVolume": true })}
            onMouseLeave={() => setToggleDescription({ ...toggleDescription, "avgVolume": false })}

          >
            <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
          </div>
          <div
            className='relative h-full'
          >
            <div
              className={`absolute top-[-10px] left-0 z-50 w-80 bg-beige-300 border-solid border-black border p-3 rounded-lg ${!toggleDescription["avgVolume"] && 'invisible'}`}
            >
              <p
                className='font-raleway'
              >{description["avgVolume"]}</p>
            </div>
          </div>
        </div>
        <div
          className="w-3/5"
        >
          <MultiRangeSlider min={50*10**3} max={5 * 10**6} size={"large"} filterType="avgVolume" />
        </div>
      </div>

      {/* P/E */}
      <div
        className="flex flex-row my-2 p-3 bg-beige-200 rounded-md shadow-lg items-center"
      >
        <div
          className="w-2/5 flex flex-row items-center"
        >
          <h2
            className="text-xl font-raleway mr-1"
          >
            Price-to-Earnings
          </h2>
          <div
            onMouseEnter={() => setToggleDescription({ ...toggleDescription, "PE": true })}
            onMouseLeave={() => setToggleDescription({ ...toggleDescription, "PE": false })}

          >
            <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
          </div>
          <div
            className='relative h-full'
          >
            <div
              className={`absolute top-[-10px] left-0 z-50 w-80 bg-beige-300 border-solid border-black border p-3 rounded-lg ${!toggleDescription["PE"] && 'invisible'}`}
            >
              <p
                className='font-raleway'
              >{description["PE"]}</p>
            </div>
          </div>
        </div>
        <div
          className="w-3/5"
        >
          <MultiRangeSlider min={0} max={50} filterType="PE" />
        </div>
      </div>

      {/* D/E */}
      <div
          className="flex flex-row my-2 p-3 bg-beige-200 rounded-md shadow-lg items-center"
      >
        <div
          className="w-2/5 flex flex-row items-center"
        >
          <h2
            className="text-xl font-raleway mr-1"
          >
            Debt-to-Equity
          </h2>
          <div
            onMouseEnter={() => setToggleDescription({ ...toggleDescription, "DE": true })}
            onMouseLeave={() => setToggleDescription({ ...toggleDescription, "DE": false })}

          >
            <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
          </div>
          <div
            className='relative h-full'
          >
            <div
              className={`absolute top-[-10px] left-0 z-50 w-80 bg-beige-300 border-solid border-black border p-3 rounded-lg ${!toggleDescription["DE"] && 'invisible'}`}
            >
              <p
                className='font-raleway'
              >{description["DE"]}</p>
            </div>
          </div>
        </div>
        <div
          className="w-3/5"
        >
          <MultiRangeSlider min={0} max={30} filterType="DE" />
        </div>
      </div>

      {/* Beta */}
      <div
        className="flex flex-row my-2 p-3 bg-beige-200 rounded-md shadow-lg items-center"
      >
        <div
          className="w-2/5 flex flex-row items-center"
        >
          <h2
            className="text-xl font-raleway mr-1"
          >
            Beta
          </h2>
          <div
            onMouseEnter={() => setToggleDescription({ ...toggleDescription, "beta": true })}
            onMouseLeave={() => setToggleDescription({ ...toggleDescription, "beta": false })}

          >
            <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
          </div>
          <div
            className='relative h-full'
          >
            <div
              className={`absolute top-[-10px] left-0 z-50 w-80 bg-beige-300 border-solid border-black border p-3 rounded-lg ${!toggleDescription["beta"] && 'invisible'}`}
            >
              <p
                className='font-raleway'
              >{description["beta"]}</p>
            </div>
          </div>
        </div>
        <div
          className="w-3/5"
        >
          <MultiRangeSlider min={0} max={4} size="small" filterType='beta' />
        </div>
      </div>

      {/* Price*/}
      <div
        className="flex flex-row my-2 p-3 bg-beige-200 rounded-md shadow-lg items-center"
      >
        <div
          className="w-2/5 flex flex-row items-center"
        >
          <h2
            className="text-xl font-raleway mr-1"
          >
            Price
          </h2>
          <div
            onMouseEnter={() => setToggleDescription({ ...toggleDescription, "price": true })}
            onMouseLeave={() => setToggleDescription({ ...toggleDescription, "price": false })}

          >
            <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
          </div>
          <div
            className='relative h-full'
          >
            <div
              className={`absolute top-[-10px] left-0 z-50 w-80 bg-beige-300 border-solid border-black border p-3 rounded-lg ${!toggleDescription["price"] && 'invisible'}`}
            >
              <p
                className='font-raleway'
              >{description["price"]}</p>
            </div>
          </div>
        </div>
        <div
          className="w-3/5"
        >
          <MultiRangeSlider min={0} max={200} filterType="price" />
        </div>
      </div>

      {/* Button */}
      <div
        className="w-full flex flex-row justify-end gap-4 mt-4"
      >
        <button
          className="w-24 px-2 py-2 text-white bg-green-700 rounded-lg text-xl hover:scale-105"
        >
          Search
        </button>
        <button
          className="w-24 px-2 py-2 text-white bg-red-700 rounded-lg text-xl hover:scale-105"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default Filter