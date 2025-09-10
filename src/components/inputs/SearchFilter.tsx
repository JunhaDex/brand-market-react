import { Sliders } from 'lucide-react'
import useHomeStore from '@/stores/Home.store.ts'

interface SearchFilterProps {
  selected: string[]
}

export default function SearchFilter({ selected }: SearchFilterProps) {
  const homeStore = useHomeStore()
  const options = homeStore.state.filterOptions.map((option) => (
    <div key={option} className={`badge selectable`}>
      {option}
    </div>
  ))
  return (
    <div className="search-filter">
      <div className="title">
        <div className="badge selectable">
          <Sliders />
          필터
        </div>
        <span className="vt vt-right"></span>
      </div>
      <div className="list">{options}</div>
    </div>
  )
}
