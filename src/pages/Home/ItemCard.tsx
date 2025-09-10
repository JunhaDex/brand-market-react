import styles from './Home.module.css'
import { Star } from 'lucide-react'

export default function ItemCard() {
  return (
    <div className={styles.itemCard}>
      <div className={styles.preview}>
        <span className={`badge badge-primary ${styles.badgePreview}`}>
          20% 할인중
        </span>
      </div>
      <div className={styles.details}>
        <p>상품상품명상품상품명상품상품명상품상품명상품상품명</p>
        <div className={styles.price}>
          <span>23,000 원</span>
        </div>
        <div>
          <span className="flex plate">
            <Star fill="var(--color-tx-amber)" strokeWidth={0} />
            4.5 (100)
          </span>
        </div>
      </div>
    </div>
  )
}
