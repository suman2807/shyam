"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

/**
 * A functional component that provides crop recommendations based on user inputs such as location, soil type, and other agricultural factors.
 *
 * This component manages the state for loading status, results, and form data, and handles user input changes.
 * It simulates an API call to fetch crop recommendations based on the selected state and soil type.
 *
 * @returns {JSX.Element} The rendered component containing the crop recommendation form and results.
 */
export default function CropRecommendationPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formData, setFormData] = useState({
    location: "",
    state: "Maharashtra",
    soilType: "clay_loam",
    landSize: 2,
    irrigationAccess: "yes",
    budget: "medium",
    // Advanced options
    nitrogen: 80,
    phosphorus: 50,
    potassium: 40,
    ph: 6.5,
    rainfall: 100,
  })

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]

  const soilTypes = [
    { value: "clay", label: "Clay" },
    { value: "sandy", label: "Sandy" },
    { value: "loamy", label: "Loamy" },
    { value: "clay_loam", label: "Clay Loam" },
    { value: "sandy_loam", label: "Sandy Loam" },
    { value: "silt_loam", label: "Silt Loam" },
    { value: "black_soil", label: "Black Soil (Regur)" },
    { value: "red_soil", label: "Red Soil" },
    { value: "alluvial", label: "Alluvial Soil" },
  ]

  // Sample crop recommendation data
  const cropRecommendations = {
    "Maharashtra": {
      "clay_loam": [
        {
          name: "Cotton",
          suitability: 92,
          expectedYield: "25-30 quintals/hectare",
          marketPrice: "₹6,000-7,000/quintal",
          estimatedProfit: "₹1,20,000/hectare",
          season: "Kharif",
          waterRequirement: "Medium",
          investment: "Medium",
          description: "Cotton thrives in clay loam soil with good water retention. Maharashtra is a leading cotton producer with established markets.",
          tips: [
            "Use BT cotton varieties for better pest resistance",
            "Implement drip irrigation to optimize water usage",
            "Consider intercropping with moong or urad for additional income"
          ],
          image: "/placeholder.svg?height=200&width=300"
        },
        {
          name: "Soybean",
          suitability: 88,
          expectedYield: "20-25 quintals/hectare",
          marketPrice: "₹4,000-4,500/quintal",
          estimatedProfit: "₹80,000/hectare",
          season: "Kharif",
          waterRequirement: "Low to Medium",
          investment: "Low",
          description: "Soybean is well-suited to Maharashtra's climate and clay loam soils. It's a low-investment crop with good returns.",
          tips: [
            "Use rhizobium culture for seed treatment to improve nitrogen fixation",
            "Maintain proper spacing of 45x5 cm for optimal growth",
            "Consider early maturing varieties to avoid late-season drought"
          ],
          image: "/placeholder.svg?height=200&width=300"
        },
        {
          name: "Turmeric",
          suitability: 85,
          expectedYield: "20-25 tonnes/hectare",
          marketPrice: "₹7,000-9,000/quintal",
          estimatedProfit: "₹1,40,000/hectare",
          season: "Kharif",
          waterRequirement: "Medium to High",
          investment: "High",
          description: "Turmeric grows well in well-drained clay loam soils. Maharashtra's climate is ideal for high-quality turmeric production.",
          tips: [
            "Use raised beds for better drainage in heavy rainfall areas",
            "Apply organic mulch to conserve soil moisture",
            "Consider processing into powder for value addition"
          ],
          image: "/placeholder.svg?height=200&width=300"
        }
      ]
    }
  }

  /**
   * Handles input changes by updating the form data state.
   *
   * @param {Event} e - The event object containing information about the input change.
   * @returns {void}
   * @example
   * <input type="text" name="username" onChange={handleInputChange} />
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  /**
   * Handles the change event of a select input field.
   *
   * @param {string} name - The name attribute of the select input field.
   * @param {*} value - The selected value from the select input field.
   */
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  /**
   * Handles the change event of a slider input.
   *
   * @param {string} name - The name or identifier of the slider.
   * @param {Array<number>} value - An array containing the new value of the slider.
   */
  const handleSliderChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }))
  }

  /**
   * Handles form submission by preventing default form behavior,
   * initiating loading state, simulating an API call to fetch crop recommendations based on form data,
   * updating results state, and showing a toast notification upon completion.
   *
   * @param {Event} e - The event object representing the form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, use our sample data
      const stateData = cropRecommendations[formData.state] || cropRecommendations["Maharashtra"]
      const soilData = stateData[formData.soilType] || stateData["clay_loam"]
      
      setResults(soilData)
      setLoading(false)
      
      toast({
        title: "Analysis complete",
        description: "Here are your crop recommendations based on your inputs.",
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">AI Crop & Price Recommendation</h1>
          <p className="mt-2 text-gray-600">
            Get personalized crop recommendations based on your location, soil type, and other factors
          </p>
        </div>

        <Tabs defaultValue="recommendation">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="recommendation">Get Recommendations</TabsTrigger>
            <TabsTrigger value="history">My History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendation">
            {!results ? (
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Farm Details</CardTitle>
                  <CardDescription>
                    Provide information about your farm to get personalized crop recommendations
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location">Village/Town</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          placeholder="Enter your village or town" 
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select 
                          value={formData.state} 
                          onValueChange={(value) => handleSelectChange("state", value)}
                        >
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="soilType">Soil Type</Label>
                        <Select 
                          value={formData.soilType} 
                          onValueChange={(value) => handleSelectChange("soilType", value)}
                        >
                          <SelectTrigger id="soilType">
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                          <SelectContent>
                            {soilTypes.map((soil) => (
                              <SelectItem key={soil.value} value={soil.value}>{soil.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="landSize">Land Size (Hectares)</Label>
                        <Input 
                          id="landSize" 
                          name="landSize" 
                          type="number" 
                          min="0.1" 
                          step="0.1" 
                          value={formData.landSize}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="irrigationAccess">Irrigation Access</Label>
                        <Select 
                          value={formData.irrigationAccess} 
                          onValueChange={(value) => handleSelectChange("irrigationAccess", value)}
                        >
                          <SelectTrigger id="irrigationAccess">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes, reliable access</SelectItem>
                            <SelectItem value="limited">Limited access</SelectItem>
                            <SelectItem value="no">No irrigation (rain-fed only)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="budget">Investment Budget</Label>
                        <Select 
                          value={formData.budget} 
                          onValueChange={(value) => handleSelectChange("budget", value)}
                        >
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (Minimal investment)</SelectItem>
                            <SelectItem value="medium">Medium (Moderate investment)</SelectItem>
                            <SelectItem value="high">High (Can invest significantly)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                      >
                        {showAdvanced ? (
                          <>
                            <ChevronUp className="mr-2 h-4 w-4" />
                            Hide Advanced Options
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-2 h-4 w-4" />
                            Show Advanced Options
                          </>
                        )}
                      </Button>
                      
                      {showAdvanced && (
                        <div className="mt-6 space-y-6 border-t pt-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="nitrogen">Nitrogen (N) Level: {formData.nitrogen} kg/ha</Label>
                            </div>
                            <Slider
                              id="nitrogen"
                              min={0}
                              max={200}
                              step={1}
                              value={[formData.nitrogen]}
                              onValueChange={(value) => handleSliderChange("nitrogen", value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="phosphorus">Phosphorus (P) Level: {formData.phosphorus} kg/ha</Label>
                            </div>
                            <Slider
                              id="phosphorus"
                              min={0}
                              max={200}
                              step={1}
                              value={[formData.phosphorus]}
                              onValueChange={(value) => handleSliderChange("phosphorus", value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="potassium">Potassium (K) Level: {formData.potassium} kg/ha</Label>
                            </div>
                            <Slider
                              id="potassium"
                              min={0}
                              max={200}
                              step={1}
                              value={[formData.potassium]}
                              onValueChange={(value) => handleSliderChange("potassium", value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="ph">Soil pH: {formData.ph}</Label>
                            </div>
                            <Slider
                              id="ph"
                              min={4}
                              max={10}
                              step={0.1}
                              value={[formData.ph]}
                              onValueChange={(value) => handleSliderChange("ph", value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="rainfall">Average Monthly Rainfall: {formData.rainfall} mm</Label>
                            </div>
                            <Slider
                              id="rainfall"
                              min={0}
                              max={500}
                              step={10}
                              value={[formData.rainfall]}
                              onValueChange={(value) => handleSliderChange("rainfall", value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Get Recommendations'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            ) : (
              <div className="space-y-8">
                <Card className="bg-green-50">
                  <CardHeader>
                    <CardTitle>Your Crop Recommendations</CardTitle>
                    <CardDescription>
                      Based on your inputs for {formData.location}, {formData.state} with {soilTypes.find(s => s.value === formData.soilType)?.label} soil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Our AI has analyzed your farm details and local market conditions to recommend the most suitable crops for your situation.
                      These recommendations consider soil type, climate patterns, water availability, and potential profitability.
                    </p>
                  </CardContent>
                </Card>
                
                {results.map((crop, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image 
                          src={crop.image || "/placeholder.svg"} 
                          alt={crop.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold">{crop.name}</h3>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">Suitability:</span>
                            <div className="bg-gray-200 rounded-full h-2 w-24">
                              <div 
                                className="bg-green-600 rounded-full h-2" 
                                style={{ width: `${crop.suitability}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium">{crop.suitability}%</span>
                          </div>
                        </div>
                        
                        <p className="mt-2 text-gray-600">{crop.description}</p>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Expected Yield</span>
                            <p>{crop.expectedYield}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Market Price</span>
                            <p>{crop.marketPrice}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Estimated Profit</span>
                            <p className="text-green-700 font-medium">{crop.estimatedProfit}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Growing Season</span>
                            <p>{crop.season}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Water Requirement</span>
                            <p>{crop.waterRequirement}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Investment Level</span>
                            <p>{crop.investment}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-medium">Farming Tips:\
