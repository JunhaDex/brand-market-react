import './Detail.module.css'
import Header from '@/components/navigations/Header.tsx'
import Carousel from '@/components/display/Carousel.tsx'
import ShopCTA from '@/pages/Detail/ShopCTA.tsx'
import { useProductDetail } from '@/queries/Product.query.ts'
import { useParams } from '@tanstack/react-router'
import styles from '@/pages/Home/Home.module.css'
import { Star } from 'lucide-react'

export default function DetailPage() {
  const { id } = useParams({ strict: false })
  const { data: product } = useProductDetail(Number(id))

  return (
    <>
      <Header title="상품 상세" />
      <main>
        <div className="item-detail">
          {product && (
            <>
              <Carousel images={product.images ?? []} />
              <div>
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
            </>
          )}
        </div>
        <div className="delivery-info"></div>
        <div className="item-description">
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
      </main>
      <ShopCTA />
    </>
  )
}
