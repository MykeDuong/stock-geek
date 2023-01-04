import create from 'zustand';
import { persist } from 'zustand/middleware';

import { screenerConstants } from '../utils/constants';

// Directory
interface DirStoreInterface {
  currentDir: string;
  changeDir: (dir: string) => void;
}

export const useCurrentDir = create<DirStoreInterface>()(
  persist(
    (set) => ({
      currentDir: "home",
      changeDir: ( dir ) => set((state) => ({ currentDir: dir })),
    }),
    {
      name: "Stock Geek"
    }
  )
)

// Screener
interface ScreenerFilterInterface {
  value: {
    marketCap: { min: number, max: number };
    avgVolume: { min: number, max: number };
    PE: { min: number, max: number };
    DE: { min: number, max: number };
    beta: { min: number, max: number };
    price: { min: number, max: number };
  }
  setValue: (props: {
    marketCap: { min: number, max: number };
    avgVolume: { min: number, max: number };
    PE: { min: number, max: number };
    DE: { min: number, max: number };
    beta: { min: number, max: number };
    price: { min: number, max: number };
  }) => void;
  resetValue: () => unknown;
}

const intialScreener = {
  marketCap: { min: screenerConstants.marketCap.min - 1, max: screenerConstants.marketCap.max + 1 },
  avgVolume: { min: screenerConstants.avgVolume.min - 1, max: screenerConstants.avgVolume.max + 1 },
  PE: { min: screenerConstants.PE.min , max: screenerConstants.PE.max },
  DE: { min: screenerConstants.DE.min , max: screenerConstants.DE.max },
  beta: { min: screenerConstants.beta.min , max: screenerConstants.beta.max },
  price: { min: screenerConstants.price.min , max: screenerConstants.price.max }
}

export const useScreenerFilter = create<ScreenerFilterInterface>()(
  (set) => ({
    value: intialScreener,
    setValue: (props) => set((state) => ({
      value: props
    })),
    resetValue: () => set((state) => ({
      value: intialScreener
    }))
  })
)

// AuthType
interface AuthTypeInterface {
  authType: "signin" | "signup"
  setAuthSignIn: () => void
  setAuthSignUp: () => void
}

export const useAuthType = create<AuthTypeInterface>()(
  (set) =>({
    authType: "signin",
    setAuthSignIn: () => set((state) => ({ authType: "signin" })),
    setAuthSignUp: () => set((state) => ({ authType: "signup" })),
  })
)