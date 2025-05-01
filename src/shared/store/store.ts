import { createStore } from 'zustand/vanilla'
import { IProduct } from '../types/Product'
import { apiUrlBuilder } from '../utils/urlBuilder'

interface ICart {
  id: number
  count: number
  productId: number
  product: IProduct
}

export type CartState = {
  show: boolean
  cart: ICart[]
}

export type CartActions = {
  switchCart: () => void
  openCart: (userId?: number) => Promise<void>
  fetchCart: (userId?: number) => Promise<void>
}

export type CartStore = CartState & CartActions

const loadCartFromServer = async (userId?: number): Promise<ICart[]> => {
  const session = localStorage.getItem('session')

  if (!session) return []

  const url = `/user/cart?session=${session}${userId ? "&userId="+userId : ''}`
  const res = await fetch(apiUrlBuilder(url))
  if (!res.ok) throw new Error(res.statusText)

  return res.json()
}

export const defaultInitState: CartState = {
  show: false,
  cart: [],
}

export const createCartStore = (
    initState: CartState = defaultInitState,
  ) => {
    const store = createStore<CartStore>()((set) => ({
      ...initState,
  
      switchCart: () => set((s) => ({ show: !s.show })),
      
      openCart: async (userId?: number) => {
        const data = await loadCartFromServer(userId)
        set({ show: true, cart: data })
      },
  
      fetchCart: async (userId?: number) => {
        const data = await loadCartFromServer(userId)
        set({ cart: data })
      },
    }))
  
    return store
  }