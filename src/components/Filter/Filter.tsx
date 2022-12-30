import { NextComponentType } from 'next'
import React from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'
import MultiRangeSlider from '../MultiRangeSlider/MultiRangeSlider'

const Filter: NextComponentType = () => {
  return (
    <div
          className="absolute inset-1/4 z-10 bg-beige-300 min-h-fit min-w-fit p-6 flex flex-col rounded-md"
        >
          <h1
            className="text-3xl text-raleway text-semibold text-green-700 mb-2"
          >Create Filters</h1>

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
              <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
            </div>
            <div
              className="w-3/5"
            >
              <MultiRangeSlider min={50*10**6} max={2 * 10**12} size={"large"} />
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
              <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
            </div>
            <div
              className="w-3/5"
            >
              <MultiRangeSlider min={50*10**3} max={5 * 10**6} size={"large"} />
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
              <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
            </div>
            <div
              className="w-3/5"
            >
              <MultiRangeSlider min={0} max={50} />
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
              <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
            </div>
            <div
              className="w-3/5"
            >
              <MultiRangeSlider min={0} max={30} />
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
              <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
            </div>
            <div
              className="w-3/5"
            >
              <MultiRangeSlider min={0} max={4} size="small" />
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
              <AiFillQuestionCircle style={{ width: '1.2rem', height: '1.2rem'}} />
            </div>
            <div
              className="w-3/5"
            >
              <MultiRangeSlider min={0} max={200} />
            </div>
          </div>

          <div
            className="w-full flex flex-row justify-end gap-4"
          >
            <button

            >
              Search
            </button>
            <button
            
            >
              Clear
            </button>
          </div>

        </div>
  )
}

export default Filter