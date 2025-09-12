import styles from './Home.module.css'
import Header from '@/components/navigations/Header.tsx'
import SearchBar from '@/components/inputs/SearchBar.tsx'
import ScrollObserver from '@/components/layouts/ScrollObserver.tsx'
import ItemCard from './ItemCard.tsx'
import { useState } from 'react'
import { useInfiniteProductList } from '@/queries/Product.query.ts'
import type { ListOptions } from '@/types/common.type.ts'

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [options, setOptions] = useState<ListOptions>({})
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProductList(options)
  const products = data?.pages.flatMap((page) => page.list) ?? []

  const toggleSearch = () => {
    setIsSearchOpen((v) => !v)
  }
  const loadMore = () => {
    console.log(isLoading, hasNextPage) // why this is false?
    if (hasNextPage && !isFetchingNextPage) {
      console.log('more!')
      fetchNextPage()
    }
  }

  return (
    <>
      <Header events={{ onSearch: () => toggleSearch }} />
      <main>
        <SearchBar
          isOpen={isSearchOpen}
          events={{
            onSearch: (userOption) =>
              setOptions({
                keyword: userOption.keyword || undefined,
                filter: userOption.filter.length
                  ? userOption.filter
                  : undefined,
                sort: userOption.sort || undefined,
              }),
          }}
        />
        <div className={styles.productList}>
          {products.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>
        <ScrollObserver onIntersect={() => loadMore()} />
      </main>
    </>
  )
}
