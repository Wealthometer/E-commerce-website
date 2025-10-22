"use client"

import type { Order } from "@/hooks/use-orders"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const orderDate = new Date(order.createdAt)
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono font-semibold">{order.id}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(order.status)}
          <span className="text-sm font-medium capitalize">{getStatusLabel(order.status)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
        <div>
          <p className="text-sm text-muted-foreground">Order Date</p>
          <p className="font-medium">{formattedDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-bold text-lg text-accent">${order.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">Items ({order.items.length})</p>
        <div className="space-y-1">
          {order.items.slice(0, 2).map((item) => (
            <p key={item.id} className="text-sm">
              {item.name} x {item.quantity}
            </p>
          ))}
          {order.items.length > 2 && <p className="text-sm text-muted-foreground">+{order.items.length - 2} more</p>}
        </div>
      </div>

      <Link href={`/orders/${order.id}`}>
        <Button className="w-full bg-transparent" variant="outline">
          View Details
        </Button>
      </Link>
    </div>
  )
}
