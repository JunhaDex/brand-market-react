import { create } from 'zustand'

interface TimerStoreState {
  seconds: number
  resetTimer: () => void
  decrementTimer: () => void
}

const useTimerStore = create<TimerStoreState>((set) => ({
  seconds: 60,
  resetTimer: () => set({ seconds: 60 }),
  decrementTimer: () =>
    set((state) => ({ seconds: state.seconds > 0 ? state.seconds - 1 : 0 })),
}))

export default useTimerStore
