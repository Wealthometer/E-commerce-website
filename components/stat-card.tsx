"use client"

import type { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-muted-foreground text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
      {trend && (
        <p className={`text-sm ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
        </p>
      )}
    </div>
  )
}
