import SearchFilter from '@/components/inputs/SearchFilter.tsx'
import SearchSort from '@/components/inputs/SearchSort.tsx'
import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="search-bar">
      <div className="input-wrap">
        <input type="text" placeholder="Search..." className="search-input" />
        <i className="icon icon-suffix">
          <Search />
        </i>
      </div>
      <div className="filter">
        <SearchFilter />
        <SearchSort />
      </div>
    </div>
  )
}
