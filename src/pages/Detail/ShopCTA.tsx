import BuyDrawer from '@/components/feedbacks/BuyDrawer.tsx'
import { useState } from 'react'
import styles from './Detail.module.css'
import type { Product } from '@/types/product.type.ts'
import useToastStore from '@/stores/Toast.store.ts'
import useCartStore from '@/stores/Cart.store.ts'

interface ShopCTAProps {
  product?: Product
}

export default function ShopCTA({ product }: ShopCTAProps) {
  const [isBuyOpen, setIsBuyOpen] = useState(false)
  const toastStore = useToastStore()
  const cartStore = useCartStore()

  const addToCart = () => {
    toastStore.toggleToast('장바구니에 추가되었습니다.')
    if (product) {
      cartStore.addToCart({ product: product, count: 1 })
    }
  }
  return (
    <>
      <div className={styles.detailCTAContainer}>
        <button
          className="btn w-full block btn-gray btn-lg"
          onClick={() => addToCart()}
        >
          장바구니
        </button>
        <button
          className="btn btn-primary w-full block btn-primary btn-lg"
          onClick={() => setIsBuyOpen(true)}
        >
          구매하기
        </button>
      </div>
      {product && (
        <BuyDrawer
          isOpen={isBuyOpen}
          product={product}
          events={{ onClose: () => setIsBuyOpen(false) }}
        />
      )}
    </>
  )
}
