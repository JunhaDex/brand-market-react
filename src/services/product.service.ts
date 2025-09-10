import { ApiService } from '@/services/api.service.ts'

export class ProductService extends ApiService {
  constructor() {
    super()
  }

  async getProductList() {}

  async getProductDetail(id: string) {}
}
