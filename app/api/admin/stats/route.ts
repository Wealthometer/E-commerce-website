import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock admin stats
  return NextResponse.json({
    totalRevenue: 45230.5,
    totalOrders: 1234,
    totalCustomers: 856,
    averageOrderValue: 36.75,
    revenueGrowth: 12.5,
    orderGrowth: 8.3,
    customerGrowth: 5.2,
    conversionRate: 3.45,
  })
}
