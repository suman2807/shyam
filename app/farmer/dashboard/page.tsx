"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BarChart3, Box, Edit, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-context"
import { useToast } from "@/hooks/use-toast"

// Sample product data for demonstration
const sampleProducts = [
  {
    id: 101,
    name: "Organic Tomatoes",
    price: 60,
    unit: "kg",
    stock: 150,
    image: "/placeholder.svg?height=200&width=200",
    organic: true,
    category: "vegetables",
    listed: true,
    sales: 45,
  },
  {
    id: 102,
    name: "Fresh Spinach",
    price: 40,
    unit: "bunch",
    stock: 75,
    image: "/placeholder.svg?height=200&width=200",
    organic: true,
    category: "vegetables",
    listed: true,
    sales: 32,
  },
  {
    id: 103,
    name: "Alphonso Mangoes",
    price: 350,
    unit: "dozen",
    stock: 25,
    image: "/placeholder.svg?height=200&width=200",
    organic: true,
    category: "fruits",
    listed: true,
    sales: 18,
  },
  {
    id: 104,
    name: "Basmati Rice",
    price: 150,
    unit: "kg",
    stock: 200,
    image: "/placeholder.svg?height=200&width=200",
    organic: false,
    category: "grains",
    listed: false,
    sales: 0,
  },
]

// Sample order data
const sampleOrders = [
  {
    id: 1001,
    date: "2025-06-15",
    customer: "Amit Sharma",
    items: [
      { name: "Organic Tomatoes", quantity: 5, price: 60 },
      { name: "Fresh Spinach", quantity: 2, price: 40 },
    ],
    total: 380,
    status: "Delivered",
  },
  {
    id: 1002,
    date: "2025-06-14",
    customer: "Priya Patel",
    items: [{ name: "Alphonso Mangoes", quantity: 1, price: 350 }],
    total: 350,
    status: "Processing",
  },
  {
    id: 1003,
    date: "2025-06-12",
    customer: "Rahul Verma",
    items: [
      { name: "Organic Tomatoes", quantity: 3, price: 60 },
      { name: "Basmati Rice", quantity: 2, price: 150 },
    ],
    total: 480,
    status: "Delivered",
  },
]

export default function FarmerDashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState(sampleProducts)
  const [orders, setOrders] = useState(sampleOrders)
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    activeListings: 0,
  })

  // Redirect if not logged in or not a farmer
  useEffect(() => {
    if (!isLoading && (!user || user.userType !== "farmer")) {
      toast({
        title: "Access denied",
        description: "You must be logged in as a farmer to access this page.",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [user, isLoading, router, toast])

  // Calculate dashboard stats
  useEffect(() => {
    if (products && orders) {
      setStats({
        totalSales: orders.reduce((sum, order) => sum + order.total, 0),
        totalOrders: orders.length,
        totalProducts: products.length,
        activeListings: products.filter((p) => p.listed).length,
      })
    }
  }, [products, orders])

  /**
   * Deletes a product from the inventory.
   *
   * @param {number} productId - The ID of the product to delete.
   * @throws Will throw an error if the product with the specified ID does not exist.
   */
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId))
    toast({
      title: "Product deleted",
      description: "The product has been removed from your inventory.",
    })
  }

  /**
   * Toggles the listing status of a product by its ID.
   *
   * @param {number} productId - The unique identifier of the product to toggle.
   * @returns {void}
   *
   * @example
   * // Toggle the product with ID 123
   * handleToggleProductListing(123);
   */
  const handleToggleProductListing = (productId) => {
    setProducts(
      products.map((product) => (product.id === productId ? { ...product, listed: !product.listed } : product)),
    )

    const product = products.find((p) => p.id === productId)
    toast({
      title: product.listed ? "Product unlisted" : "Product listed",
      description: product.listed
        ? "The product has been removed from the marketplace."
        : "The product is now visible in the marketplace.",
    })
  }

  // Show loading state
  if (isLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          <p className="text-gray-600">Manage your products, orders, and farm profile</p>
        </div>
        <Link href="/farmer/add-product">
          <Button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <h3 className="text-2xl font-bold">₹{stats.totalSales.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Box className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-amber-600"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Listings</p>
                <h3 className="text-2xl font-bold">{stats.activeListings}</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-purple-600"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="m9 8 2 2-2 2" />
                  <path d="m13 12 2 2-2 2" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Your Products</CardTitle>
              <CardDescription>Manage your product listings and inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Product</th>
                      <th className="text-left py-3 px-2">Price</th>
                      <th className="text-left py-3 px-2">Stock</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          ₹{product.price}/{product.unit}
                        </td>
                        <td className="py-3 px-2">
                          {product.stock} {product.unit}
                        </td>
                        <td className="py-3 px-2">
                          {product.listed ? (
                            <Badge className="bg-green-600">Listed</Badge>
                          ) : (
                            <Badge variant="outline">Unlisted</Badge>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/farmer/edit-product/${product.id}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleToggleProductListing(product.id)}>
                              {product.listed ? (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="m3 3 18 18" />
                                  </svg>
                                  <span className="sr-only">Unlist</span>
                                </>
                              ) : (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  <span className="sr-only">List</span>
                                </>
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">Showing {products.length} products</p>
              <Link href="/farmer/add-product">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>View and manage orders from customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Order ID</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Customer</th>
                      <th className="text-left py-3 px-2">Items</th>
                      <th className="text-left py-3 px-2">Total</th>
                      <th className="text-left py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-2">#{order.id}</td>
                        <td className="py-3 px-2">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="py-3 px-2">{order.customer}</td>
                        <td className="py-3 px-2">
                          <ul className="text-sm">
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.quantity} × {item.name}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-2">₹{order.total}</td>
                        <td className="py-3 px-2">
                          <Badge
                            className={
                              order.status === "Delivered"
                                ? "bg-green-600"
                                : order.status === "Processing"
                                  ? "bg-amber-500"
                                  : "bg-blue-600"
                            }
                          >
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>View your sales performance and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto h-12 w-12 text-gray-400"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Detailed analytics will be available once you have more sales data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
