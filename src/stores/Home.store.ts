import { Store } from '@tanstack/react-store'

interface HomeStoreState {
  filterOptions: string[]
}

const homeStore = new Store<HomeStoreState>({
  filterOptions: [],
})

function setFilterOptions(options: string[]) {
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
