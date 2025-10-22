import { create } from "zustand"

export interface AdminStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  recentOrders: any[]
}

interface AdminStore {
  stats: AdminStats | null
  fetchStats: () => Promise<void>
}

export const useAdmin = create<AdminStore>((set) => ({
  stats: null,
  fetchStats: async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      set({ stats: data })
    } catch (error) {
      console.error("Failed to fetch admin stats:", error)
    }
  },
}))
