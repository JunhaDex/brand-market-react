import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

interface CarouselProps {
  images: string[]
}

export default function Carousel({ images }: CarouselProps) {
  return (
    <div className="carousel">
      <Swiper modules={[Pagination, Navigation]} pagination={{clickable: true}}>
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img className="slide-img" src={src} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
