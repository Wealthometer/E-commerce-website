import { type NextRequest, NextResponse } from "next/server"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    image: "/wireless-headphones.png",
    rating: 4.5,
    reviews: 128,
    description: "High-quality wireless headphones with noise cancellation",
    stock: 50,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    category: "Electronics",
    image: "/smartwatch-lifestyle.png",
    rating: 4.8,
    reviews: 256,
    description: "Advanced fitness tracking and notifications",
    stock: 35,
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    category: "Accessories",
    image: "/laptop-stand.png",
    rating: 4.3,
    reviews: 89,
    description: "Ergonomic aluminum laptop stand",
    stock: 100,
  },
  {
    id: 4,
    name: "USB-C Cable",
    price: 19.99,
    category: "Accessories",
    image: "/usb-cable.png",
    rating: 4.6,
    reviews: 342,
    description: "Durable 2-meter USB-C charging cable",
    stock: 200,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Electronics",
    image: "/mechanical-keyboard.png",
    rating: 4.7,
    reviews: 178,
    description: "RGB mechanical keyboard with custom switches",
    stock: 45,
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 79.99,
    category: "Electronics",
    image: "/wireless-mouse.png",
    rating: 4.4,
    reviews: 156,
    description: "Precision wireless mouse with long battery life",
    stock: 60,
  },
]

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: "Product deleted" })
}
