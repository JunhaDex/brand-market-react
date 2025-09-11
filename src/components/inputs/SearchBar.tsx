import SearchFilter from '@/components/inputs/SearchFilter.tsx'
import SearchSort from '@/components/inputs/SearchSort.tsx'
import { useReducer } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  isOpen: boolean
  events?: {
    onSearch?: (keyword: string) => void
    changeFilter?: (filter: string) => void
    changeSort?: (sort: string) => void
  }
}

interface SearchBarState {
  keyword: string
  filter: string[]
  sort: string
}

type SearchBarAction =
  | { type: 'setKeyword'; payload: string }
  | { type: 'addFilter'; payload: string }
  | { type: 'removeFilter'; payload: string }
  | { type: 'setSort'; payload: string }
  | { type: 'reset' }

const initialState: SearchBarState = {
  keyword: '',
  filter: [],
  sort: 'relevance',
}

function reducer(
  state: SearchBarState,
  action: SearchBarAction,
): SearchBarState {
  switch (action.type) {
    case 'setKeyword':
      return { ...state, keyword: action.payload }
    case 'addFilter':
      return { ...state, filter: [...state.filter, action.payload] }
    case 'removeFilter':
      return {
        ...state,
        filter: state.filter.filter((f) => f !== action.payload),
      }
    case 'setSort':
      return { ...state, sort: action.payload }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export default function SearchBar({ isOpen, events }: SearchBarProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onKeywordChange = (value: string) => {
    dispatch({ type: 'setKeyword', payload: value })
    if (events?.onSearch) events.onSearch(value)
  }

  const onChangeFilter = (filter: string, isActive: boolean) => {
    if (isActive) {
      dispatch({ type: 'addFilter', payload: filter })
    } else {
      dispatch({ type: 'removeFilter', payload: filter })
    }
  }

  return (
    <div className={`search-bar ${isOpen ? 'open' : ''}`}>
      <div className="input-wrap">
        <input
          type="text"
          placeholder="상품명으로 검색"
          className="search-input"
          value={state.keyword}
          autoComplete="off"
        />
        <i className="icon icon-suffix">
          <Search />
        </i>
      </div>
      <div className="filter">
        <SearchFilter
          selected={state.filter}
          events={{ changeFilter: onChangeFilter }}
        />
        <SearchSort />
      </div>
    </div>
  )
}
