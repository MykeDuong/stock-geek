import type { NextComponentType } from 'next'
import React, { useRef, useState } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { useScreenerFilter } from '../../store'
import { formatScreener, popupClass } from '../../utils/clientUtils'
import { screenerConstants } from '../../utils/constants'
import { trpc } from '../../utils/trpc'

interface PropsInterface {
  onClose: () => void
}

const SaveScreener: NextComponentType<any, any, PropsInterface> = ({ onClose }) => {

  // Store
  const { value } = useScreenerFilter();

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)

  // Stataes
  const [error, setError] = useState(false);

  // Queries/Mutations
  const saveScreenerQuery = trpc.screener.saveScreener.useMutation({
    onSuccess: () => {
      onClose();
    }
  });

  const handleSave = () => {
    const name = inputRef.current?.value;
    if (!name) {
      setError(true);
      return;
    }
    
    const queryValue = formatScreener(value)
    saveScreenerQuery.mutate({ name, ...queryValue });
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
        Save Screener
      </h1>
      <hr className="border-green-700 my-10" />
      
      <label
        className="flex flex-col gap-2 font-raleway text-2xl text-beige-700"
      >
        Screener Name
        <input
          className=" font-raleway text-xl text-slate-800 bg-transparent border-b border-slate-400 outline-none"
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
          className="float-right py-3 w-40 bg-green-700 font-raleway text-white text-xl rounded-lg hover:scale-105"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default SaveScreener