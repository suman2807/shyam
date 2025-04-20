"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-context"
import { useAuth } from "@/components/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to checkout.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed shortly.",
      })
      clearCart()
      router.push("/orders")
      setIsCheckingOut(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/marketplace" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          Your Cart
        </h1>

        {items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="mt-4 text-xl font-medium">Your cart is empty</h2>
              <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/marketplace">
                <Button className="mt-6 bg-green-600 hover:bg-green-700">Browse Marketplace</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Cart ({items.length} items)</CardTitle>
                  <CardDescription>Review your items before checkout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">
                              from {item.farmerName}
                              {item.organic && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                  Organic
                                </span>
                              )}
                            </p>
                          </div>
                          <p className="font-medium">₹{item.price * item.quantity}</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                  <Link href="/marketplace">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{subtotal > 1000 ? "0.00" : "50.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{(subtotal * 0.05).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{(subtotal + (subtotal > 1000 ? 0 : 50) + subtotal * 0.05).toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
