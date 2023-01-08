import type { NextComponentType } from 'next'
import React, { useRef, useState } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { any } from 'zod'
import { useScreenerFilter } from '../../store'
import { popupClass } from '../../utils/clientUtils'

interface PropsInterface {
  onClose: () => void
}

const SaveScreener: NextComponentType<any, any, PropsInterface> = ({ onClose }) => {

  const { value } = useScreenerFilter();
  const inputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState(false);

  const handleSave = () => {
    const name = inputRef.current?.value;
    if (!name) {
      setError(true);
      return;
    }
    console.log(name);
  }

  return (
    <div
      className={`${popupClass} top-[15%] bg-beige-300 rounded-lg shadow-md`}
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
        Save Filters
      </h1>
      
      <label
        className="flex flex-col gap-2 font-raleway text-2xl mt-6"
      >
        Type a name for your new filter
        <input
          className=" font-raleway text-xl text-slate-800 bg-transparent border-b outline-none"
          type="text"
          placeholder="e.g Small stock"
          ref={inputRef}
        />
      </label>
      {error && 
      <p
        className="font-raleway text-red-700"
      >
        Please type the name of the filter
      </p>
      }
      <div
        className="relative mx-0 mt-6"
      > 
        <button
          className="float-right py-2 px-4 bg-green-700 font-raleway text-white rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default SaveScreener