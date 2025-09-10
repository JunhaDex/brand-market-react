import './Detail.module.css'
import Header from '@/components/navigations/Header.tsx'
import Carousel from '@/components/display/Carousel.tsx'
import ShopCTA from '@/pages/Detail/ShopCTA.tsx'

export default function DetailPage() {
  return (
    <>
      <Header />
      <main>
        <div className="item-detail">
          <Carousel />
        </div>
        <div className="delivery-info"></div>
        <div className="item-description">
          <p>somewhat</p>
        </div>
      </main>
      <ShopCTA />
    </>
  )
}
