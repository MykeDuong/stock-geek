export const screenerConstants = {
  marketCap: { min: 50 * 10**6, max: 2 * 10**12 },
  avgVolume: { min: 50 * 10**3, max: 5 * 10**6 },
  PE: { min: 0, max: 50 },
  DE: { min: 0, max: 30 },
  beta: { min: 0, max: 4 },
  price: { min: 0, max: 200 },
}

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