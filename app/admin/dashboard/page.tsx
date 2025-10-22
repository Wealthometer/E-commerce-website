"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useAdmin } from "@/hooks/use-admin"
import Link from "next/link"
import { ShoppingCart, Package, Users, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const { stats, fetchStats } = useAdmin()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const loadStats = async () => {
      await fetchStats()
      setLoading(false)
    }

    loadStats()
  }, [user, router, fetchStats])

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}!</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  label="Total Orders"
                  value={stats?.totalOrders || "0"}
                  icon={<ShoppingCart className="w-6 h-6" />}
                  trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                  label="Total Revenue"
                  value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
                  icon={<TrendingUp className="w-6 h-6" />}
                  trend={{ value: 8, isPositive: true }}
                />
                <StatCard
                  label="Total Products"
                  value={stats?.totalProducts || "0"}
                  icon={<Package className="w-6 h-6" />}
                  trend={{ value: 3, isPositive: true }}
                />
                <StatCard
                  label="Total Customers"
                  value={stats?.totalCustomers || "0"}
                  icon={<Users className="w-6 h-6" />}
                  trend={{ value: 5, isPositive: true }}
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="md:col-span-1 bg-card rounded-lg border border-border p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Link href="/admin/products/new">
                      <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                        Add New Product
                      </Button>
                    </Link>
                    <Link href="/admin/orders">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        View All Orders
                      </Button>
                    </Link>
                    <Link href="/admin/customers">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Manage Customers
                      </Button>
                    </Link>
                    <Link href="/admin/analytics">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        View Analytics
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="md:col-span-2 bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Recent Orders</h2>
                    <Link href="/admin/orders">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                      stats.recentOrders.slice(0, 5).map((order: any) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition"
                        >
                          <div>
                            <p className="font-medium">Order {order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No recent orders</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
