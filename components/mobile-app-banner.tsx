import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MobileAppBanner() {
  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold">FarmLink Mobile App</h2>
          <p className="mt-4 text-green-50">
            Access all FarmLink features on the go with our mobile app. Perfect for farmers in the field or consumers on
            the move.
          </p>
          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-2">
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
                className="text-green-200"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Works offline for areas with limited connectivity</span>
            </li>
            <li className="flex items-center gap-2">
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
                className="text-green-200"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Voice commands in multiple Indian languages</span>
            </li>
            <li className="flex items-center gap-2">
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
                className="text-green-200"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Real-time notifications for orders and market updates</span>
            </li>
            <li className="flex items-center gap-2">
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
                className="text-green-200"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Crop Doctor camera integration for instant diagnosis</span>
            </li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/app/android">
              <Button className="bg-white text-green-700 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M5 12V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                  <path d="M5 12h14" />
                  <path d="M12 22v-10" />
                  <path d="M9 6v1" />
                  <path d="M15 6v1" />
                </svg>
                Android App
              </Button>
            </Link>
            <Link href="/app/ios">
              <Button className="bg-white text-green-700 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                  <path d="M10 2c1 .5 2 2 2 5" />
                </svg>
                iOS App
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-64 md:h-full">
          <Image src="/placeholder.svg?height=400&width=300" alt="FarmLink Mobile App" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-green-700/50 md:bg-transparent"></div>
        </div>
      </div>
    </div>
  )
}
