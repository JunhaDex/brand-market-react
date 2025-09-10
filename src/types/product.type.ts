export interface Product {
  id: string
  title: string
  description: string
  tag: string
  price: {
    original: number
    discount: number
  }
  images: string[]
  filters: string[]
  review: {
    rating: number
    count: number
  }
}
