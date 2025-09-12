import { ArrowDownWideNarrow } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

interface SearchSortProps {
  selected: string
  events?: {
    changeSort?: (sort: string) => void
  }
}

export default function SearchSort({ selected, events }: SearchSortProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement | null>(null)
  const sortOptions = [
    { label: '관련도순', value: 'relevance' },
    { label: '가격 낮은순', value: 'price_asc' },
    { label: '가격 높은순', value: 'price_desc' },
    { label: '신상품순', value: 'latest' },
  ]
  const currentOption = useMemo(() => {
    const option = sortOptions.find((opt) => opt.value === selected)
    return option ? option.label : '관련도순'
  }, [selected])

  useEffect(() => {
    if (!isOpen) return
    const onClick = (e: Event) => {
      if (!selectRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [isOpen])
  const handleSelectSort = (value: string) => {
    if (events?.changeSort) events.changeSort(value)
    setIsOpen(false)
  }
  return (
    <div className={`search-sort ${isOpen ? 'open' : ''}`} ref={selectRef}>
      <div className="user-select" onClick={() => setIsOpen((v) => !v)}>
        <span>{currentOption}</span>
        <ArrowDownWideNarrow />
      </div>
      <ul className="dropdown-select">
        {sortOptions.map((option) => (
          <li
            key={option.value}
            className="option"
            onClick={() => handleSelectSort(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
