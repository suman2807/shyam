"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageSquare, ThumbsUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function CommunitySection() {
  const { toast } = useToast()
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Best practices for organic pest control in tropical climate?",
      author: "Rajesh P.",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "2 days ago",
      replies: 12,
      likes: 24,
      liked: false,
      category: "Organic Farming",
    },
    {
      id: 2,
      title: "Dealing with monsoon season challenges",
      author: "Gurpreet S.",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "1 week ago",
      replies: 8,
      likes: 15,
      liked: false,
      category: "Climate Adaptation",
    },
    {
      id: 3,
      title: "Tips for extending your growing season in North India",
      author: "Lakshmi D.",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "3 days ago",
      replies: 5,
      likes: 10,
      liked: false,
      category: "Growing Techniques",
    },
  ])

  const events = [
    {
      id: 1,
      title: "Kisan Mela 2025",
      date: "June 15, 2025",
      location: "Community Center, Delhi",
      image: "/placeholder.svg?height=100&width=200",
      attendees: 450,
      registered: false,
    },
    {
      id: 2,
      title: "Sustainable Farming Conference",
      date: "July 8-10, 2025",
      location: "Agricultural Center, Bangalore",
      image: "/placeholder.svg?height=100&width=200",
      attendees: 320,
      registered: false,
    },
  ]

  const [eventsState, setEventsState] = useState(events)

  const handleLike = (discussionId) => {
    setDiscussions(
      discussions.map((discussion) => {
        if (discussion.id === discussionId) {
          const newLiked = !discussion.liked
          return {
            ...discussion,
            likes: newLiked ? discussion.likes + 1 : discussion.likes - 1,
            liked: newLiked,
          }
        }
        return discussion
      }),
    )
  }

  const handleRegister = (eventId) => {
    setEventsState(
      eventsState.map((event) => {
        if (event.id === eventId) {
          const newRegistered = !event.registered
          toast({
            title: newRegistered ? "Successfully registered" : "Registration cancelled",
            description: newRegistered
              ? `You have registered for ${event.title}`
              : `Your registration for ${event.title} has been cancelled`,
          })
          return {
            ...event,
            attendees: newRegistered ? event.attendees + 1 : event.attendees - 1,
            registered: newRegistered,
          }
        }
        return event
      }),
    )
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Community</div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Connect with Fellow Indian Farmers</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Share knowledge, ask questions, and build relationships with other farmers and consumers across India.
          </p>
        </div>
      </div>

      <Tabs defaultValue="discussions" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="discussions">
          <div className="grid gap-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">{discussion.title}</CardTitle>
                      <CardDescription>
                        <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mr-2">
                          {discussion.category}
                        </span>
                        {discussion.date}
                      </CardDescription>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={discussion.authorImage || "/placeholder.svg"} alt={discussion.author} />
                      <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {discussion.replies} replies
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 p-0"
                      onClick={() => handleLike(discussion.id)}
                    >
                      <ThumbsUp className={`h-4 w-4 ${discussion.liked ? "fill-green-600 text-green-600" : ""}`} />
                      {discussion.likes} likes
                    </Button>
                  </div>
                  <Link href={`/discussion/${discussion.id}`}>
                    <Button variant="ghost" size="sm">
                      View Discussion
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/new-discussion">
              <Button className="bg-green-600 hover:bg-green-700">Start a New Discussion</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <div className="grid gap-6 md:grid-cols-2">
            {eventsState.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative h-40">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
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
                        className="h-4 w-4 text-gray-500"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
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
                        className="h-4 w-4 text-gray-500"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className={`w-full ${event.registered ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    onClick={() => handleRegister(event.id)}
                  >
                    {event.registered ? "Cancel Registration" : "Register"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/events">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
