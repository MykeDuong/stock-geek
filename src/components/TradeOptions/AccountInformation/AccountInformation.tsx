import type { NextComponentType } from 'next'
import { useState } from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'

interface PropsInterface {
  name: string;
  value: number;
  helper?: string;
}

const AccountInformation: NextComponentType<any, any, PropsInterface> = ({ name, value, helper = '' }) => {

  const [openHelper, setOpenHelper] = useState(false);

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
        {helper &&
          <div
            className="flex items-center"
            onMouseMove={() => setOpenHelper(true)}
            onMouseLeave={() => setOpenHelper(false)}
          >
            <AiFillQuestionCircle />
            <div
              className="relative"
            >
              {openHelper &&
                <div
                  className="absolute z-10 w-80 bg-beige-300 border rounded-lg p-2"
                >
                  {helper}
                </div>
              }
            </div>
          </div>
        }
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