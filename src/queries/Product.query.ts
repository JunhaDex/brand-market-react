import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ProductService } from '@/services/product.service.ts'

export const productKeys = {
  all: ['product'] as const,
  list: (options?: unknown) => [...productKeys.all, 'list', options] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
}

export function useInfiniteProductList() {
  const service = new ProductService()
  return useInfiniteQuery({
    queryKey: productKeys.list(),
    queryFn: async ({ pageParam = { nextPage: '1' } }) => {
      return service.getProductList({ page: pageParam })
    },
    initialPageParam: { nextPage: '1' },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNext
        ? { nextPage: String(Number(lastPage.meta.pageNo) + 1) }
        : undefined
    },
  })
}

export function useProductDetail(id: number) {
  const service = new ProductService()
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      return service.getProductDetail(id)
    },
    enabled: !!id,
  })
}
