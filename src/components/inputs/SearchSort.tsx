import { ArrowDownWideNarrow } from 'lucide-react'

export default function SearchSort() {
  return (
    <div className="search-sort">
      <div className="user-select">
          <span>가격 높은순</span>
        <i className="icon icon-sm">
          <ArrowDownWideNarrow />
        </i>
      </div>
      <ul className="dropdown-select"></ul>
    </div>
  )
}
