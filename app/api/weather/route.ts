import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")

    if (!location) {
      return NextResponse.json({ error: "Location parameter is required" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Call a weather API like OpenWeatherMap, AccuWeather, etc.
    // 2. Process the response
    // 3. Return the formatted data

    // For now, we'll return mock data based on the location
    const weatherData = getMockWeatherData(location)

    return NextResponse.json(weatherData, { status: 200 })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

function getMockWeatherData(location: string) {
  // Mock data for different Indian cities
  const data = {
    Mumbai: {
      current: {
        temp: 32,
        condition: "Partly Cloudy",
        humidity: 75,
        wind: 12,
        icon: "cloud-sun",
      },
      forecast: [
        { day: "Mon", temp: 33, icon: "sun" },
        { day: "Tue", temp: 32, icon: "cloud-sun" },
        { day: "Wed", temp: 31, icon: "cloud" },
        { day: "Thu", temp: 30, icon: "cloud-rain" },
        { day: "Fri", temp: 31, icon: "cloud-sun" },
      ],
      farmingTips: [
        "Consider early morning or evening irrigation to reduce water loss due to evaporation.",
        "Monitor for increased pest activity due to high humidity levels.",
        "Good time to plant leafy vegetables before the rain on Thursday.",
        "Ensure proper drainage systems are in place for the upcoming rainfall.",
      ],
    },
    Delhi: {
      current: {
        temp: 38,
        condition: "Sunny",
        humidity: 45,
        wind: 8,
        icon: "sun",
      },
      forecast: [
        { day: "Mon", temp: 39, icon: "sun" },
        { day: "Tue", temp: 40, icon: "sun" },
        { day: "Wed", temp: 39, icon: "sun" },
        { day: "Thu", temp: 37, icon: "cloud-sun" },
        { day: "Fri", temp: 36, icon: "cloud-sun" },
      ],
      farmingTips: [
        "Increase frequency of irrigation due to high temperatures.",
        "Consider shade cloth for sensitive crops to prevent sun damage.",
        "Early morning harvesting recommended to maintain produce freshness.",
        "Monitor soil moisture levels closely in these dry conditions.",
      ],
    },
    Bangalore: {
      current: {
        temp: 26,
        condition: "Pleasant",
        humidity: 65,
        wind: 10,
        icon: "cloud-sun",
      },
      forecast: [
        { day: "Mon", temp: 27, icon: "cloud-sun" },
        { day: "Tue", temp: 28, icon: "sun" },
        { day: "Wed", temp: 27, icon: "cloud-sun" },
        { day: "Thu", temp: 26, icon: "cloud" },
        { day: "Fri", temp: 25, icon: "cloud-rain" },
      ],
      farmingTips: [
        "Ideal conditions for planting most vegetables and flowering plants.",
        "Good time for grafting and propagation activities.",
        "Light irrigation recommended for established plants.",
        "Prepare for light rainfall expected by end of week.",
      ],
    },
    Kolkata: {
      current: {
        temp: 34,
        condition: "Humid",
        humidity: 80,
        wind: 6,
        icon: "cloud",
      },
      forecast: [
        { day: "Mon", temp: 34, icon: "cloud" },
        { day: "Tue", temp: 35, icon: "cloud-sun" },
        { day: "Wed", temp: 33, icon: "cloud-rain" },
        { day: "Thu", temp: 32, icon: "cloud-rain" },
        { day: "Fri", temp: 33, icon: "cloud" },
      ],
      farmingTips: [
        "High humidity may increase fungal disease risk - monitor crops closely.",
        "Consider fungicide application before expected rainfall.",
        "Ensure adequate spacing between plants for air circulation.",
        "Good time for rice paddy preparation with upcoming rain.",
      ],
    },
  }

  // Default to Mumbai if location not found
  return data[location] || data["Mumbai"]
}
