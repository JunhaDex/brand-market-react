import styles from './Home.module.css'
import Header from '@/components/navigations/Header.tsx'
import SearchBar from '@/components/inputs/SearchBar.tsx'
import ItemCard from './ItemCard.tsx'
import ScrollObserver from '@/components/layouts/ScrollObserver.tsx'
import { useEffect, useState } from 'react'
import useHomeStore from '@/stores/Home.store.ts'

export default function HomePage() {
  const homeStore = useHomeStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)


  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen)
  }

  useEffect(() => {
    homeStore.setFilterOptions(['할인중', '신상품', '2025'])
  }, [])

  return (
    <>
      <Header events={{ onSearch: toggleSearch }} />
      <main>
        <SearchBar isOpen={isSearchOpen} />
        <div className={styles.productList}>
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
        <ScrollObserver />
      </main>
    </>
  )
}
