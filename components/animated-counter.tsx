"use client"

import { useState, useEffect } from "react"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  start?: boolean
}

export function useAnimatedCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, start])

  return count
}

export function AnimatedCounter({ end, suffix = "", duration = 2000, start = false }: AnimatedCounterProps) {
  const count = useAnimatedCounter(end, duration, start)
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
