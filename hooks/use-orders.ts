import { create } from "zustand"

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    state: string
    zip: string
  }
  createdAt: string
  estimatedDelivery: string
}

interface OrderStore {
  orders: Order[]
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
  getOrderById: (id: string) => Order | undefined
  fetchOrders: (userId: string) => Promise<void>
}

export const useOrders = create<OrderStore>((set, get) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
    })),
  getOrderById: (id) => {
    const state = get()
    return state.orders.find((order) => order.id === id)
  },
  fetchOrders: async (userId: string) => {
    try {
      const response = await fetch(`/api/orders?userId=${userId}`)
      const data = await response.json()
      set({ orders: data })
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    }
  },
}))
