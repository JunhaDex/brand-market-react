import { ApiService } from '@/services/api.service.ts'
import { sleep, cleanObj } from '@/utils'
import type {
  KeyMapping,
  PageRequest,
  PageResponse,
} from '@/types/common.type.ts'
import type { Product } from '@/types/product.type.ts'

export class ProductService extends ApiService {
  private productKeyMapping: KeyMapping = {
    id: 'id',
    title: 'title',
    description: 'description',
    tag: 'tag',
    price: 'price',
    images: 'images',
    filters: 'filters',
    createdAt: 'createdAt',
    review: 'review',
  }

  constructor() {
    super()
  }

  async getProductList(options?: {
    page: PageRequest
  }): Promise<PageResponse<Product>> {
    // 실제 환경에서는 axios 를 통한 API 호출이 이루어집니다.
    // api 응답 대기 - api 응답 mock
    // await sleep(1000)
    const mock = (await import('@/assets/data/product_list.json'))
      .default as any
    const nextPage = options?.page?.nextPage ?? '1'
    const raw = mock[nextPage]
    // 수신 후 데이터 가공
    if (raw) {
      return {
        meta: { ...raw.paginate },
        list: raw.data.map((product: any) => {
          return cleanObj<Product>(product, this.productKeyMapping)
        }),
      }
    }
    return this.emptyPage as PageResponse<Product>
  }

  async getProductDetail(id: number): Promise<Product> {
    // 실제 환경에서는 axios 를 통한 API 호출이 이루어집니다.
    // api 응답 대기 - api 응답 mock
    // await sleep(1000)
    const mock = (await import('@/assets/data/product_list.json'))
      .default as any
    for (const page of Object.values(mock) as any) {
      const match = page?.data?.find((product: any) => product.id === id.toString())
      if (match) {
        console.log(match)
        return cleanObj<Product>(match, this.productKeyMapping)
      }
    }
    throw new Error('Not Found')
  }
}
