import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FarmerStories() {
  const farmers = [
    {
      id: 1,
      name: "Rajesh Patel",
      farm: "Green Earth Organics",
      location: "Nashik, Maharashtra",
      description:
        "Third-generation farmer specializing in organic vegetables and sustainable farming practices using traditional methods.",
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Organic Vegetables",
      impact: "Increased income by 35% after joining FarmLink",
    },
    {
      id: 2,
      name: "Gurpreet Singh",
      farm: "Punjab Dairy Collective",
      location: "Amritsar, Punjab",
      description: "Family-owned dairy farm producing artisanal paneer, ghee and organic milk products since 1978.",
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Dairy Products",
      impact: "Reduced food waste by 25% through surplus redistribution",
    },
    {
      id: 3,
      name: "Lakshmi Devi",
      farm: "Southern Spice Gardens",
      location: "Coorg, Karnataka",
      description:
        "Specializing in spices and coffee grown using regenerative agriculture techniques passed down through generations.",
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Spices & Coffee",
      impact: "Saved crops worth ₹2 lakh using AI Crop Doctor",
    },
  ]

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {farmers.map((farmer) => (
        <Card key={farmer.id} className="overflow-hidden">
          <div className="relative h-64">
            <Image src={farmer.image || "/placeholder.svg"} alt={farmer.name} fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <Badge className="mb-2 bg-green-600">{farmer.specialty}</Badge>
            <h3 className="text-xl font-bold">{farmer.name}</h3>
            <h4 className="text-sm font-semibold text-gray-500">{farmer.farm}</h4>
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {farmer.location}
            </div>
            <p className="mt-2 text-sm text-gray-600">{farmer.description}</p>
            <div className="mt-3 p-2 bg-green-50 rounded-md text-sm text-green-700 font-medium">{farmer.impact}</div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/farmer/${farmer.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
