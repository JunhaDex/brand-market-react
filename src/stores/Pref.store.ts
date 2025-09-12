import { create } from 'zustand'

interface PrefStoreState {
  uiMode: 'light' | 'dark'
  setUIMode: (mode: 'light' | 'dark') => void
}

const usePrefStore = create<PrefStoreState>((set) => ({
  uiMode: 'light',
  setUIMode: (mode: 'light' | 'dark') => set({ uiMode: mode }),
}))
export default usePrefStore
