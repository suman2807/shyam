import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-green-600"
              >
                <path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.65 7.5 6.04 8.8.76.33 1.74-.05 1.96-.85V14a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v4.24a7 7 0 0 1-1.8-1.28c-.5-.56-1.03-1.47-1.41-2.48-.38-1-.59-2.06-.59-3.24a6 6 0 0 1 12 0c0 1.18-.21 2.24-.59 3.24-.38 1.01-.91 1.92-1.42 2.48-.5.55-1 .97-1.8 1.28V14a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v5.95c.22.8 1.2 1.18 1.96.85 3.39-1.3 6.04-4.63 6.04-8.8a9 9 0 0 0-9-9z"></path>
              </svg>
              <span className="text-lg font-bold">Krishi Jyothi</span>
            </div>
            <p className="text-sm text-gray-500">
              Connecting Indian farmers directly to consumers for a sustainable future.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Platform</h3>
            <Link href="/marketplace" className="text-sm text-gray-500 hover:text-green-600">
              Marketplace
            </Link>
            <Link href="/tools/crop-doctor" className="text-sm text-gray-500 hover:text-green-600">
              Crop Doctor
            </Link>
            <Link href="/tools/crop-recommendation" className="text-sm text-gray-500 hover:text-green-600">
              Crop Recommendation
            </Link>
            <Link href="/news" className="text-sm text-gray-500 hover:text-green-600">
              Farmer News
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Company</h3>
            <Link href="/about" className="text-sm text-gray-500 hover:text-green-600">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-green-600">
              Contact
            </Link>
            <Link href="/careers" className="text-sm text-gray-500 hover:text-green-600">
              Careers
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Legal</h3>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-green-600">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-green-600">
              Privacy
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2025 Krishi Jyothi. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://facebook.com" className="text-gray-500 hover:text-green-600">
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
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://twitter.com" className="text-gray-500 hover:text-green-600">
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
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://instagram.com" className="text-gray-500 hover:text-green-600">
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
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
