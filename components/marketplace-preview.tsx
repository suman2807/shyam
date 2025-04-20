"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function MarketplacePreview() {
  const [activeTab, setActiveTab] = useState("vegetables")
  const { toast } = useToast()

  const products = {
    vegetables: [
      {
        id: 1,
        name: "Organic Tomatoes",
        price: 60,
        unit: "kg",
        farmer: "Green Valley Farm, Maharashtra",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 2,
        name: "Fresh Spinach",
        price: 40,
        unit: "bunch",
        farmer: "Riverside Gardens, Punjab",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 3,
        name: "Brinjal (Eggplant)",
        price: 35,
        unit: "kg",
        farmer: "Sunny Fields, Karnataka",
        image: "/placeholder.svg?height=200&width=200",
        organic: false,
      },
      {
        id: 4,
        name: "Bitter Gourd",
        price: 45,
        unit: "kg",
        farmer: "Harmony Acres, Gujarat",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
    ],
    fruits: [
      {
        id: 5,
        name: "Alphonso Mangoes",
        price: 350,
        unit: "dozen",
        farmer: "Ratnagiri Farms, Maharashtra",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 6,
        name: "Bananas",
        price: 60,
        unit: "dozen",
        farmer: "Kerala Plantations",
        image: "/placeholder.svg?height=200&width=200",
        organic: false,
      },
      {
        id: 7,
        name: "Strawberries",
        price: 120,
        unit: "box",
        farmer: "Mahabaleshwar Berry Farm",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 8,
        name: "Guava",
        price: 80,
        unit: "kg",
        farmer: "Uttar Pradesh Orchards",
        image: "/placeholder.svg?height=200&width=200",
        organic: false,
      },
    ],
    grains: [
      {
        id: 9,
        name: "Basmati Rice",
        price: 150,
        unit: "kg",
        farmer: "Punjab Rice Farms",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 10,
        name: "Organic Wheat",
        price: 45,
        unit: "kg",
        farmer: "Madhya Pradesh Grains",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 11,
        name: "Millet (Bajra)",
        price: 60,
        unit: "kg",
        farmer: "Rajasthan Dry Farms",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 12,
        name: "Organic Pulses Mix",
        price: 120,
        unit: "kg",
        farmer: "Bihar Organic Collective",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
    ],
  }

  const handleAddToCart = (product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleAddToWishlist = (product) => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  return (
    <div className="mt-8">
      <Tabs defaultValue="vegetables" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="vegetables" onClick={() => setActiveTab("vegetables")}>
            Vegetables
          </TabsTrigger>
          <TabsTrigger value="fruits" onClick={() => setActiveTab("fruits")}>
            Fruits
          </TabsTrigger>
          <TabsTrigger value="grains" onClick={() => setActiveTab("grains")}>
            Grains & Pulses
          </TabsTrigger>
        </TabsList>
        {Object.keys(products).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products[category].map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                    {product.organic && <Badge className="absolute top-2 left-2 bg-green-600">Organic</Badge>}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.farmer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{product.price}</p>
                        <p className="text-xs text-gray-500">per {product.unit}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Link href={`/product/${product.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
