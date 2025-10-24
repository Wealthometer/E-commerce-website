import { type NextRequest, NextResponse } from "next/server"

// Mock orders database
const orders: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (userId) {
    const userOrders = orders.filter((o) => o.userId === userId)
    return NextResponse.json(userOrders)
  }

  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items, shippingAddress, paymentMethod, total, tax, shipping } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Order must contain items" }, { status: 400 })
    }

    const order = {
      id: "ORD-" + Date.now(),
      userId: userId || "guest-" + Date.now(),
      items,
      shippingAddress,
      paymentMethod,
      total,
      tax,
      shipping,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(order)

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 