"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/auth-context"
import { useToast } from "@/hooks/use-toast"

// Sample product data for demonstration
const sampleProducts = [
  {
    id: 101,
    name: "Organic Tomatoes",
    description: "Fresh, juicy organic tomatoes grown without pesticides. Perfect for salads and cooking.",
    price: 60,
    unit: "kg",
    stock: 150,
    image: "/placeholder.svg?height=200&width=200",
    organic: true,
    category: "vegetables",
    listed: true,
  },
  {
    id: 102,
    name: "Fresh Spinach",
    description: "Nutrient-rich organic spinach leaves. Locally grown and harvested daily.",
    price: 40,
    unit: "bunch",
    stock: 75,
    image: "/placeholder.svg?height=200&width=200",
    organic: true,
    category: "vegetables",
    listed: true,
  },
  {
    id: 103,
    name: "Alphonso Mangoes",
    description: "Premium Alphonso mangoes known for their exceptional sweetness and flavor.",
    price: 350,
    unit: "dozen",
    stock: 25,
    image: "/placeholder.svg?height=200&width=200",
    organic: true,
    category: "fruits",
    listed: true,
  },
  {
    id: 104,
    name: "Basmati Rice",
    description: "Aromatic long-grain basmati rice. Grown using traditional farming methods.",
    price: 150,
    unit: "kg",
    stock: 200,
    image: "/placeholder.svg?height=200&width=200",
    organic: false,
    category: "grains",
    listed: false,
  },
]

export default function EditProductPage({ params }) {
  const { id } = params
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unit: "kg",
    stock: "",
    organic: false,
    image: null,
    imagePreview: null,
    listed: true,
  })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

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

  // Load product data
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call to fetch the product
      // For demo purposes, we'll use the sample data
      const productId = Number.parseInt(id)
      const product = sampleProducts.find((p) => p.id === productId)

      if (product) {
        setFormData({
          name: product.name,
          description: product.description || "",
          category: product.category,
          price: product.price.toString(),
          unit: product.unit,
          stock: product.stock.toString(),
          organic: product.organic,
          image: null,
          imagePreview: product.image,
          listed: product.listed,
        })
      } else {
        toast({
          title: "Product not found",
          description: "The product you are trying to edit does not exist.",
          variant: "destructive",
        })
        router.push("/farmer/dashboard")
      }
      setLoading(false)
    }
  }, [id, router, toast])

  /**
   * Handles input change events to update form data state.
   *
   * @param {Event} e - The input event object containing the target element.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * Handles the change event of a checkbox input field.
   *
   * @param {boolean} checked - The current state of the checkbox (checked or unchecked).
   * @returns {void}
   *
   * Example usage:
   * handleCheckboxChange(true); // Sets the 'organic' property in formData to true
   */
  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      organic: checked,
    }))
  }

  /**
   * Handles changes in form data for select elements.
   *
   * @param {string} name - The name of the form field to update.
   * @param {*} value - The new value for the form field.
   * @returns {void}
   */
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * Handles the change event for an image input element, updating form data with the selected file and creating a preview URL.
   *
   * @param {Event} e - The change event object from the file input.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }))
    }
  }

  /**
   * Handles the form submission event.
   *
   * This function prevents the default form submission behavior,
   * validates the input data, simulates an API call (or real call in a production environment),
   * and updates the UI accordingly based on the success or failure of the operation.
   *
   * @param {Event} e - The form submission event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Validate form
      if (!formData.name || !formData.category || !formData.price || !formData.stock) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        setSubmitting(false)
        return
      }

      // In a real app, this would be an API call to update the product
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Product updated successfully",
        description: "Your product has been updated.",
      })

      router.push("/farmer/dashboard")
    } catch (error) {
      toast({
        title: "Error updating product",
        description: "There was a problem updating your product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Show loading state
  if (isLoading || loading) {
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
      <Link
        href="/farmer/dashboard"
        className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>Update your product information</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Organic Tomatoes"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product, including quality, freshness, etc."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="grains">Grains & Pulses</SelectItem>
                      <SelectItem value="dairy">Dairy Products</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organic">Organic Certification</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="organic" checked={formData.organic} onCheckedChange={handleCheckboxChange} />
                    <label
                      htmlFor="organic"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This product is organically grown
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)*</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit*</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleSelectChange("unit", value)} required>
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="g">Gram (g)</SelectItem>
                      <SelectItem value="dozen">Dozen</SelectItem>
                      <SelectItem value="piece">Piece</SelectItem>
                      <SelectItem value="bunch">Bunch</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Available Stock*</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  {formData.imagePreview ? (
                    <div className="relative aspect-square w-full max-w-[200px] mx-auto">
                      <img
                        src={formData.imagePreview || "/placeholder.svg"}
                        alt="Product preview"
                        className="rounded-lg object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => setFormData((prev) => ({ ...prev, image: null, imagePreview: null }))}
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div onClick={() => document.getElementById("image").click()}>
                      <Upload className="h-10 w-10 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Click to upload an image of your product</p>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  )}
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="listed">Listing Status</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="listed"
                    checked={formData.listed}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, listed: checked }))}
                  />
                  <label
                    htmlFor="listed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    List this product in the marketplace
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" asChild>
                <Link href="/farmer/dashboard">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={submitting}>
                {submitting ? "Updating Product..." : "Update Product"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
