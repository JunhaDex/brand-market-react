import './Detail.module.css'
import Header from '@/components/navigations/Header.tsx'
import Carousel from '@/components/display/Carousel.tsx'
import ShopCTA from '@/pages/Detail/ShopCTA.tsx'
import { useProductDetail } from '@/queries/Product.query.ts'
import { useParams } from '@tanstack/react-router'
import styles from '@/pages/Home/Home.module.css'
import { Star } from 'lucide-react'
import ScreenTimer from '@/components/display/ScreenTimer.tsx'
import { useEffect, useRef, useState } from 'react'

export default function DetailPage() {
  const [isTimer, setIsTimer] = useState(true)
  const prevScroll = useRef(0)
  const timeout = useRef<number | null>(null)
  const { id } = useParams({ strict: false })
  const { data: product } = useProductDetail(Number(id))

  useEffect(() => {
    setIsTimer(true)
    timeout.current = setTimeout(() => setIsTimer(false), 5000)
    return () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current)
      }
    }
  }, [])

  return (
    <>
      <Header title="상품 상세" />
      <ScreenTimer isTick={isTimer} onTimeOver={() => {}} />
      <main>
        <div className="item-detail">
          {product && (
            <>
              <Carousel images={product.images ?? []} />
              <div className="px-4 mt-4">
                <p>{product.title}</p>
                <div>
                  {product.price.discount ? (
                    <>
                      <span>
                        {Number(product.price.discount).toLocaleString()} 원
                      </span>
                      <span className={styles.before}>
                        {Number(product.price.original).toLocaleString()} 원
                      </span>
                    </>
                  ) : (
                    <span>
                      {Number(product.price.original).toLocaleString()} 원
                    </span>
                  )}
                </div>
              </div>
              <div className="item-description p-4">
                {product && (
                  <>
                    <p>{product?.description}</p>
                    <span className="flex plate">
                      <Star fill="var(--color-tx-amber)" strokeWidth={0} />
                      {`${product.review.rating} (${product.review.count})`}
                    </span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <ShopCTA />
    </>
  )
}
