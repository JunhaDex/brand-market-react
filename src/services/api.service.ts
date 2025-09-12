import type { PageResponse } from '@/types/common.type.ts'

export abstract class ApiService {
  protected emptyPage: PageResponse<unknown> = {
    meta: {
      total: 0,
      pageNo: '1',
      hasNext: false,
    },
    list: [],
  }

  constructor() {
    // 여기서 axios 인스턴스를 설정하고 BASE_URL 지정 및 인터셉터를 설정합니다.
  }
}
