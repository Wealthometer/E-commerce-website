import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ShopHub</h3>
            <p className="text-primary-foreground/80">Premium e-commerce platform for quality products.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="/products" className="hover:text-primary-foreground transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="hover:text-primary-foreground transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-primary-foreground transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="/contact" className="hover:text-primary-foreground transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-foreground transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary-foreground transition">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="/privacy" className="hover:text-primary-foreground transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-foreground transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
          <p>&copy; 2025 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
