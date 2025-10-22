"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useOrders } from "@/hooks/use-orders"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react"

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const { getOrderById, fetchOrders } = useOrders()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const loadOrder = async () => {
      await fetchOrders(user.id)
      const foundOrder = getOrderById(params.orderId)
      setOrder(foundOrder)
      setLoading(false)
    }

    loadOrder()
  }, [user, params.orderId, router, fetchOrders, getOrderById])

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <Link href="/orders">
              <Button>Back to Orders</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const getStatusSteps = () => {
    const steps = ["pending", "processing", "shipped", "delivered"]
    return steps.map((step) => ({
      step,
      completed: steps.indexOf(step) <= steps.indexOf(order.status),
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-6 h-6" />
      case "processing":
        return <Package className="w-6 h-6" />
      case "shipped":
        return <Truck className="w-6 h-6" />
      case "delivered":
        return <CheckCircle className="w-6 h-6" />
      default:
        return <Clock className="w-6 h-6" />
    }
  }

  const orderDate = new Date(order.createdAt)
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/orders" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>

          <div className="bg-card rounded-lg border border-border p-8 mb-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Order {order.id}</h1>
                <p className="text-muted-foreground">Placed on {formattedDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                <p className="text-3xl font-bold text-accent">${order.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="font-semibold mb-6">Order Status</h2>
              <div className="flex items-center justify-between">
                {getStatusSteps().map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                        item.completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {getStatusIcon(item.step)}
                    </div>
                    <p className="text-sm font-medium capitalize text-center">{item.step}</p>
                    {index < getStatusSteps().length - 1 && (
                      <div
                        className={`h-1 w-full mt-3 ${item.completed ? "bg-accent" : "bg-muted"}`}
                        style={{ marginTop: "-2rem", marginBottom: "2rem" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="font-semibold mb-4">Items</h2>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 pb-8 border-b border-border">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-accent">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-accent">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="font-semibold mb-4">Shipping Address</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress.address}</p>
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{order.shippingAddress.email}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/products" className="flex-1">
              <Button className="w-full bg-transparent" variant="outline">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/orders" className="flex-1">
              <Button className="w-full">Back to Orders</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
