import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock customers data
  return NextResponse.json([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      orders: 5,
      totalSpent: 1299.95,
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      orders: 3,
      totalSpent: 599.97,
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      orders: 8,
      totalSpent: 2499.92,
      joinDate: "2023-12-10",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      orders: 2,
      totalSpent: 399.98,
      joinDate: "2024-03-05",
    },
  ])
}
