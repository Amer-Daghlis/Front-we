"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown } from "lucide-react"

export interface Stat {
  title: string
  value: string
  change?: string // Made optional
  icon: LucideIcon
  color: string
  trend?: string
}

interface StatsCardsProps {
  stats: Stat[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-400 to-blue-600",
      green: "from-green-400 to-green-600",
      orange: "from-orange-400 to-orange-600",
      purple: "from-purple-400 to-purple-600",
      red: "from-red-400 to-red-600",
      slate: "from-slate-400 to-slate-600", // Added for admin
      gray: "from-gray-400 to-gray-600", // Added for admin
      zinc: "from-zinc-400 to-zinc-600", // Added for admin
      pink: "from-pink-400 to-pink-600", // Added for lawyer
      indigo: "from-indigo-400 to-indigo-600", // Added for lawyer
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getBackgroundGradient = (color: string) => {
    const backgrounds = {
      blue: "from-blue-50 to-cyan-50",
      green: "from-green-50 to-emerald-50",
      orange: "from-orange-50 to-yellow-50",
      purple: "from-purple-50 to-pink-50",
      red: "from-red-50 to-rose-50",
      slate: "from-slate-50 to-gray-50",
      gray: "from-gray-50 to-zinc-50",
      zinc: "from-zinc-50 to-stone-50",
      pink: "from-pink-50 to-fuchsia-50",
      indigo: "from-indigo-50 to-violet-50",
    }
    return backgrounds[color as keyof typeof backgrounds] || backgrounds.blue
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br ${getBackgroundGradient(stat.color)} animate-slideInUp group cursor-pointer overflow-hidden`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <CardContent className="p-6 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </p>
                {(stat.change || stat.trend) && (
                  <div className="flex items-center space-x-2">
                    {stat.change && <p className="text-sm text-gray-500">{stat.change}</p>}
                    {stat.trend && (
                      <div className="flex items-center space-x-1">
                        {stat.trend.includes("+") ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : stat.trend.includes("-") ? (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        ) : null}
                        <span
                          className={`text-xs font-medium ${
                            stat.trend.includes("+")
                              ? "text-green-600"
                              : stat.trend.includes("-")
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {stat.trend}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div
                className={`p-4 rounded-2xl bg-gradient-to-r ${getColorClasses(stat.color)} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
