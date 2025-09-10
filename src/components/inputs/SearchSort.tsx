import { ArrowDownWideNarrow } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function SearchSort() {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

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
  return (
    <div className={`search-sort ${isOpen ? 'open' : ''}`} ref={selectRef}>
      <div className="user-select" onClick={(e) => setIsOpen((v) => !v)}>
        <span>가격 높은순</span>
        <ArrowDownWideNarrow />
      </div>
      <ul className="dropdown-select">
        <li className="option">관련도순</li>
        <li className="option">가격 낮은순</li>
        <li className="option">가격 높은순</li>
        <li className="option">신상품순</li>
      </ul>
    </div>
  )
}
