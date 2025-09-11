import { Sliders } from 'lucide-react'
import useHomeStore from '@/stores/Home.store.ts'
import { useCallback, useState } from 'react'

interface SearchFilterProps {
  selected: string[]
  events?: {
    changeFilter?: (filter: string, state: boolean) => void
  }
}

export default function SearchFilter({ selected, events }: SearchFilterProps) {
  const homeStore = useHomeStore()
  const [active, setActive] = useState<Set<string>>(() => new Set(selected))
  const handleToggleFilter = useCallback(
    (value: string) => {
      setActive((prev) => {
        const next = new Set(prev)
        if (next.has(value)) {
          next.delete(value)
          events?.changeFilter?.(value, false)
        } else {
          next.add(value)
          events?.changeFilter?.(value, true)
        }
        return next
      })
    },
    [events],
  )
  const options = homeStore.state.filterOptions.map((option) => (
    <div
      key={option.value}
      className={`badge ${active.has(option.value) ? 'selected' : 'selectable'}`.trim()}
      onClick={() => handleToggleFilter(option.value)}
    >
      {option.label}
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
