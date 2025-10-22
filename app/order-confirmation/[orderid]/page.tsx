"use client"

import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LogOut, ShoppingBag, Heart, Settings } from "lucide-react"
import { useOrders } from "@/hooks/use-orders"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { orders, fetchOrders } = useOrders()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const loadOrders = async () => {
      await fetchOrders(user.id)
      setLoading(false)
    }

    loadOrders()
  }, [user, router, fetchOrders])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  const recentOrders = orders.slice(0, 3)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link href="/orders">
              <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <ShoppingBag className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-2">My Orders</h3>
                <p className="text-muted-foreground text-sm">{orders.length} orders</p>
              </div>
            </Link>

            <Link href="/wishlist">
              <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Heart className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-2">Wishlist</h3>
                <p className="text-muted-foreground text-sm">Your saved items</p>
              </div>
            </Link>

            <Link href="/profile">
              <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Settings className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-2">Profile Settings</h3>
                <p className="text-muted-foreground text-sm">Manage your account</p>
              </div>
            </Link>

            <div className="bg-card rounded-lg border border-border p-6">
              <LogOut className="w-8 h-8 text-destructive mb-4" />
              <h3 className="font-semibold text-lg mb-2">Sign Out</h3>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full text-destructive hover:text-destructive bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Recent Orders */}
          {!loading && recentOrders.length > 0 && (
            <div className="bg-card rounded-lg border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Orders</h2>
                <Link href="/orders">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link key={order.id} href={`/orders/${order.id}`}>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition">
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
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline">View Cart</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
