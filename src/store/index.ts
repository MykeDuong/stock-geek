import create from 'zustand';
import { persist } from 'zustand/middleware';

interface DirStoreInterface {
  currentDir: string;
  changeDir: (dir: string) => void;
}

export interface ScreenerFilterInterface {
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
}

export const useCurrentDir = create<DirStoreInterface>()(
  (set) => ({
    currentDir: "Home",
    changeDir: ( dir ) => set((state) => ({ currentDir: dir})),
  })
)

export const useScreenerFilter = create<ScreenerFilterInterface>()(
  (set) => ({
    value: {
      marketCap: { min: 50 * 10**6 - 1, max: 2 * 10**12 + 1 },
      avgVolume: { min: 50 * 10**3 - 1, max: 5 * 10**6 + 1 },
      PE: { min: 0, max: 50 },
      DE: { min: 0, max: 30 },
      beta: { min: 0, max: 4 },
      price: { min: 0, max: 200 },
    },
    setValue: (props) => set((state) => ({
      value: props
    }))
  })
)