import Header from '@/components/navigations/Header.tsx'
import Carousel from '@/components/display/Carousel.tsx'
import ShopCTA from '@/pages/Detail/ShopCTA.tsx'
import { useProductDetail } from '@/queries/Product.query.ts'
import { useParams } from '@tanstack/react-router'
import styles from './Detail.module.css'
import { Star } from 'lucide-react'
import ScreenTimer from '@/components/display/ScreenTimer.tsx'
import { useEffect, useRef, useState } from 'react'

export default function DetailPage() {
  const [isTimer, setIsTimer] = useState(true)
  const timeout = useRef<number | null>(null)
  const { id } = useParams({ strict: false })
  const { data: product } = useProductDetail(Number(id))

  useEffect(() => {
    setIsTimer(true)
    timeout.current = window.setTimeout(() => setIsTimer(false), 5000)
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
        <div className={styles.itemDetail}>
          {product && (
            <>
              <Carousel images={product.images ?? []} />
              <div className={styles.itemDetailSafe}>
                <div className="mb-4">
                  <p className={styles.title}>{product.title}</p>
                  <div className={styles.price}>
                    {product.price.discount ? (
                      <>
                        <div className={styles.before}>
                          <span className={styles.percent}>
                            {100 -
                              Math.round(
                                (product.price.discount /
                                  product.price.original) *
                                  100,
                              )}
                            %
                          </span>
                          <s>
                            {Number(product.price.original).toLocaleString()} 원
                          </s>
                        </div>
                        <div>
                          {Number(product.price.discount).toLocaleString()} 원
                        </div>
                      </>
                    ) : (
                      <span>
                        {Number(product.price.original).toLocaleString()} 원
                      </span>
                    )}
                  </div>
                </div>
                <div className="item-description pb-4">
                  {product && (
                    <>
                      <p className="mb-2">{product?.description}</p>
                      <span className="flex plate">
                        <Star fill="var(--color-tx-amber)" strokeWidth={0} />
                        {`${product.review.rating} (${product.review.count})`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <ShopCTA product={product} />
    </>
  )
}
