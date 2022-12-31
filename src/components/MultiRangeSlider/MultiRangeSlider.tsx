import { NextComponentType } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './MultiRangeSlider.module.css'


interface PropsInterface {
  min: number;
  max: number;
  onChange?: (props: { min: number, max: number }) => unknown;
  size?: "small" | "medium" | "large" ;
}


const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

const MultiRangeSlider: NextComponentType<any, any, PropsInterface> = ({ min, max, onChange, size = "medium" }) => {
  const [minVal, setMinVal] = useState(size === "large" ? min - 1 : min);
  const [maxVal, setMaxVal] = useState(size === "large" ? max + 1 : max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => {
      if (size === "small")
        return ((value - min) / (max - min)) * 100
      return Math.round(((value - min) / (max - min)) * 100)
    },
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange && onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

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
          {size === "large" && (minVal === min - 1 ? `<${nFormatter(min, 0)}` : nFormatter(minVal, 0))}
          {size === "medium" && (minVal)}
          {size === "small" && (minVal)}
        </p>
      </div>
      <div
        className="items-center justify-center"
      >
        <input 
          type="range"
          min={size === "large" ? min - 1 : min}
          step={size === "small" ? 0.01 : 1}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - (size === "small" ? 0.01 : 1));
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={`${styles.thumb} ${styles.thumbZ3} ${minVal > max - 100 && styles.thumbZ5}`}
        />

        <input
          type="range"
          min={min}
          max={size === "large" ? max + 1 : max}
          value={maxVal}
          step={size === "small" ? 0.01 : 1}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + (size === "small" ? 0.01 : 1));
            setMaxVal(value);
            event.target.value = value.toString();
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
          {size === "large" && (maxVal === max + 1 ? `>${nFormatter(max, 0)}` : nFormatter(maxVal, 0))}
          {size === "medium" && (maxVal)}
          {size === "small" && (maxVal)}
        </p>
      </div>
    </div>
  )
}

export default MultiRangeSlider;