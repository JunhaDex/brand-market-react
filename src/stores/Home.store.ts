import { create } from 'zustand'

interface ProductFilter {
  label: string
  value: string
}

interface HomeStoreState {
  filterOptions: ProductFilter[]
  setFilterOptions?: (options: ProductFilter[]) => void
}

const useHomeStore = create<HomeStoreState>((set) => ({
  filterOptions: [],
  setFilterOptions: (options: ProductFilter[]) => {
    set({ filterOptions: options })
  },
}))

export default useHomeStore
