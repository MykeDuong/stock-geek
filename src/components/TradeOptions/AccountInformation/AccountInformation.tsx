import type { NextComponentType } from 'next'
import React from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'

interface PropsInterface {
  name: string;
  value: number;
}

const AccountInformation: NextComponentType<any, any, PropsInterface> = ({ name, value }) => {
  return (
    <div
      className="flex flex-col"
    >
      <div
        className="flex flex-row gap-2 items-center"
      >
        <p
          className="capitalize font-raleway text-xl text-green-700 font-semibold"
        >
          {name}
        </p>
        <AiFillQuestionCircle />
      </div>
      <p
        className="font-raleway text-xl"
      >
        {`$${value.toLocaleString('en-US')}`}
      </p>

    </div>
  )
}

export default AccountInformation