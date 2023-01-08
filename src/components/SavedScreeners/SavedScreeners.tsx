import type { NextComponentType } from 'next'
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { ClipLoader } from 'react-spinners'
import { useScreenerFilter } from '../../store'
import { popupClass } from '../../utils/clientUtils'
import { trpc } from '../../utils/trpc'

interface PropsInterface {
  onClose: () => void
  onSelect: () => void
}

interface RowPropsInterface {
  header?: boolean
  name?: string
  date?: Date
  onClick? : () => void
}

interface ScreenerInfoInterface {
  id: string
  name: string
  date: Date
}

interface RowHandle {
  removeSelected: () => void
}

const SavedScreener: NextComponentType<any, any, PropsInterface> = ({ onClose, onSelect }) => {
  // Store
  const { setValue } = useScreenerFilter();

  // Refs
  const rowRefs = useRef<RowHandle[]>([])

  // States
  const [available, setAvailable] = useState(false)
  const [screeners, setScreeners] = useState<ScreenerInfoInterface[]>([])

  const screenerQuery = trpc.ticker.viewScreeners.useQuery(undefined, {
    onSuccess: (data) => {
      setAvailable(true)
      console.log(data);
      setScreeners(data)
    }
  });

  const handleSelect = () => {
    return
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <div
      className={`${popupClass} top-[15%]`}
    >
      <div
        className='bg-beige-300 rounded-lg shadow-md mx-20 px-8 pt-20'
      >

        <button
          className="absolute top-2 right-2 pointer-events-auto"
          onClick={onClose}
        >
          <VscChromeClose style={{ height: '1.5rem', width: '1.5rem' }} />
        </button>
        <h1
          className="text-4xl font-raleway font-semibold text-green-700"
        >
          Saved Screeners
        </h1>
        <hr className="border-green-700 mt-6 mb-20" />
        <div
          className='flex flex-col'
        >

          <ScreenerRow
            header={true}
          />
          {available ?
            <div
              className='flex flex-col'
            >
              {screeners?.map(screener =>
                <ScreenerRow
                  key={`key for screener id ${screener.id}`}
                  name={screener.name}
                  date={screener.date}
                />
              )}
            </div>
            :
            <div
              className="mx-0 flex justify-center mt-10"
            >
              <ClipLoader color='#395144' />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

const ScreenerRow = forwardRef<RowHandle, RowPropsInterface>(({ name, date, header = false }, ref) => {

  useImperativeHandle(ref,

  )

  return (
    <div
      className="flex flex-row h-12"
    >
      <div
        className='w-[60%]'
      >
        <p
          className={`font-raleway text-xl ${header ? 'font-semibold' : ''}`}
        >
          {header ? "Name" : name}
        </p>
      </div>
      <div
        className='w-[40%]'
      >
        <p
          className={`font-raleway text-xl ${header ? 'font-semibold' : ''}`}
        >
          {header ? "Date" : date?.toLocaleDateString('en-US')}
        </p>
      </div>
    </div>
  )
})
ScreenerRow.displayName = "Screener Row"

export default SavedScreener