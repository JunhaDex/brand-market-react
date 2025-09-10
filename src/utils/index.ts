import type { KeyMapping } from '@/types/common.type.ts'

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function cleanObj<T extends object>(
  obj: Record<string, any>,
  mapping: KeyMapping,
): T {
  const result: Record<string, any> = {}
  for (const sourceKey in mapping) {
    const targetKey = mapping[sourceKey]
    result[targetKey] = null
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const keyMap = mapping[key]
      if (keyMap) {
        result[keyMap] = obj[key]
      }
    }
  }
  return result as T
}
