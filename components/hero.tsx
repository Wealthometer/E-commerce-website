import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Discover Premium Products</h1>
            <p className="text-lg mb-8 opacity-90">
              Shop the finest collection of curated products. Quality, style, and innovation in every item.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="bg-primary/20 rounded-lg h-64 md:h-80 flex items-center justify-center">
            <img src="/premium-products-hero.jpg" alt="Hero" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
