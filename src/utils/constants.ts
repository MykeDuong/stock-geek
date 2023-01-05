export const screenerConstants = {
  marketCap: { min: 50 * 10**6, max: 2 * 10**12 },
  avgVolume: { min: 50 * 10**3, max: 5 * 10**6 },
  PE: { min: 0, max: 50 },
  DE: { min: 0, max: 30 },
  beta: { min: 0, max: 4 },
  price: { min: 0, max: 200 },
}

export const popupClass = 'fixed left-[41.87%] right-[19.37%] z-10 min-h-fit min-w-fit px-6 py-10 flex flex-col'