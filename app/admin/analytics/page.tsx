"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useAuth } from "@/hooks/use-auth"
import { StatCard } from "@/components/stat-card"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    setLoading(false)
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">View detailed business metrics</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  label="Monthly Revenue"
                  value="$12,450"
                  icon={<DollarSign className="w-6 h-6" />}
                  trend={{ value: 15, isPositive: true }}
                />
                <StatCard
                  label="New Customers"
                  value="124"
                  icon={<Users className="w-6 h-6" />}
                  trend={{ value: 8, isPositive: true }}
                />
                <StatCard
                  label="Total Orders"
                  value="456"
                  icon={<ShoppingCart className="w-6 h-6" />}
                  trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                  label="Conversion Rate"
                  value="3.2%"
                  icon={<TrendingUp className="w-6 h-6" />}
                  trend={{ value: 2, isPositive: true }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-xl font-bold mb-4">Top Products</h2>
                  <div className="space-y-3">
                    {[
                      { name: "Premium Headphones", sales: 234 },
                      { name: "Wireless Mouse", sales: 189 },
                      { name: "USB-C Cable", sales: 156 },
                    ].map((product, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center pb-3 border-b border-border last:border-0"
                      >
                        <span className="font-medium">{product.name}</span>
                        <span className="text-accent font-bold">{product.sales} sales</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-xl font-bold mb-4">Sales by Category</h2>
                  <div className="space-y-3">
                    {[
                      { category: "Electronics", percentage: 45 },
                      { category: "Accessories", percentage: 35 },
                      { category: "Bags", percentage: 20 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{item.category}</span>
                          <span className="text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    ))}
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
