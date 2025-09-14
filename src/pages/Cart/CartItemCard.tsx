import styles from './Cart.module.css'
import type { CartItem } from '@/types/product.type.ts'
import { X } from 'lucide-react'

interface CartItemCardProps {
  item: CartItem
  events?: {
    onRemove?: (item: CartItem) => void
  }
}

export default function CartItemCard({ item, events }: CartItemCardProps) {
  const product = item.product
  const handleRemove = () => {
    if (events?.onRemove) {
      events.onRemove(item)
    }
  }
  return (
    <div className={styles.cartItemWrapper}>
      <i className={`icon ${styles.close}`} onClick={() => handleRemove()}>
        <X size={16} />
      </i>
      <div className={styles.itemTitle}>{item.product.title}</div>
      <div className={styles.itemInfo}>
        <div className={styles.itemImg}>
          <img src={item.product.images[0]} alt={item.product.title} />
        </div>
        <div className={styles.price}>
          {product.price.discount ? (
            <>
              <div className={styles.before}>
                <span className={styles.percent}>
                  {100 -
                    Math.round(
                      (product.price.discount / product.price.original) * 100,
                    )}
                  %
                </span>
                <s>{Number(product.price.original).toLocaleString()} 원</s>
              </div>
              <div>{Number(product.price.discount).toLocaleString()} 원</div>
            </>
          ) : (
            <span>{Number(product.price.original).toLocaleString()} 원</span>
          )}
          <div className="text-sm text-tx-gray-3 pt-2">
            수량: {item.count}개
          </div>
        </div>
      </div>
    </div>
  )
}
