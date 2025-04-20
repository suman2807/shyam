"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage({ params }) {
  const { id } = params
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  // In a real application, you would fetch this data from an API
  const product = {
    id: Number.parseInt(id),
    name: "Organic Alphonso Mangoes",
    price: 350,
    unit: "dozen",
    farmer: {
      name: "Ratnagiri Farms",
      location: "Maharashtra",
      id: 5,
    },
    image: "/placeholder.svg?height=600&width=600",
    gallery: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    organic: true,
    rating: 4.8,
    reviews: 124,
    description:
      "Premium quality Alphonso mangoes from the Ratnagiri region of Maharashtra. Known for their exceptional sweetness, rich flavor, and smooth texture. These mangoes are organically grown without the use of harmful pesticides or chemicals.",
    details: [
      "Harvested at peak ripeness",
      "Carefully hand-picked to prevent bruising",
      "Naturally ripened (no artificial ripening agents)",
      "Rich in vitamins A and C",
      "Seasonal availability: April to June",
    ],
    shipping: "Ships within 24 hours. Delivery in 2-3 days depending on your location.",
    inStock: true,
  }

  /**
   * Handles changes to the quantity.
   *
   * @param {number} change - The amount by which the quantity should change.
   * @return {void}
   */
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  /**
   * Handles the logic for adding a product to the cart.
   *
   * This function triggers a toast notification with details about the product being added,
   * including the quantity and the product's name. The message displayed varies based on whether
   * one or multiple dozens of the product are being added.
   */
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? "dozen" : "dozens"} of ${product.name} added to your cart.`,
    })
  }

  /**
   * Handles the action of adding a product to the user's wishlist.
   *
   * This function triggers a toast notification indicating that a product has been successfully added to the wishlist. It uses the `toast` function from the library to display the message, which includes the name of the product being added.
   *
   * @returns {void}
   */
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-4">The product you are looking for does not exist.</p>
          <Link href="/marketplace">
            <Button className="mt-4">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/marketplace" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.organic && <Badge className="absolute top-4 left-4 bg-green-600">Organic</Badge>}
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {product.gallery.map((img, i) => (
              <div key={i} className="relative h-24 w-24 flex-shrink-0 cursor-pointer rounded-md border">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Link href={`/farmer/${product.farmer.id}`} className="text-sm text-green-600 hover:underline">
              {product.farmer.name}, {product.farmer.location}
            </Link>
            <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">₹{product.price}</span>
            <span className="text-gray-600">per {product.unit}</span>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 border-t border-b py-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-r-none"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex h-10 w-12 items-center justify-center border-y">{quantity}</div>
              <Button variant="outline" size="icon" className="rounded-l-none" onClick={() => handleQuantityChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              {product.inStock ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleAddToWishlist}>
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4" />
            <span>Free shipping on orders over ₹1000</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Product Specifications</h3>
            <ul className="list-inside list-disc space-y-2">
              {product.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="shipping" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Shipping Information</h3>
            <p>{product.shipping}</p>
            <h3 className="text-lg font-semibold">Return Policy</h3>
            <p>
              We want you to be completely satisfied with your purchase. If you receive damaged or spoiled products,
              please contact us within 24 hours of delivery for a replacement or refund.
            </p>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <div className="space-y-4">
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
                  <span className="font-medium">Excellent quality</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  These mangoes are absolutely delicious! Sweet, juicy, and perfectly ripened. Will definitely order
                  again.
                </p>
                <div className="mt-2 text-xs text-gray-500">Priya S. - 2 weeks ago</div>
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
                  <span className="font-medium">Good but packaging could be better</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  The mangoes taste amazing but a couple were slightly bruised during shipping. Otherwise very
                  satisfied.
                </p>
                <div className="mt-2 text-xs text-gray-500">Rahul M. - 1 month ago</div>
              </div>
              <Link href="#" className="inline-block text-sm text-green-600 hover:underline">
                View all {product.reviews} reviews
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
