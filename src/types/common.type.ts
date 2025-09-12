export interface PageResponse<T> {
  meta: PageMeta
  list: T[]
}

export interface PageMeta {
  total: number
  pageNo: string
  hasNext: boolean
}

export interface PageRequest {
  nextPage?: string
  options?: ListOptions
}

export interface ListOptions {
  keyword?: string
  filter?: string[]
  sort?: string
}

export type KeyMapping = { [key: string]: string }
