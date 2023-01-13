import create from 'zustand';

import { screenerConstants } from '../utils/constants';

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
  marketCap: { min: 0, max: Number.MAX_SAFE_INTEGER},
  avgVolume: { min: 0, max: Number.MAX_SAFE_INTEGER },
  PE: { min: screenerConstants.PE.min , max: screenerConstants.PE.max },
  DE: { min: screenerConstants.DE.min , max: screenerConstants.DE.max },
  beta: { min: screenerConstants.beta.min , max: screenerConstants.beta.max },
  price: { min: screenerConstants.price.min , max: screenerConstants.price.max }
}

export const useScreenerFilter = create<ScreenerFilterInterface>()(
  (set) => ({
    value: intialScreener,
    setValue: (props) => set((state) => ({
      ...state,
      value: props
    })),
    resetValue: () => set((state) => ({
      ...state,
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

// Error Popup
interface ErrorInterface {
  errorAppear: boolean
  message: string
  setAppear: () => void
  setDisappear: () => void
  setMessage: (newMessage: string) => void
}

export const useError = create<ErrorInterface>()(
  (set) =>({
    errorAppear: false,
    message: '',
    setAppear: () => set((state) => ({ ...state, errorAppear: true })),
    setDisappear: () => set((state) => ({ ...state, errorAppear: false })),
    setMessage: (newMessage) => set((state) => ({ ...state, message: newMessage }))
  })
)