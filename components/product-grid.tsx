"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // Fetch from Next.js API route
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        // Fallback mock data
        setProducts([
          {
            id: 1,
            name: "Premium Headphones",
            price: 199.99,
            image: "/diverse-people-listening-headphones.png",
            category: "electronics",
            rating: 4.5,
          },
          {
            id: 2,
            name: "Wireless Mouse",
            price: 49.99,
            image: "/field-mouse.png",
            category: "electronics",
            rating: 4.2,
          },
          {
            id: 3,
            name: "USB-C Cable",
            price: 19.99,
            image: "/tangled-cables.png",
            category: "accessories",
            rating: 4.8,
          },
          {
            id: 4,
            name: "Phone Stand",
            price: 29.99,
            image: "/minimalist-wooden-phone-stand.png",
            category: "accessories",
            rating: 4.3,
          },
          {
            id: 5,
            name: "Laptop Bag",
            price: 79.99,
            image: "/laptop-bag.jpg",
            category: "bags",
            rating: 4.6,
          },
          {
            id: 6,
            name: "Screen Protector",
            price: 14.99,
            image: "/screen-protector.png",
            category: "accessories",
            rating: 4.4,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = ["all", "electronics", "accessories", "bags"]
  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Products</h2>

          {/* Category Filter */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="capitalize whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
