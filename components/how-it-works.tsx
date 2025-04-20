import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">How It Works</div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Process, Big Impact</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            FarmLink makes it easy for farmers to sell directly and for consumers to access fresh, local produce.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-green-600">For Farmers</h3>

          <div className="relative pl-8 pb-8 border-l border-green-200">
            <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-4 rounded-full bg-green-600 text-white font-bold">
              1
            </div>
            <h4 className="text-xl font-semibold">Create Your Profile</h4>
            <p className="mt-2 text-gray-600">
              Sign up and create your farm profile with details about your growing practices, location, and specialties.
            </p>
          </div>

          <div className="relative pl-8 pb-8 border-l border-green-200">
            <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-4 rounded-full bg-green-600 text-white font-bold">
              2
            </div>
            <h4 className="text-xl font-semibold">List Your Products</h4>
            <p className="mt-2 text-gray-600">
              Add your available produce with photos, descriptions, pricing, and quantities. Update as your inventory
              changes.
            </p>
          </div>

          <div className="relative pl-8 pb-8 border-l border-green-200">
            <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-4 rounded-full bg-green-600 text-white font-bold">
              3
            </div>
            <h4 className="text-xl font-semibold">Use AI Tools</h4>
            <p className="mt-2 text-gray-600">
              Leverage our AI Crop Doctor to detect diseases and get treatment recommendations. Get crop recommendations
              based on your soil and local conditions.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-4 rounded-full bg-green-600 text-white font-bold">
              4
            </div>
            <h4 className="text-xl font-semibold">Fulfill Orders</h4>
            <p className="mt-2 text-gray-600">
              Receive notifications when customers place orders. Arrange pickup or delivery based on your preferences.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-green-600">For Consumers</h3>

          <div className="relative pl-8 pb-8 border-l border-green-200">
            <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-4 rounded-full bg-green-600 text-white font-bold">
              1
            </div>
            <h4 className="text-xl font-semibold">Browse Local Farms</h4>
            <p className="mt-2 text-gray-600">
              Discover farms in your area, learn about their practices, and see what products they offer.
            </p>
          </div>

          <div className="relative pl-8 pb-8 border-l border-green-200">
            <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-4 rounded-full bg-green-600 text-white font-bold">
              2
            </div>
            <h4 className="text-xl font-semibold">Shop Fresh Products</h4>
            <p className="mt-2 text-gray-600">
              Add items to your cart from multiple farms and check out in one simple transaction.
            </p>
          </div>

          <div className="relative pl-8 pb-8 border-l border-green-200">
            <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-4 rounded-full bg-green-600 text-white font-bold">
              3
            </div>
            <h4 className="text-xl font-semibold">Support Surplus Redistribution</h4>
            <p className="mt-2 text-gray-600">
              Purchase surplus produce at discounted prices or help connect farmers with food banks to reduce waste.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 -translate-x-4 rounded-full bg-green-600 text-white font-bold">
              4
            </div>
            <h4 className="text-xl font-semibold">Pickup or Delivery</h4>
            <p className="mt-2 text-gray-600">
              Choose between farm pickup or local delivery options. Enjoy fresh, locally grown food while supporting
              farmers.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="max-w-2xl p-6 bg-white rounded-lg shadow-sm border text-center">
          <h3 className="text-xl font-bold">Ready to get started?</h3>
          <p className="mt-2 text-gray-600">
            Join our growing community of Indian farmers and conscious consumers making a difference in local food
            systems.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?type=farmer">
              <Button className="bg-green-600 hover:bg-green-700">
                Sign up as a Farmer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup?type=consumer">
              <Button variant="outline">
                Join as a Consumer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
