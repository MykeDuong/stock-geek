import create from 'zustand';
import { persist } from 'zustand/middleware';

interface DirStoreInterface {
  currentDir: string;
  changeDir: (dir: string) => void;
}

export const useCurrentDir = create<DirStoreInterface>()(
  (set) => ({
    currentDir: "Home",
    changeDir: ( dir ) => set((state) => ({ currentDir: dir})),
  })
)