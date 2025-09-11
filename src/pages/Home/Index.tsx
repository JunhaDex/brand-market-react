import styles from './Home.module.css'
import Header from '@/components/navigations/Header.tsx'
import SearchBar from '@/components/inputs/SearchBar.tsx'
import ItemCard from './ItemCard.tsx'
import ScrollObserver from '@/components/layouts/ScrollObserver.tsx'
import { useEffect, useMemo, useState } from 'react'
import useHomeStore from '@/stores/Home.store.ts'
import { useInfiniteProductList } from '@/queries/Product.query.ts'

export default function HomePage() {
  const homeStore = useHomeStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { data, isLoading } = useInfiniteProductList()
  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.list) ?? []
  })

  function toggleSearch() {
    setIsSearchOpen((v) => !v)
  }

  return (
    <>
      <Header events={{ onSearch: toggleSearch }} />
      <main>
        <SearchBar isOpen={isSearchOpen} />
        <div className={styles.productList}>
          {products.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>
        <ScrollObserver />
      </main>
    </>
  )
}
