import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication - in production, verify against database
    if (email === "demo@example.com" && password === "password123") {
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          email: "demo@example.com",
          name: "Demo User",
        },
        token: "mock-jwt-token-" + Date.now(),
      })
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
