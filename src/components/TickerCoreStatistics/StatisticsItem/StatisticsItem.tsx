import type { NextComponentType } from 'next'
import React from 'react'

interface PropsInterface {
  name: string;
  value?: string;
}

const StatisticsItem: NextComponentType<any, any, PropsInterface> = ({ name, value = '' }) => {
  return (
    <div
      className="border-b min-h-fit px-1 py-2 overflow-auto"
    >
      <p
        className="font-raleway text-xl font-semibold float-left"
      >
        {name}
      </p>
      <p
        className="font-raleway text-xl float-right"
      >
        {value}
      </p>
    </div>
  )
}

export default StatisticsItem