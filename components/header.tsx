"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-context"
import { useCart } from "@/components/cart-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Crop Doctor", href: "/tools/crop-doctor" },
    { name: "Crop Recommendation", href: "/tools/crop-recommendation" },
    { name: "News", href: "/news" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-green-600"
            >
              <path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.65 7.5 6.04 8.8.76.33 1.74-.05 1.96-.85V14a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v4.24a7 7 0 0 1-1.8-1.28c-.5-.56-1.03-1.47-1.41-2.48-.38-1-.59-2.06-.59-3.24a6 6 0 0 1 12 0c0 1.18-.21 2.24-.59 3.24-.38 1.01-.91 1.92-1.42 2.48-.5.55-1 .97-1.8 1.28V14a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v5.95c.22.8 1.2 1.18 1.96.85 3.39-1.3 6.04-4.63 6.04-8.8a9 9 0 0 0-9-9z"></path>
            </svg>
            <span className="text-xl font-bold">Krishi Jyothi</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                isActive(item.href) ? "text-green-600" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {user.userType === "farmer" && (
                  <DropdownMenuItem asChild>
                    <Link href="/farmer/dashboard">Farmer Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" className="hidden md:flex">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-green-600 hover:bg-green-700">Sign up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-green-600"
                    >
                      <path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.65 7.5 6.04 8.8.76.33 1.74-.05 1.96-.85V14a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v4.24a7 7 0 0 1-1.8-1.28c-.5-.56-1.03-1.47-1.41-2.48-.38-1-.59-2.06-.59-3.24a6 6 0 0 1 12 0c0 1.18-.21 2.24-.59 3.24-.38 1.01-.91 1.92-1.42 2.48-.5.55-1 .97-1.8 1.28V14a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v5.95c.22.8 1.2 1.18 1.96.85 3.39-1.3 6.04-4.63 6.04-8.8a9 9 0 0 0-9-9z"></path>
                    </svg>
                    <span className="text-xl font-bold">Krishi Jyothi</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 py-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg font-medium transition-colors hover:text-green-600 ${
                        isActive(item.href) ? "text-green-600" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t pt-4">
                  {!user && (
                    <div className="flex flex-col gap-2">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Log in
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-green-600 hover:bg-green-700">Sign up</Button>
                      </Link>
                    </div>
                  )}
                  {user && (
                    <div className="flex flex-col gap-2">
                      <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          My Profile
                        </Button>
                      </Link>
                      <Button className="w-full" onClick={logout}>
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
