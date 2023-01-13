import { NextComponentType } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScreenerFilter } from '../../store';
import { nFormatter } from '../../utils/clientUtils';
import { screenerConstants } from '../../utils/constants';

import styles from './DiscreteSlider.module.css'

interface PropsInterface {
  onChange?: (props: { min: number, max: number }) => unknown;
  values: number[];
  filterType: "marketCap" | "avgVolume" ;
}

const MultiRangeSlider: NextComponentType<any, any, PropsInterface> = ({ onChange, values, filterType }) => {
  const {value, setValue} = useScreenerFilter();

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const [ min, max ] = [0, values.length - 1]
  const { max: maxVal, min: minVal } = screenerConstants[filterType];

  const getPercent = useCallback(
    (value: number) => {
      return Math.round(((value - min) / (max - min)) * 100)
    },
    [min, max]
  )

  const getLevel = (value: number) => {
    return values.indexOf(value);
  }

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(getLevel(value[filterType].min));
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [ value, getPercent, filterType ]);

  // Set width of the range to decrease from the right side 
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(getLevel(value[filterType].max));

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [ value, getPercent, filterType ]);

  return (
    <div
      className="h-full w-full flex flex-row items-center gap-4"
    >
      {/* Lower value */}
      <div
        className="h-10 w-16 border border-solid border-back bg-beige-400 rounded-md flex items-center justify-center"
      >
        <p
          className=''
        >
          {value[filterType].min === values[0] ? `<${nFormatter(minVal, 0)}` : nFormatter(value[filterType].min, 0)}
        </p>
      </div>

      {/* Slider */}
      <div
        className="items-center justify-center"
      >
        <input 
          type="range"
          min={min}
          step={1}
          max={max}
          value={getLevel(value[filterType].min)}
          ref={minValRef}
          className={`${styles.thumb} ${styles.thumbZ3} ${(value[filterType].min > max - 100) && styles.thumbZ5}`}
          onChange={(event) => {
            const inputValue = Math.min(+event.target.value, getLevel(value[filterType].max) - 1)

            setValue({ ...value, [filterType]: { ...value[filterType], min: values[inputValue] } })
            event.target.value = inputValue.toString();
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={getLevel(value[filterType].max)}
          step={1}
          ref={maxValRef}
          className={`${styles.thumb} ${styles.thumbZ4}`}
          onChange={(event) => {
            const inputValue = Math.max(+event.target.value, getLevel(value[filterType].min) + 1)
            setValue({ ...value, [filterType]: { ...value[filterType], max: values[inputValue]} })
            event.target.value = inputValue.toString();
          }}
        />

        <div className={`${styles.slider}`}>
          <div className={`${styles.sliderTrack}`} />
          <div ref={range} className={`${styles.sliderRange}`} />
        </div>
        
      </div>
      
      {/* Upper Value */}
      <div
        className="h-10 w-16 border border-solid border-back bg-beige-400 rounded-md flex items-center justify-center"
      >
        <p
          className=''
        >
          {value[filterType].max === values[values.length - 1] ? `>${nFormatter(maxVal, 0)}` : nFormatter(value[filterType].max, 0)}
        </p>
      </div>
    </div>
  )
}

export default MultiRangeSlider;