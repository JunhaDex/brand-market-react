import styles from './Home.module.css'
import Header from '@/components/navigations/Header.tsx'
import SearchBar from '@/components/inputs/SearchBar.tsx'
import ItemCard from './ItemCard.tsx'
import ScrollObserver from '@/components/layouts/ScrollObserver.tsx'
import { useState } from 'react'

export default function HomePage() {
  const [search, setSearch] = useState({
    isOpen: false,
    keyword: '',
    filter: '',
    sort: '',
  })
  return (
    <>
      <Header />
      <main>
        <SearchBar />
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
