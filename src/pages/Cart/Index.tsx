import './Cart.module.css'
import Header from '@/components/navigations/Header.tsx'
import useCartStore from '@/stores/Cart.store.ts'
import styles from './Cart.module.css'
import CartItemCard from '@/pages/Cart/CartItemCard.tsx'
import type { CartItem } from '@/types/product.type.ts'
import useToastStore from '@/stores/Toast.store.ts'

export default function CartPage() {
  const cartStore = useCartStore()
  const toastStore = useToastStore()
  const removeItem = (item: CartItem) => {
    cartStore.removeFromCart(item)
    toastStore.toggleToast('장바구니에서 제거되었습니다.')
  }
  return (
    <>
      <Header title="장바구니" />
      <main className="bg-background-2 min-h-full">
        <div className={styles.cartList}>
          {cartStore.cartItems.length === 0 && (
            <div className="list-empty">장바구니에 담긴 상품이 없습니다.</div>
          )}
          {cartStore.cartItems.map((item) => (
            <CartItemCard item={item} events={{ onRemove: removeItem }} />
          ))}
        </div>
      </main>
    </>
  )
}
