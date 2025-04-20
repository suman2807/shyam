"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NewsItem {
  id: number
  title: string
  date: string
  source: string
  category: string
  url: string
}

/**
 * A React component that displays a rotating news feed with options to pause, navigate through items, and view all news.
 *
 * @function
 * @returns {JSX.Element} - The rendered FlashNews component.
 */
export default function FlashNews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Sample news data
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Government announces new MSP for Kharif crops, 5% increase for paddy",
      date: "2025-06-10",
      source: "Agriculture Today",
      category: "Policy",
      url: "/news/1",
    },
    {
      id: 2,
      title: "Monsoon forecast: IMD predicts above normal rainfall this season",
      date: "2025-06-08",
      source: "Weather Watch",
      category: "Weather",
      url: "/news/2",
    },
    {
      id: 3,
      title: "New pest-resistant cotton variety developed by agricultural scientists",
      date: "2025-06-05",
      source: "Crop Science Weekly",
      category: "Research",
      url: "/news/3",
    },
    {
      id: 4,
      title: "Farmers in Maharashtra report record wheat harvest this season",
      date: "2025-06-03",
      source: "Rural Times",
      category: "Success Story",
      url: "/news/4",
    },
  ]

  // Auto-rotate news items
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isPaused, newsItems.length])

  /**
   * Navigates to the previous news item in the list. If the current index is at the beginning of the list,
   * it wraps around to the end.
   *
   * @function
   * @returns {void}
   */
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length)
  }

  /**
   * Updates the current index to point to the next item in the newsItems array.
   * If it reaches the end of the array, it wraps around to the first item.
   */
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
  }

  return (
    <div
      className="bg-green-50 py-2 border-b"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-700">
          <Newspaper className="h-4 w-4" />
          <span className="font-medium text-sm">FARMER NEWS:</span>
        </div>

        <div className="flex-1 px-4 overflow-hidden">
          <div className="relative">
            {newsItems.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                }`}
              >
                <Link href={item.url} className="text-sm hover:text-green-700">
                  {item.title}
                  <span className="ml-2 text-xs text-gray-500">
                    ({item.source} • {new Date(item.date).toLocaleDateString()})
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Link href="/news">
            <Button variant="ghost" size="sm" className="text-xs h-6">
              View All
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
