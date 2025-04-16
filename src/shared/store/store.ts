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
  openCart: () => Promise<void>
  fetchCart: () => Promise<void>
}

export type CartStore = CartState & CartActions

const loadCartFromServer = async (): Promise<ICart[]> => {
  const session = localStorage.getItem('session')
  if (!session) return []

  const url = `/user/cart?session=${session}`
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
      
      openCart: async () => {
        const data = await loadCartFromServer()
        set({ show: true, cart: data })
      },
  
      fetchCart: async () => {
        const data = await loadCartFromServer()
        set({ cart: data })
      },
    }))
  
    return store
  }