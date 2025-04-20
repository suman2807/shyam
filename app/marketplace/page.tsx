"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Search, ShoppingCart, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"

export default function MarketplacePage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    categories: [],
    organic: false,
    priceRange: [0, 1000],
    sortBy: "relevance",
  })
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  // Mock product data - in a real app, this would come from an API
  const allProducts = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: 60,
      unit: "kg",
      farmer: "Green Valley Farm, Maharashtra",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "vegetables",
    },
    {
      id: 2,
      name: "Fresh Spinach",
      price: 40,
      unit: "bunch",
      farmer: "Riverside Gardens, Punjab",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "vegetables",
    },
    {
      id: 3,
      name: "Brinjal (Eggplant)",
      price: 35,
      unit: "kg",
      farmer: "Sunny Fields, Karnataka",
      image: "/placeholder.svg?height=200&width=200",
      organic: false,
      category: "vegetables",
    },
    {
      id: 4,
      name: "Bitter Gourd",
      price: 45,
      unit: "kg",
      farmer: "Harmony Acres, Gujarat",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "vegetables",
    },
    {
      id: 5,
      name: "Alphonso Mangoes",
      price: 350,
      unit: "dozen",
      farmer: "Ratnagiri Farms, Maharashtra",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "fruits",
    },
    {
      id: 6,
      name: "Bananas",
      price: 60,
      unit: "dozen",
      farmer: "Kerala Plantations",
      image: "/placeholder.svg?height=200&width=200",
      organic: false,
      category: "fruits",
    },
    {
      id: 7,
      name: "Strawberries",
      price: 120,
      unit: "box",
      farmer: "Mahabaleshwar Berry Farm",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "fruits",
    },
    {
      id: 8,
      name: "Guava",
      price: 80,
      unit: "kg",
      farmer: "Uttar Pradesh Orchards",
      image: "/placeholder.svg?height=200&width=200",
      organic: false,
      category: "fruits",
    },
    {
      id: 9,
      name: "Basmati Rice",
      price: 150,
      unit: "kg",
      farmer: "Punjab Rice Farms",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "grains",
    },
    {
      id: 10,
      name: "Organic Wheat",
      price: 45,
      unit: "kg",
      farmer: "Madhya Pradesh Grains",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "grains",
    },
    {
      id: 11,
      name: "Millet (Bajra)",
      price: 60,
      unit: "kg",
      farmer: "Rajasthan Dry Farms",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "grains",
    },
    {
      id: 12,
      name: "Organic Pulses Mix",
      price: 120,
      unit: "kg",
      farmer: "Bihar Organic Collective",
      image: "/placeholder.svg?height=200&width=200",
      organic: true,
      category: "grains",
    },
  ]

  useEffect(() => {
    // Simulate API call to get products
    setLoading(true)
    setTimeout(() => {
      let filteredProducts = [...allProducts]

      // Apply search filter
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.farmer.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      // Apply category filter
      if (filters.categories.length > 0) {
        filteredProducts = filteredProducts.filter((product) => filters.categories.includes(product.category))
      }

      // Apply organic filter
      if (filters.organic) {
        filteredProducts = filteredProducts.filter((product) => product.organic)
      }

      // Apply price range filter
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
      )

      // Apply sorting
      if (filters.sortBy === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price)
      } else if (filters.sortBy === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price)
      } else if (filters.sortBy === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      }

      setProducts(filteredProducts)
      setLoading(false)
    }, 500)
  }, [searchTerm, filters])

  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
      return { ...prev, categories }
    })
  }

  const handleOrganicChange = (checked) => {
    setFilters((prev) => ({ ...prev, organic: checked }))
  }

  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sortBy: value }))
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

  const clearFilters = () => {
    setFilters({
      categories: [],
      organic: false,
      priceRange: [0, 1000],
      sortBy: "relevance",
    })
    setSearchTerm("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Marketplace</h1>
      <p className="mt-2 text-gray-600">Discover fresh, local produce from farmers across India</p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        {/* Filters - Desktop */}
        <div className="hidden w-64 shrink-0 md:block">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear
              </Button>
            </div>

            <div className="mt-4">
              <h3 className="font-medium">Categories</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetables"
                    checked={filters.categories.includes("vegetables")}
                    onCheckedChange={() => handleCategoryChange("vegetables")}
                  />
                  <Label htmlFor="vegetables">Vegetables</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fruits"
                    checked={filters.categories.includes("fruits")}
                    onCheckedChange={() => handleCategoryChange("fruits")}
                  />
                  <Label htmlFor="fruits">Fruits</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="grains"
                    checked={filters.categories.includes("grains")}
                    onCheckedChange={() => handleCategoryChange("grains")}
                  />
                  <Label htmlFor="grains">Grains & Pulses</Label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="organic" checked={filters.organic} onCheckedChange={handleOrganicChange} />
                <Label htmlFor="organic">Organic Only</Label>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium">Price Range</h3>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">₹{filters.priceRange[0]}</span>
                  <span className="text-sm">₹{filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number.parseInt(e.target.value)],
                    }))
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search products or farmers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={filters.sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              {/* Filters - Mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-2">
                        Clear all filters
                      </Button>
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vegetables-mobile"
                          checked={filters.categories.includes("vegetables")}
                          onCheckedChange={() => handleCategoryChange("vegetables")}
                        />
                        <Label htmlFor="vegetables-mobile">Vegetables</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fruits-mobile"
                          checked={filters.categories.includes("fruits")}
                          onCheckedChange={() => handleCategoryChange("fruits")}
                        />
                        <Label htmlFor="fruits-mobile">Fruits</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="grains-mobile"
                          checked={filters.categories.includes("grains")}
                          onCheckedChange={() => handleCategoryChange("grains")}
                        />
                        <Label htmlFor="grains-mobile">Grains & Pulses</Label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="organic-mobile" checked={filters.organic} onCheckedChange={handleOrganicChange} />
                      <Label htmlFor="organic-mobile">Organic Only</Label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">₹{filters.priceRange[0]}</span>
                        <span className="text-sm">₹{filters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], Number.parseInt(e.target.value)],
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-lg bg-gray-200"></div>
                  <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="mt-1 h-4 w-1/2 rounded bg-gray-200"></div>
                  <div className="mt-2 flex justify-between">
                    <div className="h-8 w-20 rounded bg-gray-200"></div>
                    <div className="h-8 w-20 rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-4 text-sm text-gray-600">
                Showing {products.length} {products.length === 1 ? "product" : "products"}
              </div>

              {products.length === 0 ? (
                <div className="mt-8 rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-semibold">No products found</h3>
                  <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
                  <Button className="mt-4" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="relative">
                        <Link href={`/product/${product.id}`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                        </Link>
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
                            <Link href={`/product/${product.id}`}>
                              <h3 className="font-semibold text-lg hover:text-green-600">{product.name}</h3>
                            </Link>
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
