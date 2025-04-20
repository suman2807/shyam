"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-context"

/**
 * Represents the component responsible for rendering the signup page.
 *
 * This component handles user registration logic, including form validation,
 * password matching, and interaction with authentication services. It also
 * manages state to track user input and display notifications using a toast system.
 *
 * @returns {JSX.Element} - The JSX element representing the signup page.
 */
export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { signup, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "consumer",
  })

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "farmer" || type === "consumer") {
      setFormData((prev) => ({ ...prev, userType: type }))
    }
  }, [searchParams])

  /**
   * Handles changes in form data by updating the state with new values.
   *
   * @param {Event} e - The event object containing details of the change event.
   * @returns {void}
   *
   * @example
   * handleChange({ target: { name: 'username', value: 'JohnDoe' } });
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * Handles the radio button change event to update the user type in form data.
   *
   * @param {string} value - The new value of the selected radio button representing the user type.
   * @returns {void}
   */
  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }))
  }

  /**
   * Handles form submission for user registration.
   *
   * This function prevents the default form submission behavior,
   * validates if the entered passwords match, attempts to register
   * the user using the provided data, and displays appropriate toast messages
   * based on the outcome of the registration process.
   *
   * @async
   * @param {Event} e - The event object representing the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    try {
      const success = await signup(formData.name, formData.email, formData.password, formData.userType)

      if (success) {
        toast({
          title: "Account created successfully",
          description: "Welcome to FarmLink India!",
        })
        router.push("/")
      } else {
        toast({
          title: "Registration failed",
          description: "This email is already registered. Please try another one.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Leaf className="h-6 w-6 text-green-600" />
        <span className="text-xl font-bold">FarmLink India</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Join FarmLink India to connect with farmers and consumers</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup
                value={formData.userType}
                onValueChange={handleRadioChange}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="farmer" id="farmer" />
                  <Label htmlFor="farmer">Farmer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consumer" id="consumer" />
                  <Label htmlFor="consumer">Consumer</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
