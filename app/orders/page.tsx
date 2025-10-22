"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { useOrders } from "@/hooks/use-orders"
import { OrderCard } from "@/components/order-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrdersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { orders, fetchOrders } = useOrders()
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

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your orders</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
              <p className="text-muted-foreground mb-8">You haven't placed any orders yet. Start shopping!</p>
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
