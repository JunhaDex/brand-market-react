import styles from './Home.module.css'
import { Star } from 'lucide-react'
import type { Product } from '@/types/product.type.ts'
import { Link } from '@tanstack/react-router'

interface ItemCardProps {
  product: Product
}

export default function ItemCard({ product }: ItemCardProps) {
  const discountPrice = product.price.discount ? (
    <>
      <span>{Number(product.price.discount).toLocaleString()} 원</span>
      <span className={styles.before}>
        {Number(product.price.original).toLocaleString()} 원
      </span>
    </>
  ) : (
    <span>{Number(product.price.original).toLocaleString()} 원</span>
  )
  return (
    <Link to={`/product/${product.id}`} className={styles.itemCard}>
      <div className={styles.preview}>
        {product.tag ? (
          <span className={`badge badge-primary ${styles.badgePreview}`}>
            {product.tag}
          </span>
        ) : null}
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className={styles.details}>
        <p>{product.title}</p>
        <div className={styles.price}>{discountPrice}</div>
        <div>
          <span className="flex plate">
            <Star fill="var(--color-tx-amber)" strokeWidth={0} />
            {`${product.review.rating} (${product.review.count})`}
          </span>
        </div>
      </div>
    </Link>
  )
}
