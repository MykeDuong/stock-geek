import type { NextComponentType } from 'next'
import React from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'

const questionPromptClass = { height: '1.25rem', width: '1.25rem'}


const PortfolioOverview: NextComponentType = () => {
  return (
    <div
      className={`h-full w-full bg-beige-300 shadow-lg flex flex-col px-6 pt-6`}
    >
      <div>
        <div
          className="flex flex-row gap-2 items-center"
        >
          <h3
            className="font-raleway text-2xl text-beige-700 font-semibold uppercase "
          >
            Account Value
          </h3>
          <AiFillQuestionCircle style={questionPromptClass} />
        </div>
      </div>
    </div>
  )
}

export default PortfolioOverview