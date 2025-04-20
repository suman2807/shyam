"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "Government announces new MSP for Kharif crops, 5% increase for paddy",
    summary:
      "The Cabinet Committee on Economic Affairs has approved new Minimum Support Prices (MSPs) for Kharif crops, with a significant increase for paddy and other essential crops to support farmers.",
    date: "2025-06-10",
    source: "Agriculture Today",
    category: "Policy",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Monsoon forecast: IMD predicts above normal rainfall this season",
    summary:
      "The Indian Meteorological Department has released its seasonal forecast predicting above-normal rainfall during the upcoming monsoon season, bringing relief to farmers across the country.",
    date: "2025-06-08",
    source: "Weather Watch",
    category: "Weather",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "New pest-resistant cotton variety developed by agricultural scientists",
    summary:
      "Scientists at the Indian Agricultural Research Institute have developed a new cotton variety that shows significant resistance to bollworm and other common pests, potentially reducing the need for pesticides.",
    date: "2025-06-05",
    source: "Crop Science Weekly",
    category: "Research",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    title: "Farmers in Maharashtra report record wheat harvest this season",
    summary:
      "Wheat farmers in Maharashtra are celebrating a bumper harvest this season, with yields up by 15% compared to last year due to favorable weather conditions and improved farming techniques.",
    date: "2025-06-03",
    source: "Rural Times",
    category: "Success Story",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    title: "New agricultural export policy aims to double farm exports by 2030",
    summary:
      "The government has unveiled a new agricultural export policy with the ambitious target of doubling farm exports to $60 billion by 2030, focusing on organic and value-added products.",
    date: "2025-06-01",
    source: "Economic Observer",
    category: "Policy",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 6,
    title: "Innovative drip irrigation system helps farmers save 60% water",
    summary:
      "A new solar-powered drip irrigation system developed by Indian engineers is helping farmers reduce water usage by up to 60% while maintaining or improving crop yields.",
    date: "2025-05-28",
    source: "Tech for Agriculture",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 7,
    title: "Organic farming area in India increases by 25% in the last year",
    summary:
      "The area under certified organic farming in India has increased by 25% in the past year, with more farmers transitioning to sustainable practices in response to growing consumer demand.",
    date: "2025-05-25",
    source: "Organic Farming Today",
    category: "Trends",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 8,
    title: "New mobile app connects farmers directly to institutional buyers",
    summary:
      "A new mobile application launched by an agri-tech startup is helping farmers connect directly with hotels, restaurants, and institutional buyers, eliminating middlemen and increasing farmer profits.",
    date: "2025-05-22",
    source: "Digital Farming",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=500",
  },
]

/**
 * A React component that renders the news page.
 *
 * This component handles filtering news items based on search terms and categories.
 * It also provides a navigation back to the home page and displays a list of filtered news articles.
 */
export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = ["all", "policy", "weather", "research", "technology", "trends", "success story"]

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category.toLowerCase() === activeCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Farmer News & Updates</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search news articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
            <TabsList className="w-full md:w-auto overflow-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No news articles found matching your search.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((article) => (
              <Card key={article.id} className="overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">{article.category}</Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString()} • {article.source}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-1">
                  <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/news/${article.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
