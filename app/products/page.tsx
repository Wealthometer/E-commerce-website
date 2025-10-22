import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground mb-8">Browse our complete collection</p>
      </div>
      <ProductGrid />
      <Footer />
    </main>
  )
}
