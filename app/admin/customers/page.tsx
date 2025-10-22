"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { Eye, Filter } from "lucide-react"

interface Order {
  id: string
  customerName: string
  email: string
  total: number
  status: string
  createdAt: string
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/admin/orders")
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, router])

  const filteredOrders = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700"
      case "processing":
        return "bg-blue-500/10 text-blue-700"
      case "shipped":
        return "bg-purple-500/10 text-purple-700"
      case "delivered":
        return "bg-green-500/10 text-green-700"
      default:
        return "bg-gray-500/10 text-gray-700"
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders</p>
          </div>

          {/* Filter */}
          <div className="mb-6 flex gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {["all", "pending", "processing", "shipped", "delivered"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                onClick={() => setStatusFilter(status)}
                className="capitalize bg-transparent"
              >
                {status}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
                          <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium">{order.customerName}</p>
                              <p className="text-sm text-muted-foreground">{order.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Link href={`/admin/orders/${order.id}`}>
                              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                <Eye className="w-4 h-4" />
                                View
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
