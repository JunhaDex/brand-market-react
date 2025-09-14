import { create } from 'zustand'

interface ToastStoreState {
  isShow: boolean
  message: string
  toggleToast: (message: string) => void
}

const useToastStore = create<ToastStoreState>((set) => ({
  isShow: false,
  message: 'Hello',
  toggleToast: (message: string) => {
    set({ isShow: true, message })
    window.setTimeout(() => {
      set({ isShow: false })
    }, 3000)
  },
}))

export default useToastStore
