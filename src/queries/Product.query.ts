import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ProductService } from '@/services/product.service.ts'
import type { ListOptions } from '@/types/common.type.ts'

export const productKeys = {
  all: ['product'] as const,
  list: (options?: unknown) => [...productKeys.all, 'list', options] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
}

export function useInfiniteProductList(options?: ListOptions) {
  const service = new ProductService()
  return useInfiniteQuery({
    queryKey: productKeys.list(options),
    queryFn: async ({ pageParam }) => {
      return await service.getProductList({
        page: { nextPage: pageParam.toString(), options },
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log(lastPage.meta.pageNo, lastPage.meta.hasNext)
      const current = Number(lastPage.meta.pageNo)
      return lastPage.meta.hasNext ? current + 1 : undefined
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
