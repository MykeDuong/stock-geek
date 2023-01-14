import type { NextComponentType } from 'next'
import React, { useState, useRef, useEffect } from 'react'

import { VscChromeClose } from 'react-icons/vsc'
import { ClipLoader } from 'react-spinners'

import { useScreenerFilter } from '../../store'
import { popupClass, reverseFormatScreener } from '../../utils/clientUtils'
import { trpc } from '../../utils/trpc'
import SavedScreenerRow, { type RowHandle } from './SavedScreenerRow/SavedScreenerRow';

interface PropsInterface {
  onClose: () => void
  onSearch: () => void
}

interface ScreenerInfoInterface {
  id: string
  name: string
  date: Date
}

const SavedScreeners: NextComponentType<any, any, PropsInterface> = ({ onClose, onSearch }) => {
  // Store
  const { value, setValue } = useScreenerFilter();

  // Refs
  const rowRefs = useRef<RowHandle[]>([])

  // States
  const [available, setAvailable] = useState(false)
  const [screeners, setScreeners] = useState<ScreenerInfoInterface[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [id, setId] = useState(-1)
  const [fetchById, setFetchById] = useState(false)

  // Change for value
  useEffect(() => {
    if (fetchById) {
      setFetchById(false)
      onSearch();
    }
  }, [value])

  // Queries
  const savedScreenersQuery = trpc.screener.viewScreeners.useQuery(undefined, {
    onSuccess: (data) => {
      setAvailable(true)
      setScreeners(data)
    }
  });

  trpc.screener.getScreenerById.useQuery({ id }, {
    enabled: fetchById,
    onSuccess: (data) => {
      setValue(reverseFormatScreener(data));
    }
  })

  const deleteScreener = trpc.screener.deleteScreener.useMutation({
    onSuccess: () => {
      savedScreenersQuery.refetch();
    }
  });

  const handleUpdate = (index: number) => {
    if (index === selectedIndex) return
    rowRefs.current[selectedIndex]?.removeSelected();
    setSelectedIndex(index)
  }

  const handleSearch = () => {
    if (selectedIndex === -1) return
    const id = screeners[selectedIndex]?.id;
    if (!id) return
    setId(parseInt(id))
    setFetchById(true);
  }

  const handleDelete = () => {
    if (selectedIndex === -1) return;
    const id = rowRefs.current[selectedIndex]?.getId()
    if (!id) return;
    deleteScreener.mutate({ id })
    setSelectedIndex(-1)
    setScreeners(screeners.filter((screener, index) => index !== selectedIndex))
  }

  return (
    <div
      className={`${popupClass} top-[10%]`}
    >
      <div
        className='relative bg-beige-300 rounded-lg shadow-md mx-20 px-8 pt-20'
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
          <div
            className={`flex flex-row items-center rounded-md px-4 h-12`}
          >
            <div
              className='w-[60%]'
            >
              <p
                className={`font-raleway text-xl font-semibold`}
              >
                Name
              </p>
            </div>
            <div
              className='w-[40%]'
            >
              <p
                className={`font-raleway text-xl font-semibold`}
              >
                Date
              </p>
            </div>
          </div>
          {available ?
            <div
              className='flex flex-col overflow-scroll '
            >
              {screeners?.map((screener, index) =>
                <SavedScreenerRow
                  key={`key for screener id ${screener.id}`}
                  index={index}
                  screenerId={parseInt(screener.id)}
                  name={screener.name}
                  date={screener.date}
                  ref={ref => {
                    if (ref !== null)
                      rowRefs.current[index] = ref}
                  }
                  onClick={handleUpdate}
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
        <div
          className="mx-0 relative"
        >
          <div
            className="float-right flex flex-row gap-2 my-6"
          >
            <button
              className="w-28 py-2 bg-green-700 rounded-lg font-raleway text-white text-xl hover:scale-105"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="w-28 py-2 bg-red-700 rounded-lg font-raleway text-white text-xl hover:scale-105"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedScreeners