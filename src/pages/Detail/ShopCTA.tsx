import CartDrawer from '@/components/feedbacks/CartDrawer.tsx'
import styles from './Detail.module.css'

export default function ShopCTA() {
  return (
    <>
      <div className={styles.detailCTAContainer}>
        <button className="btn w-full block btn-gray btn-lg">장바구니</button>
        <button className="btn btn-primary w-full block btn-primary btn-lg">
          구매하기
        </button>
      </div>
      <CartDrawer />
    </>
  )
}
