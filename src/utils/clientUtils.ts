import { screenerConstants } from "./constants";

export const popupClass = 'fixed left-[41.87%] right-[19.37%] z-10 min-h-fit min-w-fit px-6 py-10 flex flex-col'

export const pageTitleClass = 'text-center font-raleway text-5xl text-green-700 font-semibold uppercase'

export const nFormatter = (num: number, digits: number) => {
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

export const formatScreener = (value: {
  marketCap: { min: number | null, max: number | null },
  avgVolume: { min: number | null, max: number | null },
  PE: { min: number, max: number },
  DE: { min: number, max: number },
  beta: { min: number, max: number },
  price: { min: number, max: number },
}) => {
  const retVal = structuredClone(value)
  if (retVal.marketCap.min === screenerConstants.marketCap.min - 1) {
    retVal.marketCap.min = null;
  }

  if (retVal.marketCap.max === screenerConstants.marketCap.max + 1) {
    retVal.marketCap.max = null;
  }

  if (retVal.avgVolume.min === screenerConstants.avgVolume.min - 1) {
    retVal.avgVolume.min = null;
  }

  if (retVal.avgVolume.max === screenerConstants.avgVolume.max + 1) {
    retVal.avgVolume.max = null;
  }

  return retVal;
}

interface ReverseFormatScreenerResultInterface {
  marketCap: { min: number, max: number },
  avgVolume: { min: number, max: number },
  PE: { min: number, max: number },
  DE: { min: number, max: number },
  beta: { min: number, max: number },
  price: { min: number, max: number },
}

export const reverseFormatScreener = (value: {
  marketCap: { min: number | null, max: number | null },
  avgVolume: { min: number | null, max: number | null },
  PE: { min: number, max: number },
  DE: { min: number, max: number },
  beta: { min: number, max: number },
  price: { min: number, max: number },
}) => {
  const retVal = structuredClone(value);

  if (retVal.marketCap.min == null) {
    retVal.marketCap.min = screenerConstants.marketCap.min - 1
  }

  if (retVal.marketCap.max == null) {
    retVal.marketCap.max = screenerConstants.marketCap.max + 1
  }

  if (retVal.avgVolume.min == null) {
    retVal.avgVolume.min = screenerConstants.avgVolume.min - 1;
  }

  if (retVal.avgVolume.max == null) {
    retVal.avgVolume.max = screenerConstants.avgVolume.max + 1
  }

  return <ReverseFormatScreenerResultInterface>retVal;
}