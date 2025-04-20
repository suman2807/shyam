"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Camera, Upload, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function CropDoctorPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upload")
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const [cameraPermission, setCameraPermission] = useState(null)

  // Sample disease data for demonstration
  const diseaseDatabase = {
    tomato_late_blight: {
      name: "Late Blight",
      crop: "Tomato",
      description: "A serious disease caused by the fungus-like oomycete pathogen Phytophthora infestans.",
      symptoms: [
        "Water-soaked spots on leaves that quickly turn brown",
        "White fuzzy growth on the underside of leaves",
        "Dark brown lesions on stems",
        "Firm, dark, greasy-looking lesions on fruits",
      ],
      treatment: [
        "Remove and destroy infected plant parts",
        "Apply copper-based fungicides as a preventative measure",
        "Ensure good air circulation between plants",
        "Avoid overhead irrigation",
      ],
      preventiveMeasures: [
        "Use resistant varieties when available",
        "Practice crop rotation",
        "Avoid planting in areas with poor drainage",
        "Space plants properly for good air circulation",
      ],
    },
    rice_blast: {
      name: "Rice Blast",
      crop: "Rice",
      description: "A fungal disease caused by Magnaporthe oryzae that affects rice crops worldwide.",
      symptoms: [
        "Diamond-shaped lesions with gray centers on leaves",
        "Brown to black spots on stems and leaf collars",
        "Infected grains become discolored and may break easily",
      ],
      treatment: [
        "Apply fungicides containing tricyclazole or azoxystrobin",
        "Maintain proper water management in paddy fields",
        "Remove and destroy infected plants",
      ],
      preventiveMeasures: [
        "Plant resistant varieties",
        "Use balanced fertilization (avoid excessive nitrogen)",
        "Maintain proper spacing between plants",
        "Practice field sanitation",
      ],
    },
    wheat_rust: {
      name: "Wheat Rust",
      crop: "Wheat",
      description: "A fungal disease that appears as rusty spots on wheat plants, caused by Puccinia species.",
      symptoms: [
        "Orange-brown pustules on leaves and stems",
        "Yellow discoloration around pustules",
        "Reduced grain filling and yield",
      ],
      treatment: [
        "Apply fungicides containing tebuconazole or propiconazole",
        "Time applications based on disease forecasting systems",
        "Remove alternate hosts (like barberry) from nearby areas",
      ],
      preventiveMeasures: [
        "Plant resistant varieties",
        "Early planting to avoid peak rust season",
        "Monitor fields regularly for early detection",
        "Rotate crops to break disease cycle",
      ],
    },
  }

  /**
   * Handles file change events to update image and preview URL.
   *
   * @param {Event} e - The file input change event object.
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setResult(null)
    }
  }

  /**
   * Handles the dragover event for elements that support it.
   *
   * @param {Event} e - The dragover event object.
   * @throws {Error} If the event is not a valid DragEvent.
   */
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  /**
   * Handles file drop events to process image files.
   *
   * @param {Event} e - The drag event object containing the dropped files.
   */
  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setResult(null)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      })
    }
  }

  /**
   * Asynchronously starts accessing the camera using the MediaDevices API.
   *
   * This function attempts to open the user's webcam and set it as the source for a video element.
   * If successful, it updates the state variables to reflect that the camera is active,
   * permission has been granted, and there are no errors. If an error occurs during
   * access, it logs the error to the console, sets the appropriate state variables,
   * and displays a toast notification informing the user to allow camera access.
   *
   * @async
   * @function startCamera
   * @throws {Error} - Throws an error if the camera access is denied or fails.
   */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setCameraError(false)
        setCameraPermission(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError(true)
      setCameraPermission(false)
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use this feature.",
        variant: "destructive",
      })
    }
  }

  /**
   * Stops the camera stream by stopping all tracks and setting the source object to null.
   *
   * @function stopCamera
   */
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  /**
   * Captures an image from a video element and converts it to a Blob, then creates a File object from the Blob.
   *
   * @returns {void}
   * @throws {Error} - Throws an error if videoRef or canvasRef is not defined.
   */
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw the current video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" })
        setImage(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setResult(null)
      })

      // Stop the camera after capturing
      stopCamera()
    }
  }

  /**
   * Analyzes an image to detect a disease.
   *
   * This function checks if an image is selected. If not, it shows a toast notification
   * and returns early. Otherwise, it sets the analyzing state to true and simulates an API call
   * using setTimeout. During the simulation, it randomly selects a disease from the database
   * and sets the analysis result with a random confidence level. After the simulation,
   * it updates the analyzing state to false and shows a toast notification indicating
   * the completion of the analysis.
   *
   * @return {void} This function does not return anything.
   */
  const analyzeImage = () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload or capture an image first.",
        variant: "destructive",
      })
      return
    }

    setAnalyzing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, randomly select a disease from our database
      const diseases = Object.keys(diseaseDatabase)
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)]

      setResult({
        disease: diseaseDatabase[randomDisease],
        confidence: Math.floor(Math.random() * 30) + 70, // Random confidence between 70-99%
      })

      setAnalyzing(false)

      toast({
        title: "Analysis complete",
        description: `Detected: ${diseaseDatabase[randomDisease].name} on ${diseaseDatabase[randomDisease].crop}`,
      })
    }, 2000)
  }

  /**
   * Resets the analysis state by clearing image, preview URL, result, and file input value.
   *
   * @returns {void}
   */
  const resetAnalysis = () => {
    setImage(null)
    setPreviewUrl(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">AI Crop Doctor</h1>
          <p className="mt-2 text-gray-600">
            Upload or capture a photo of your crop to identify diseases and get treatment recommendations
          </p>
        </div>

        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="camera">Use Camera</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload an Image</CardTitle>
                <CardDescription>
                  Upload a clear photo of the affected plant part (leaf, stem, fruit, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!previewUrl ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-4 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                    <p className="mt-2 text-xs text-gray-500">Supports: JPG, PNG, WEBP (max 10MB)</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Uploaded crop image"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={resetAnalysis}>
                        Upload Different Image
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={analyzeImage} disabled={analyzing}>
                        {analyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Image"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="camera">
            <Card>
              <CardHeader>
                <CardTitle>Capture an Image</CardTitle>
                <CardDescription>
                  Use your device's camera to take a clear photo of the affected plant part
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cameraPermission === false ? (
                  <div className="p-6 text-center bg-red-50 rounded-lg">
                    <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-2" />
                    <h3 className="text-lg font-medium text-red-800">Camera Access Denied</h3>
                    <p className="mt-2 text-sm text-red-600">
                      Please allow camera access in your browser settings to use this feature.
                    </p>
                    <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setCameraPermission(null)}>
                      Try Again
                    </Button>
                  </div>
                ) : cameraActive ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-black">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-contain" />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={stopCamera}>
                        Cancel
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={captureImage}>
                        Capture Photo
                      </Button>
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                ) : previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Captured crop image"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={resetAnalysis}>
                        Take Different Photo
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={analyzeImage} disabled={analyzing}>
                        {analyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Image"
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={startCamera}
                  >
                    <Camera className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-4 text-sm text-gray-600">Click to activate your camera</p>
                    <p className="mt-2 text-xs text-gray-500">You'll need to grant camera permission</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {result && (
          <Card className="mt-8">
            <CardHeader className="bg-green-50">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Diagnosis Result</CardTitle>
                  <CardDescription className="mt-1">
                    Analysis completed with {result.confidence}% confidence
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-700">{result.disease.name}</h3>
                  <p className="text-sm text-gray-500">Affecting: {result.disease.crop}</p>
                  <p className="mt-2">{result.disease.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Symptoms</h4>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                    {result.disease.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Recommended Treatment</h4>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                    {result.disease.treatment.map((treatment, index) => (
                      <li key={index}>{treatment}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Preventive Measures</h4>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                    {result.disease.preventiveMeasures.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={resetAnalysis} className="w-full sm:w-auto">
                Analyze Another Image
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">Save to My Records</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Get Expert Help
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="mt-8 p-4 bg-amber-50 rounded-lg">
          <h3 className="font-medium text-amber-800">Important Note</h3>
          <p className="mt-2 text-sm text-amber-700">
            This AI tool provides preliminary diagnosis only. For critical crop issues, please consult with a local
            agricultural extension officer or plant pathologist for confirmation and specific treatment recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
