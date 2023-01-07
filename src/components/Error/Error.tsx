import type { NextComponentType } from 'next'
import React from 'react'
import { VscChromeClose } from 'react-icons/vsc';

import { popupClass } from '../../utils/clientConstants';

interface PropsInterface {
  message: string;
  onClose: () => unknown
}

const Error: NextComponentType<any, any, PropsInterface> = ({ message, onClose }) => {
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
        className="text-4xl font-raleway font-semibold text-red-700 mb-4"
      >
        Error
      </h1>
      <hr className="bg-green-700" />
      <p
        className="pt-6 text-xl font-raleway text-black"
      >
        {message}
      </p>
    </div>
  )
}

export default Error