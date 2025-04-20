import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function FarmerProfilePage({ params }) {
  const { id } = params

  // In a real application, you would fetch this data from an API
  const farmer = {
    id: Number.parseInt(id),
    name: "Rajesh Patel",
    farm: "Green Earth Organics",
    location: "Nashik, Maharashtra",
    since: 2010,
    description:
      "Third-generation farmer specializing in organic vegetables and sustainable farming practices using traditional methods passed down through generations. Our farm is located in the fertile region of Nashik, Maharashtra, where we grow a variety of seasonal vegetables and fruits.",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=400&width=1200",
    specialty: "Organic Vegetables",
    certifications: ["Organic Certified", "Good Agricultural Practices (GAP)"],
    rating: 4.8,
    reviews: 86,
    products: [
      {
        id: 1,
        name: "Organic Tomatoes",
        price: 60,
        unit: "kg",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 2,
        name: "Fresh Spinach",
        price: 40,
        unit: "bunch",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
      {
        id: 3,
        name: "Brinjal (Eggplant)",
        price: 35,
        unit: "kg",
        image: "/placeholder.svg?height=200&width=200",
        organic: false,
      },
      {
        id: 4,
        name: "Bitter Gourd",
        price: 45,
        unit: "kg",
        image: "/placeholder.svg?height=200&width=200",
        organic: true,
      },
    ],
    gallery: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    story:
      "I come from a long line of farmers who have tilled this land for generations. My grandfather started with traditional farming methods, and my father introduced organic practices in the 1980s, well before it became popular. I took over the farm in 2010 and have been expanding our organic production ever since.\n\nWe believe in working with nature, not against it. Our farming practices focus on soil health, biodiversity, and water conservation. We use natural pest control methods and make our own compost from farm waste.\n\nOur mission is to provide healthy, nutritious food to our community while preserving the environment for future generations.",
  }

  if (!farmer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Farmer not found</h1>
          <p className="mt-4">The farmer profile you are looking for does not exist.</p>
          <Link href="/marketplace">
            <Button className="mt-4">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="relative h-64 w-full md:h-80">
        <Image
          src={farmer.coverImage || "/placeholder.svg"}
          alt={`${farmer.farm} cover image`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link href="/marketplace" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="relative -mt-20 mb-8 flex flex-col items-center md:flex-row md:items-end">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white md:h-40 md:w-40">
            <Image src={farmer.image || "/placeholder.svg"} alt={farmer.name} fill className="object-cover" />
          </div>
          <div className="mt-4 text-center md:ml-6 md:text-left">
            <h1 className="text-3xl font-bold">{farmer.name}</h1>
            <h2 className="text-xl font-semibold text-gray-700">{farmer.farm}</h2>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <Badge className="bg-green-600">{farmer.specialty}</Badge>
              {farmer.certifications.map((cert, i) => (
                <Badge key={i} variant="outline">
                  {cert}
                </Badge>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm text-gray-600 md:justify-start">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {farmer.location}
              </div>
              <div className="flex items-center gap-1">
                <span>Since {farmer.since}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(farmer.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span>
                  {farmer.rating} ({farmer.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="about">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="gallery">Farm Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold">Our Story</h3>
                  <div className="mt-4 whitespace-pre-line text-gray-700">{farmer.story}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Farm Details</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-700">{farmer.description}</p>
                    <div>
                      <h4 className="font-medium">Farming Practices:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                        <li>Organic cultivation without synthetic pesticides</li>
                        <li>Natural composting and soil enrichment</li>
                        <li>Water conservation through drip irrigation</li>
                        <li>Crop rotation to maintain soil health</li>
                        <li>Integrated pest management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="products" className="mt-6">
              <h3 className="text-xl font-semibold">Available Products</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {farmer.products.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.organic && <Badge className="absolute top-2 left-2 bg-green-600">Organic</Badge>}
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{product.name}</h4>
                        <div className="mt-1 flex items-baseline justify-between">
                          <span className="font-bold">₹{product.price}</span>
                          <span className="text-sm text-gray-500">per {product.unit}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="gallery" className="mt-6">
              <h3 className="text-xl font-semibold">Farm Gallery</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {farmer.gallery.map((image, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Farm gallery image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">Excellent quality produce</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    I've been buying vegetables from Rajesh's farm for over a year now. The quality is consistently
                    excellent, and you can really taste the difference with organic produce.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">Anita K. - 2 weeks ago</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">Fresh and flavorful</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    The spinach and tomatoes I ordered were incredibly fresh and flavorful. Delivery was prompt too.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">Vikram S. - 1 month ago</div>
                </div>
                <Link href="#" className="inline-block text-sm text-green-600 hover:underline">
                  View all {farmer.reviews} reviews
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
