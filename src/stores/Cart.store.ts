import type { CartItem } from '@/types/product.type.ts'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartStoreState {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
}

const useCartStore = create<CartStoreState>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item: CartItem) => {
        set((state) => {
          const index = state.cartItems.findIndex(
            (cartItem) => cartItem.product.id === item.product.id,
          )
          if (index !== -1) {
            const newCartItems = [...state.cartItems]
            newCartItems[index].count += item.count
            return { cartItems: newCartItems }
          } else {
            return { cartItems: [...state.cartItems, item] }
          }
        })
      },
      removeFromCart: (item: CartItem) => {
        set((state) => {
          const index = state.cartItems.findIndex(
            (cartItem) => cartItem.product.id === item.product.id,
          )
          if (index !== -1) {
            const newCartItems = [...state.cartItems]
            if (newCartItems[index].count > item.count) {
              newCartItems[index].count -= item.count
              return { cartItems: newCartItems }
            } else {
              newCartItems.splice(index, 1)
              return { cartItems: newCartItems }
            }
          }
          return state
        })
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
)
export default useCartStore
