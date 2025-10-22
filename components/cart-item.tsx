"use client"

import type { CartItem } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"

interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <img
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg bg-muted"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="text-destructive hover:text-destructive mt-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
