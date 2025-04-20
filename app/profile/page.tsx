"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Edit, MapPin, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    location: "",
    bio: "",
  })

  // Redirect if not logged in
  if (!isLoading && !user) {
    router.push("/login")
    return null
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

  /**
   * Toggles the editing state of the profile form.
   *
   * If not currently editing, initializes the form with the current user data.
   * Then toggles the `isEditing` state to switch between edit and non-edit modes.
   */
  const handleEditToggle = () => {
    if (!isEditing) {
      // Initialize form with current user data
      setProfileData({
        name: user.name,
        location: user.location || "",
        bio: user.bio || "",
      })
    }
    setIsEditing(!isEditing)
  }

  /**
   * Handles input changes by updating the state of profileData with the new value.
   *
   * @param {Event} e - The event object containing the details of the input change.
   * @throws {Error} If the event does not contain target or if target does not have name and value properties.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * Handles the process of saving a user profile.
   *
   * This function simulates updating a user's profile by showing a toast message
   * indicating that the profile has been updated. It also sets the `isEditing` state to false,
   * assuming this is part of a larger application where users can edit their profiles.
   *
   * @function
   */
  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    })
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow">
                    <Image
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.userType === "farmer" ? "Farmer" : "Consumer"}</p>

                  <div className="mt-4 w-full space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{user.location || "Location not specified"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Joined {user.joinDate}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-6 w-full" onClick={handleEditToggle}>
                    {isEditing ? (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Cancel Editing
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      {isEditing ? "Edit your profile information below" : "View and manage your profile information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., Mumbai, Maharashtra"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell us about yourself..."
                            className="w-full min-h-[100px] p-2 border rounded-md"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                          <p>{user.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email</h3>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Location</h3>
                          <p>{user.location || "Not specified"}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                          <p>{user.bio || "No bio provided"}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View your past orders and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't placed any orders yet.</p>
                      <Link href="/marketplace">
                        <Button className="mt-4 bg-green-600 hover:bg-green-700">Browse Marketplace</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          defaultChecked
                        />
                        <label htmlFor="email-notifications" className="text-sm text-gray-700">
                          Receive email notifications about orders and promotions
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="change-password">Password</Label>
                      <Button variant="outline" className="w-full">
                        Change Password
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
