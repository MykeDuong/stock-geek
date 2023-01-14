import { NextComponentType } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScreenerFilter } from '../../store';
import { nFormatter } from '../../utils/clientUtils';
import { screenerConstants } from '../../utils/constants';

import styles from './MultiRangeSlider.module.css'

interface PropsInterface {
  onChange?: (props: { min: number, max: number }) => unknown;
  size?: "small" | "medium" | "large" ;
  filterType: "marketCap" | "avgVolume" | "PE" | "DE" | "beta" | "price";
}



const MultiRangeSlider: NextComponentType<any, any, PropsInterface> = ({ onChange, size = "medium", filterType }) => {
  const {value, setValue} = useScreenerFilter();

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const { min, max } = screenerConstants[filterType];

  const getPercent = useCallback(
    (value: number) => {
      if (size === "small")
        return ((value - min) / (max - min)) * 100
      return Math.round(((value - min) / (max - min)) * 100)
    },
    [min, max]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(value[filterType].min);
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
      const maxPercent = getPercent(value[filterType].max);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [ value, getPercent, filterType ]);

  // // Get min and max values when their state changes
  // useEffect(() => {
  //   onChange && onChange({ min: value[filterType].min, max: value[filterType].max });
  // }, [value, onChange]);

  return (
    <div
      className="h-full w-full flex flex-row items-center gap-4"
    >
      <div
        className="h-10 w-16 border border-solid border-back bg-beige-400 rounded-md flex items-center justify-center"
      >
        <p
          className=''
        >
          {size === "large" && (value[filterType].min < min ? `<${nFormatter(min, 0)}` : nFormatter(value[filterType].min, 0))}
          {size === "medium" && (value[filterType].min)}
          {size === "small" && (value[filterType].min)}
        </p>
      </div>
      <div
        className="items-center justify-center relative"
      >
        <input 
          type="range"
          min={size === "large" ? min - 1 : min}
          step={size === "small" ? 0.01 : 1}
          max={max}
          value={value[filterType].min}
          ref={minValRef}
          onChange={(event) => {
            const inputValue = Math.min(+event.target.value, value[filterType].max - (size === "small" ? 0.01 : 1));
            setValue({ ...value, [filterType]: { ...value[filterType], min: inputValue } })
            event.target.value = inputValue.toString();
          }}
          className={`${styles.thumb} ${styles.thumbZ3} ${(value[filterType].min > max - 100) && styles.thumbZ5}`}
        />

        <input
          type="range"
          min={min}
          max={size === "large" ? max + 1 : max}
          value={value[filterType].max}
          step={size === "small" ? 0.01 : 1}
          ref={maxValRef}
          onChange={(event) => {
            const inputValue = Math.max(+event.target.value, value[filterType].min + (size === "small" ? 0.01 : 1));
            setValue({ ...value, [filterType]: { ...value[filterType], max: inputValue } })
            event.target.value = inputValue.toString();
          }}
          className={`${styles.thumb} ${styles.thumbZ4}`}
        />

        <div className={`${styles.slider}`}>
          <div className={`${styles.sliderTrack}`} />
          <div ref={range} className={`${styles.sliderRange}`} />
        </div>
        
      </div>
      <div
        className="h-10 w-16 border border-solid border-back bg-beige-400 rounded-md flex items-center justify-center"
      >
        <p
          className=''
        >
          {size === "large" && (value[filterType].max > max ? `>${nFormatter(max, 0)}` : nFormatter(value[filterType].max, 0))}
          {size === "medium" && (value[filterType].max)}
          {size === "small" && (value[filterType].max)}
        </p>
      </div>
    </div>
  )
}

export default MultiRangeSlider;