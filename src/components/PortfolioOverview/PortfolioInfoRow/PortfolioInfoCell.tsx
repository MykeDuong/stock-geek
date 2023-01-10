import type { NextComponentType } from 'next'
import { useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';

interface PropsInterface {
  title: string;
  sign?: boolean;
  positive?: boolean;
  value: string;
  subvalue?: string;
  helper?: string;
}

const questionPromptClass = { height: '1rem', width: '1rem' }

const titleClass = 'font-raleway text-lg font-semibold uppercase text-beige-700'

const numericTextClass = 'font-raleway text-3xl font-medium'

const PortfolioInfoCell: NextComponentType<any, any, PropsInterface> = ({ title, helper, sign = false, positive = true, value, subvalue }) => {

  const [openHelper, setOpenHelper] = useState(false);
  return (
    <div
      className="w-1/2 flex flex-col"
    >
      <div
        className="flex flex-row gap-1"
      >
        <h3
          className={`${titleClass}`}
        >
          {title}
        </h3>
        {helper &&
          <div
            className="flex items-center"
            onMouseMove={() => setOpenHelper(true)}
            onMouseLeave={() => setOpenHelper(false)}
          >
            <AiFillQuestionCircle style={questionPromptClass} />
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
        className={`${numericTextClass} ${sign && (positive ? 'text-green-700' : 'text-red-700')}`}
      >
        {`${sign ? (positive ? '+' : '-') : ''} ${value}`}
      </p>
      {subvalue &&
        <p
          className={`font-raleway text-xl ml-5 ${sign && (positive ? 'text-green-700' : 'text-red-700')}`}
        >
          {`(${subvalue})`}
        </p>
      }
    </div>
  )
}

export default PortfolioInfoCell