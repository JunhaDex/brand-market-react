import { Store } from '@tanstack/react-store'

interface ProductFilter {
  label: string
  value: string
}

interface HomeStoreState {
  filterOptions: ProductFilter[]
}

const homeStore = new Store<HomeStoreState>({
  filterOptions: [],
})

function setFilterOptions(options: ProductFilter[]) {
  homeStore.setState((state) => ({
    ...state,
    filterOptions: options,
  }))
}

export default function useHomeStore() {
  return {
    state: homeStore.state,
    setFilterOptions,
  }
}
