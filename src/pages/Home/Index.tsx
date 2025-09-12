import styles from './Home.module.css'
import Header from '@/components/navigations/Header.tsx'
import SearchBar from '@/components/inputs/SearchBar.tsx'
import ScrollObserver from '@/components/layouts/ScrollObserver.tsx'
import ItemCard from './ItemCard.tsx'
import { useEffect, useRef, useState } from 'react'
import { useInfiniteProductList } from '@/queries/Product.query.ts'
import type { ListOptions } from '@/types/common.type.ts'
import ScreenTimer from '@/components/display/ScreenTimer.tsx'
import useTimerStore from '@/stores/Timer.store.ts'

export default function HomePage() {
  const timerStore = useTimerStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isTimer, setIsTimer] = useState(false)
  const [options, setOptions] = useState<ListOptions>({})
  const prevScroll = useRef(0)
  const timeout = useRef<number | null>(null)
  const { data, fetchNextPage } = useInfiniteProductList(options)
  const products = data?.pages.flatMap((page) => page.list) ?? []

  useEffect(() => {
    const scrollContainer = document.getElementById('appContainer')
    if (scrollContainer) {
      prevScroll.current = scrollContainer.scrollTop
      const handleScroll = () => {
        const cTop = scrollContainer.scrollTop
        const diff = cTop - prevScroll.current
        prevScroll.current = cTop
        if (Math.abs(diff) > 0) {
          setIsTimer(true)
        }
        if (timeout.current) {
          window.clearTimeout(timeout.current)
        }
        timeout.current = window.setTimeout(() => {
          setIsTimer(false)
        }, 3000)
      }
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        if (timeout.current) {
          window.clearTimeout(timeout.current)
        }
      }
    }
  }, [])

  const toggleSearch = () => {
    setIsSearchOpen((v) => !v)
  }
  const loadMore = async () => {
    await fetchNextPage()
  }

  return (
    <>
      <Header title="쇼핑 홈" events={{ onSearch: () => toggleSearch() }} />
      <ScreenTimer
        isTick={isTimer}
        onTimeOver={() => {
          timerStore.resetTimer()
        }}
      />
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
