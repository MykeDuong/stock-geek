export const screenerConstants = {
  marketCap: { min: 50 * 10**6, max: 2 * 10**12 },
  avgVolume: { min: 50 * 10**3, max: 5 * 10**6 },
  PE: { min: 0, max: 50 },
  DE: { min: 0, max: 30 },
  beta: { min: 0, max: 4 },
  price: { min: 0, max: 200 },
}

export const marketCapValues = [
  0, 
  5 * 10 ** 7, 
  1.4 * 10**8, 
  4.2 * 10**8, 
  1.2 * 10 ** 9, 
  3.5 * 10 ** 9, 
  1 * 10 ** 10, 
  2.9 * 10 ** 10, 
  8.3 * 10 ** 10, 
  2.4 * 10 ** 11, 
  6.9 * 10 ** 11, 
  2 * 10 ** 12, 
  Number.MAX_SAFE_INTEGER
]

export const avgVolumeValues = [
  0,
  5 * 10 ** 4,
  7.9 * 10 ** 4,
  1.3 * 10 ** 5,
  2 * 10 ** 5,
  3.2 * 10 ** 5,
  5 * 10 ** 5,
  7.9 * 10 ** 5,
  1.3 * 10 ** 6,
  2 * 10 ** 6,
  3.2 * 10 ** 6,
  5 * 10 ** 6,
  Number.MAX_SAFE_INTEGER
]

export const today = new Date((new Date()).toLocaleString("en-US", {timeZone: "America/New_York"}));