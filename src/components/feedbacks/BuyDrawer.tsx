import type { Product } from '@/types/product.type.ts'
import styles from '@/pages/Detail/Detail.module.css'

interface BuyDrawerProps {
  isOpen: boolean
  product: Product
  events?: {
    onClose?: () => void
  }
}

export default function BuyDrawer({ isOpen, product, events }: BuyDrawerProps) {
  const handleClose = () => {
    if (events?.onClose) events.onClose()
  }
  return (
    <>
      <div className={`drawer-wrap ${isOpen ? 'show' : ''}`.trim()}>
        <div className="handle"></div>
        <div className="drawer-content">
          <div className={styles.itemDetail}>
            <h3 className={styles.title}>{product.title}</h3>
            <div className="flex justify-between items-center gap-4">
              <div className={styles.price}>
                {product.price.discount ? (
                  <>
                    <div className={styles.before}>
                      <span className={styles.percent}>
                        {100 -
                          Math.round(
                            (product.price.discount / product.price.original) *
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
              <div>foo</div>
            </div>
          </div>
        </div>
        <div className="btn-wrap">
          <button className="btn btn-primary w-full block btn-primary btn-lg">
            구매하기
          </button>
        </div>
      </div>
      {isOpen && <div className="backdrop-layer" onClick={handleClose}></div>}
    </>
  )
}
