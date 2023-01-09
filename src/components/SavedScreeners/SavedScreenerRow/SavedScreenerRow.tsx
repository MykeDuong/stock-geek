import { forwardRef, useImperativeHandle, useState } from "react"

export interface RowPropsInterface {
  screenerId: number
  index: number
  name: string
  date: Date
  onClick: (index: number) => void
}

export interface RowHandle {
  removeSelected: () => void
  getId: () => number
}

const ScreenerRow = forwardRef<RowHandle, RowPropsInterface>(({ index, screenerId, name, date, onClick }, ref) => {
  const [selected, setSelected] = useState(false);


  useImperativeHandle(ref, () => ({
    removeSelected: () => setSelected(false),
    getId: () => screenerId,
  }), [])

  return (
    <button
      className={`flex flex-row items-center text-left rounded-md px-4 h-12 ${selected && 'bg-beige-500'}`}
      onClick={() => {
        setSelected(true)
        onClick(index)
      }}
    >
      <div
        className='w-[60%]'
      >
        <p
          className={`font-raleway text-xl`}
        >
          {name}
        </p>
      </div>
      <div
        className='w-[40%]'
      >
        <p
          className={`font-raleway text-xl`}
        >
          {date?.toLocaleDateString('en-US')}
        </p>
      </div>
    </button>
  )
})
ScreenerRow.displayName = "Screener Row"

export default ScreenerRow