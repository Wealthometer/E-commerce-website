import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock admin orders
  return NextResponse.json([
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      total: 299.99,
      status: "delivered",
      date: "2024-10-15",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      total: 149.99,
      status: "processing",
      date: "2024-10-18",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      total: 499.99,
      status: "shipped",
      date: "2024-10-19",
      items: 5,
    },
  ])
}
