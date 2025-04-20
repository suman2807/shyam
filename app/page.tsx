import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CloudSun, MapPin, ShoppingBasket, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import WeatherWidget from "@/components/weather-widget"
import HowItWorks from "@/components/how-it-works"
import VoiceAssistantDemo from "@/components/voice-assistant-demo"
import MarketplacePreview from "@/components/marketplace-preview"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Empowering Indian Farmers for a Sustainable Future
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Krishi Jyothi connects small-scale farmers directly to consumers, cutting out middlemen and
                    leveraging AI for smarter farming decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup?type=farmer">
                    <Button className="bg-green-600 hover:bg-green-700">Join as a Farmer</Button>
                  </Link>
                  <Link href="/signup?type=consumer">
                    <Button variant="outline">Shop Local Produce</Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-green-600" />
                    <span>5,000+ Farmers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingBasket className="h-4 w-4 text-green-600" />
                    <span>25,000+ Products</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>28+ States</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Indian farmer in field with produce"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  How Krishi Jyothi Empowers Indian Farmers
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides tools and features that benefit both farmers and consumers, creating a
                  sustainable ecosystem for Indian agriculture.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <ShoppingBasket className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Direct Marketplace</h3>
                <p className="text-center text-gray-500">
                  Farmers list produce with transparent pricing, and consumers purchase directly, increasing farmer
                  earnings by 20-30%.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
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
                  className="h-12 w-12 text-green-600"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <h3 className="text-xl font-bold">AI Crop Doctor</h3>
                <p className="text-center text-gray-500">
                  Detects diseases from crop photos, provides remedies and alerts, reducing crop losses by 15%.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
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
                  className="h-12 w-12 text-green-600"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="M16 6h0" />
                  <path d="M18 12h0" />
                  <path d="M17.4 14.6h0" />
                  <path d="M13 12h0" />
                  <path d="M12 16h0" />
                  <path d="M9 12.75h0" />
                  <path d="M7 19c3 0 5-2 8-2 3 0 4 2 4 2" />
                </svg>
                <h3 className="text-xl font-bold">AI Crop Recommendation</h3>
                <p className="text-center text-gray-500">
                  Suggests profitable crops based on weather, soil, and market data, increasing farmer profits.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
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
                  className="h-12 w-12 text-green-600"
                >
                  <path d="M12 18v-6" />
                  <path d="M8 18v-1" />
                  <path d="M16 18v-3" />
                  <rect width="20" height="14" x="2" y="3" rx="2" />
                  <path d="M22 9H2" />
                </svg>
                <h3 className="text-xl font-bold">Multilingual Voice Assistant</h3>
                <p className="text-center text-gray-500">
                  Guides in Hindi, Tamil, and other languages, making the platform accessible to 60% of low-literacy
                  farmers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
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
                  className="h-12 w-12 text-green-600"
                >
                  <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
                  <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
                  <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
                  <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
                </svg>
                <h3 className="text-xl font-bold">Surplus Redistribution</h3>
                <p className="text-center text-gray-500">
                  Lists unsold produce for donation or discounted sale, reducing food waste by 10-20%.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <CloudSun className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Weather Integration</h3>
                <p className="text-center text-gray-500">
                  Provides localized weather updates and farming advice, cutting weather-related losses by 10%.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <HowItWorks />
          </div>
        </section>

        <section id="marketplace" className="py-16 md:py-24 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Marketplace</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Browse Local Indian Produce</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover fresh, seasonal products from farmers in your region across India.
                </p>
              </div>
            </div>
            <MarketplacePreview />
            <div className="flex justify-center mt-8">
              <Link href="/marketplace">
                <Button className="bg-green-600 hover:bg-green-700">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="ai-tools" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  AI-Powered Tools
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Smart Farming with AI</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI tools help farmers make better decisions, detect crop diseases, and maximize profits.
                </p>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border overflow-hidden">
                <div className="bg-green-600 text-white p-4">
                  <h3 className="text-xl font-bold">AI Crop Doctor</h3>
                  <p className="mt-1 text-green-50">Detect diseases and get treatment recommendations</p>
                </div>
                <div className="p-6">
                  <div className="aspect-video relative rounded-lg overflow-hidden border mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="AI Crop Doctor Demo"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link href="/tools/crop-doctor">
                        <Button className="bg-green-600 hover:bg-green-700">Try Crop Doctor</Button>
                      </Link>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-100 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Take or upload a photo of your crop</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-100 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>AI analyzes the image to detect diseases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-100 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Get treatment recommendations and preventive measures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-100 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Works offline for areas with limited connectivity</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <div className="bg-green-600 text-white p-4">
                  <h3 className="text-xl font-bold">AI Crop & Price Recommendation</h3>
                  <p className="mt-1 text-green-50">Get personalized crop suggestions for maximum profit</p>
                </div>
                <div className="p-6">
                  <div className="aspect-video relative rounded-lg overflow-hidden border mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="AI Crop Recommendation Demo"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link href="/tools/crop-recommendation">
                        <Button className="bg-green-600 hover:bg-green-700">Get Recommendations</Button>
                      </Link>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-100 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Enter your location and soil details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-100 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>AI analyzes weather patterns and market trends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-100 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Receive crop recommendations with expected yield and prices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-100 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Make data-driven decisions for better profits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="voice-assistant" className="py-16 md:py-24 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  Voice Assistant
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Multilingual Voice Support</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Navigate Krishi Jyothi in your preferred language with our voice assistant.
                </p>
              </div>
            </div>
            <VoiceAssistantDemo />
          </div>
        </section>

        <section id="weather" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  Weather Integration
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Local Weather & Farming Tips</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get real-time weather updates and farming advice tailored to your location in India.
                </p>
              </div>
            </div>
            <WeatherWidget />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to join India's sustainable food movement?
                  </h2>
                  <p className="max-w-[600px] md:text-xl/relaxed">
                    Sign up today to start buying directly from local Indian farmers or selling your produce to
                    conscious consumers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup?type=farmer">
                    <Button className="bg-white text-green-600 hover:bg-gray-100">Join as a Farmer</Button>
                  </Link>
                  <Link href="/signup?type=consumer">
                    <Button variant="outline" className="text-white border-white hover:bg-green-700">
                      Shop Local Produce
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Indian farmers market with fresh produce"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
