import { NextComponentType } from 'next'
import React from 'react'
import { VscChromeClose } from 'react-icons/vsc';
import { popupClass } from '../../utils/clientUtils';

interface PropsInterface {
  type: "buy" | "sell";
  ticker: string;
  price: number;
  quantity: number;
  onClose?: () => unknown;
}

const PreviewOrder: NextComponentType<any, any, PropsInterface> = ({ type, ticker, price, quantity, onClose }) => {

  const handleSubmit = async () => {
    // TODO: submit transaction
  }

  return (
    <div
      className={`${popupClass} top-[8%]`}
    >
      <div
        className="relative mx-10 py-10 px-10 bg-beige-300 rounded-xl shadow-md"
      >

        <button
          className="absolute top-2 right-2 pointer-events-auto"
          onClick={onClose}
        >
          <VscChromeClose style={{ height: '1.5rem', width: '1.5rem' }} />
        </button>
        <h1
          className="mt-12 text-4xl font-raleway font-medium text-green-700 mb-4"
        >
          Preview Order
        </h1>
        <hr className="bg-green-700" />

        {/* Ticker & Quantity */}
        <div
          className="mt-6 flex flex-row mx-0 justify-evenly"
        >
          <div
            className="flex flex-col gap-2 items-center"
          >
            <h2
              className="font-raleway text-2xl font-semibold text-slate-700 capitalize"
            >
              Stock: {type}
            </h2>
            <p
              className="font-raleway text-2xl"
            >
              {ticker}
            </p>
          </div>
          <div
            className="flex flex-col gap-2 items-center"
          >
            <h2
              className="font-raleway text-2xl font-semibold text-slate-700 capitalize"
            >
              Quantity
            </h2>
            <p
              className="font-raleway text-2xl"
            >
              {quantity}
            </p>
          </div>
        </div>

        {/* Order */}
        <div>
          <div
          className="mt-20 mb-5 mx-12 flex flex-col gap-8"
        >
          <OrderRow
            name="Est. Price"
            value={price}
          />
          <OrderRow
            name="Quantity"
            value={quantity}
            isCurrency={false}
          />

          <OrderRow
            name="Comimssion"
            value={0}
          />
          </div>
          <hr className="bg-green-700" />
          <div
          className="mt-5 mx-12 flex flex-col gap-8"
        >
          <OrderRow
            name="Est. Total"
            value={quantity * price}
          />
          </div>
        </div>

        <div
          className="mt-20 flex flex-row justify-end gap-6"
        >
          <button
            className="w-32 py-3 bg-red-700 rounded-lg font-raleway text-xl text-white hover:scale-105"
            onClick={onClose}
          >
            Change
          </button>
          <button
            className="w-32 py-3 bg-green-700 rounded-lg font-raleway text-xl text-white hover:scale-105"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

const OrderRow: NextComponentType<any, any, { name: string; value: number, isCurrency?: boolean }> = ({ name, value, isCurrency = true }) => {
  return (
    <div
      className="flex flex-row"
    >
      <h2
        className="w-3/4 font-raleway text-2xl"
      >
        {name}
      </h2>
      <h2
        className="w-1/4 font-raleway text-2xl"
      >
        {`${isCurrency ? '$' : ''}${value.toLocaleString('en-US')}`}
      </h2>
    </div>
  )
}

export default PreviewOrder