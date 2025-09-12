import SearchFilter from '@/components/inputs/SearchFilter.tsx'
import SearchSort from '@/components/inputs/SearchSort.tsx'
import { useRef, useReducer } from 'react'
import { Search } from 'lucide-react'
import debounce from 'lodash/debounce'

interface SearchBarProps {
  isOpen: boolean
  events?: {
    onSearch?: (search: SearchBarState) => void
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
  const debounceState = useRef(
    debounce((nextState: SearchBarState) => {
      if (events?.onSearch) events.onSearch(nextState)
    }, 300),
  )

  const onKeywordChange = (value: string) => {
    const nextState = { ...state, keyword: value }
    dispatch({ type: 'setKeyword', payload: value })
    debounceState.current(nextState)
  }

  const onChangeFilter = (filter: string, isActive: boolean) => {
    let nextState = { ...state }
    if (isActive) {
      nextState = { ...state, filter: [...state.filter, filter] }
      dispatch({ type: 'addFilter', payload: filter })
    } else {
      nextState = { ...state, filter: state.filter.filter((f) => f !== filter) }
      dispatch({ type: 'removeFilter', payload: filter })
    }
    debounceState.current(nextState)
  }

  const onChangeSort = (sort: string) => {
    const nextState = { ...state, sort }
    dispatch({ type: 'setSort', payload: sort })
    debounceState.current(nextState)
  }

  return (
    <div className={`search-bar ${isOpen ? 'open' : ''}`}>
      <div className="input-wrap">
        <input
          type="text"
          placeholder="상품명으로 검색"
          className="search-input"
          value={state.keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
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
        <SearchSort
          selected={state.sort}
          events={{ changeSort: onChangeSort }}
        />
      </div>
    </div>
  )
}
