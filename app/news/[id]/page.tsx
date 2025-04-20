"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "Government announces new MSP for Kharif crops, 5% increase for paddy",
    summary:
      "The Cabinet Committee on Economic Affairs has approved new Minimum Support Prices (MSPs) for Kharif crops, with a significant increase for paddy and other essential crops to support farmers.",
    content: `
      <p>The Cabinet Committee on Economic Affairs (CCEA) has approved new Minimum Support Prices (MSPs) for Kharif crops for the marketing season 2025-26, with a significant 5% increase for paddy.</p>
      
      <p>The MSP for common grade paddy has been increased from ₹2,183 to ₹2,292 per quintal, while the MSP for Grade A paddy has been raised from ₹2,203 to ₹2,313 per quintal.</p>
      
      <p>The Agriculture Minister stated that this increase is part of the government's commitment to ensure remunerative prices for farmers and encourage crop diversification. The decision is expected to benefit millions of farmers across the country, particularly in states like Punjab, Haryana, Uttar Pradesh, and West Bengal.</p>
      
      <p>Other key crops that have seen MSP increases include:</p>
      <ul>
        <li>Jowar: ₹3,144 per quintal (up 4.5%)</li>
        <li>Bajra: ₹2,500 per quintal (up 4.8%)</li>
        <li>Maize: ₹2,090 per quintal (up 4.1%)</li>
        <li>Arhar (Tur): ₹7,000 per quintal (up 4.2%)</li>
        <li>Cotton: ₹6,620 per quintal (up 4.3%)</li>
      </ul>
      
      <p>Farmer organizations have welcomed the increase but some have expressed that the hike falls short of their expectations, particularly in light of rising input costs. The government has defended the increases, stating they ensure a return of at least 50% over the cost of production.</p>
      
      <p>The new MSPs will be effective from the upcoming Kharif marketing season starting in October 2025.</p>
    `,
    date: "2025-06-10",
    source: "Agriculture Today",
    author: "Rajiv Sharma",
    category: "Policy",
    image: "/placeholder.svg?height=500&width=800",
    relatedArticles: [5, 3],
  },
  {
    id: 2,
    title: "Monsoon forecast: IMD predicts above normal rainfall this season",
    summary:
      "The Indian Meteorological Department has released its seasonal forecast predicting above-normal rainfall during the upcoming monsoon season, bringing relief to farmers across the country.",
    content: `
      <p>The Indian Meteorological Department (IMD) has released its much-awaited seasonal forecast, predicting above-normal rainfall during the upcoming monsoon season. This news brings significant relief to farmers across the country who depend heavily on the annual monsoon for their crops.</p>
      
      <p>According to the IMD, the southwest monsoon rainfall is likely to be 106% of the Long Period Average (LPA) with a model error of ±5%. The LPA of the season rainfall over the country as a whole for the period 1971-2020 is 87 cm.</p>
      
      <p>The IMD Director General stated, "This year, we are expecting a favorable distribution of rainfall across all regions, which is crucial for agricultural operations. The monsoon is likely to arrive on time in Kerala by June 1 and progress normally across the country."</p>
      
      <p>The forecast indicates:</p>
      <ul>
        <li>Northwest India: 108% of LPA</li>
        <li>Central India: 106% of LPA</li>
        <li>Southern Peninsula: 104% of LPA</li>
        <li>Northeast India: 102% of LPA</li>
      </ul>
      
      <p>The positive forecast comes as a relief after last year's slightly deficient rainfall in some parts of the country. Agricultural experts suggest that farmers should prepare for the season by ensuring proper drainage systems are in place to handle excess rainfall in some regions.</p>
      
      <p>The Ministry of Agriculture has advised farmers to plan their sowing accordingly and has assured that adequate supplies of seeds and fertilizers have been arranged for the Kharif season.</p>
    `,
    date: "2025-06-08",
    source: "Weather Watch",
    author: "Priya Desai",
    category: "Weather",
    image: "/placeholder.svg?height=500&width=800",
    relatedArticles: [4, 7],
  },
  {
    id: 3,
    title: "New pest-resistant cotton variety developed by agricultural scientists",
    summary:
      "Scientists at the Indian Agricultural Research Institute have developed a new cotton variety that shows significant resistance to bollworm and other common pests, potentially reducing the need for pesticides.",
    content: `
      <p>In a significant breakthrough for cotton farmers, scientists at the Indian Agricultural Research Institute (IARI) have developed a new cotton variety that shows remarkable resistance to bollworm and other common pests that plague cotton crops.</p>
      
      <p>The new variety, named 'Rakshak-1', has been developed after nearly a decade of research using conventional breeding techniques. It demonstrates up to 70% natural resistance against bollworm attacks, potentially reducing the need for pesticides significantly.</p>
      
      <p>Dr. Anita Sharma, lead scientist on the project, explained, "This variety has been developed by crossing indigenous cotton varieties with certain wild relatives that naturally possess pest-resistant traits. The result is a robust cotton variety that not only resists pests but also maintains high yield and fiber quality."</p>
      
      <p>Key features of Rakshak-1 include:</p>
      <ul>
        <li>70% natural resistance to bollworm</li>
        <li>50% resistance to sucking pests like jassids and aphids</li>
        <li>Yield potential of 25-30 quintals per hectare</li>
        <li>Medium-long staple length suitable for textile industry requirements</li>
        <li>Adaptability to various soil types across cotton-growing regions</li>
      </ul>
      
      <p>Field trials conducted across major cotton-growing states have shown promising results, with farmers reporting significantly reduced pest damage and pesticide usage. The variety is expected to be released for commercial cultivation next season after final regulatory approvals.</p>
      
      <p>Agricultural experts believe this development could be a game-changer for cotton farmers who currently spend a substantial portion of their cultivation costs on pesticides. The reduced need for chemical sprays will also have positive environmental and health impacts.</p>
    `,
    date: "2025-06-05",
    source: "Crop Science Weekly",
    author: "Dr. Vikram Patel",
    category: "Research",
    image: "/placeholder.svg?height=500&width=800",
    relatedArticles: [6, 8],
  },
  {
    id: 4,
    title: "Farmers in Maharashtra report record wheat harvest this season",
    summary:
      "Wheat farmers in Maharashtra are celebrating a bumper harvest this season, with yields up by 15% compared to last year due to favorable weather conditions and improved farming techniques.",
    content: `
      <p>Wheat farmers across Maharashtra are celebrating an exceptional harvest season, with many districts reporting record yields. According to the State Agriculture Department, the average wheat yield this season has increased by approximately 15% compared to last year.</p>
      
      <p>The bumper harvest is attributed to a combination of favorable weather conditions, improved seed varieties, and the adoption of better farming techniques. Timely rainfall during the growing season and moderate temperatures during the grain filling stage contributed significantly to the increased productivity.</p>
      
      <p>Rajesh Patil, a farmer from Ahmednagar district who harvested 52 quintals per hectare, shared his experience: "This year, I used the new HD-3226 wheat variety recommended by the agricultural extension officer and followed the precise irrigation schedule they suggested. The results have exceeded my expectations."</p>
      
      <p>The State Agriculture Department reports that:</p>
      <ul>
        <li>Total wheat production in the state has reached 2.8 million tonnes, up from 2.4 million tonnes last year</li>
        <li>Average yield has increased from 35 quintals per hectare to 40 quintals per hectare</li>
        <li>Districts like Ahmednagar, Pune, and Nashik have recorded the highest productivity</li>
        <li>Nearly 60% of farmers adopted improved varieties this season</li>
      </ul>
      
      <p>The increased production has also stabilized wheat prices in local markets, benefiting consumers. The Agriculture Minister has announced plans to further boost wheat production in the state by promoting water-efficient technologies and climate-resilient varieties.</p>
      
      <p>Farmers' organizations are now advocating for better storage facilities to prevent post-harvest losses and ensure that farmers can hold their produce for better prices rather than selling immediately after harvest when prices tend to be lower.</p>
    `,
    date: "2025-06-03",
    source: "Rural Times",
    author: "Sanjay Jadhav",
    category: "Success Story",
    image: "/placeholder.svg?height=500&width=800",
    relatedArticles: [2, 7],
  },
  {
    id: 5,
    title: "New agricultural export policy aims to double farm exports by 2030",
    summary:
      "The government has unveiled a new agricultural export policy with the ambitious target of doubling farm exports to $60 billion by 2030, focusing on organic and value-added products.",
    content: `
      <p>The government has unveiled a comprehensive new agricultural export policy with the ambitious target of doubling India's farm exports from the current $30 billion to $60 billion by 2030. The policy places special emphasis on promoting organic and value-added agricultural products in international markets.</p>
      
      <p>The Commerce and Agriculture Ministers jointly announced the policy, highlighting that it aims to position India as a reliable supplier of safe and nutritious food to the world. The policy identifies 20 agricultural product clusters across the country that will receive focused attention for export promotion.</p>
      
      <p>Key features of the new export policy include:</p>
      <ul>
        <li>Establishment of dedicated agricultural export zones with integrated facilities</li>
        <li>Streamlined certification processes for organic and GI (Geographical Indication) products</li>
        <li>Financial incentives for farmers and FPOs (Farmer Producer Organizations) engaged in export-oriented production</li>
        <li>Development of cold chain infrastructure specifically for export markets</li>
        <li>Capacity building programs for farmers on international quality standards and requirements</li>
      </ul>
      
      <p>The Commerce Minister stated, "This policy represents a paradigm shift from being production-centric to becoming market-oriented. We are focusing on the entire value chain from farm to foreign markets."</p>
      
      <p>The policy has identified high-value products like basmati rice, fresh fruits, organic cereals, medicinal plants, and processed foods as priority items for export promotion. It also emphasizes the need to diversify export destinations beyond traditional markets.</p>
      
      <p>Industry experts have welcomed the policy but emphasized the need for effective implementation and coordination between various government departments and states to achieve the ambitious targets.</p>
    `,
    date: "2025-06-01",
    source: "Economic Observer",
    author: "Meera Krishnan",
    category: "Policy",
    image: "/placeholder.svg?height=500&width=800",
    relatedArticles: [1, 8],
  },
  {
    id: 6,
    title: "Innovative drip irrigation system helps farmers save 60% water",
    summary:
      "A new solar-powered drip irrigation system developed by Indian engineers is helping farmers reduce water usage by up to 60% while maintaining or improving crop yields.",
    content: `
      <p>A revolutionary solar-powered drip irrigation system developed by a team of engineers from an agricultural university in Tamil Nadu is helping farmers dramatically reduce water usage while maintaining or even improving crop yields.</p>
      
      <p>The system, named "JalSmart," combines precision drip irrigation technology with soil moisture sensors and solar power, creating an automated and sustainable solution for water management in agriculture. Field tests across different agro-climatic zones have shown water savings of up to 60% compared to conventional irrigation methods.</p>
      
      <p>Dr. Ramesh Kumar, the lead developer, explained, "JalSmart uses real-time soil moisture data to deliver precisely the amount of water crops need, exactly when they need it. The solar panels power both the pumps and the smart control system, making it completely off-grid and suitable for remote agricultural areas."</p>
      
      <p>Key features of the JalSmart system include:</p>
      <ul>
        <li>Wireless soil moisture sensors that continuously monitor water needs</li>
        <li>AI-based control system that learns optimal irrigation patterns for specific crops</li>
        <li>Solar panels that generate sufficient power for operation with battery backup</li>
        <li>Mobile app interface allowing farmers to monitor and control the system remotely</li>
        <li>Modular design that can be scaled from small farms to large agricultural operations</li>
      </ul>
      
      <p>Farmers who have adopted the system report not only water savings but also reduced electricity or diesel costs for pumping, decreased labor requirements, and in many cases, improved crop quality due to more consistent moisture levels.</p>
      
      <p>The innovation comes at a critical time when many agricultural regions in India are facing water scarcity and declining groundwater levels. The Ministry of Agriculture has shown interest in including the system under its subsidy scheme for micro-irrigation to promote wider adoption.</p>
    `,
    date: "2025-05-28",
    source: "Tech for Agriculture",
    author: "Arjun Mehta",
    category: "Technology",
    image: "/placeholder.svg?height=500&width=800",
    relatedArticles: [3, 8],
  },
  {
    id: 7,
    title: "Organic farming area in India increases by 25% in the last year",
    summary:
      "The area under certified organic farming in India has increased by 25% in the past year, with more farmers transitioning to sustainable practices in response to growing consumer demand.",
    content: `
      <p>The area under certified organic farming in India has witnessed a remarkable 25% increase over the past year, according to the latest data released by the Ministry of Agriculture. This significant growth reflects the accelerating transition towards sustainable agricultural practices across the country.</p>
      
      <p>As per the report, the total area under organic certification now stands at 3.8 million hectares, up from 3.04 million hectares last year. Additionally, another 1.2 million hectares are under the conversion process, which typically takes 2-3 years before achieving full organic certification.</p>
      
      <p>The growth is attributed to several factors:</p>
      <ul>
        <li>Increasing consumer demand for chemical-free food products both domestically and internationally</li>
        <li>Premium prices that organic produce commands in the market</li>
        <li>Government support through various schemes promoting organic farming</li>
        <li>Growing awareness among farmers about the long-term benefits of sustainable agriculture</li>
        <li>Successful farmer-to-farmer knowledge transfer through organic farming clusters</li>
      </ul>
      
      <p>Sikkim, which became India's first fully organic state in 2016, continues to lead the way, while states like Madhya Pradesh, Maharashtra, Rajasthan, and the northeastern states have shown the highest growth rates in organic area expansion.</p>
      
      <p>The report also highlights that the number of certified organic producers has increased to over 1.5 million, with many small and marginal farmers organizing themselves into Farmer Producer Organizations (FPOs) to overcome certification costs and marketing challenges.</p>
      
      <p>Industry experts predict that this growth trend will continue as export opportunities expand and domestic consumers become increasingly health and environment conscious.</p>
    `,
    date: "2025-05-25",
    source: "Organic Farming Today",
    author: "Sunita Narain",
    category: "Trends",
    image: "/placeholder.svg?height=500&width=800",
    relatedArticles: [2, 4],
  },
  {
    id: 8,
    title: "New mobile app connects farmers directly to institutional buyers",
    summary:
      "A new mobile application launched by an agri-tech startup is helping farmers connect directly with hotels, restaurants, and institutional buyers, eliminating middlemen and increasing farmer profits.",
    content: `
      <p>A new mobile application called "FarmDirect" launched by Bangalore-based agri-tech startup GreenChain is revolutionizing how farmers sell their produce by connecting them directly with hotels, restaurants, and institutional buyers across India.</p>
      
      <p>The platform, which has already onboarded over 25,000 farmers and 3,000 institutional buyers in its first six months, aims to eliminate multiple layers of middlemen in the agricultural supply chain, allowing farmers to capture a larger share of the final selling price.</p>
      
      <p>Anand Krishnan, founder and CEO of GreenChain, explained the concept: "FarmDirect is essentially creating a transparent digital marketplace where farmers can list their produce with prices, quality parameters, and available quantities. Institutional buyers can browse, compare, and place orders directly. Our logistics partners then handle the collection and delivery."</p>
      
      <p>Key features of the FarmDirect app include:</p>
      <ul>
        <li>Real-time price discovery and comparison with local mandi rates</li>
        <li>Quality verification and standardization process</li>
        <li>Integrated logistics and delivery tracking</li>
        <li>Digital payments with 48-hour settlement guarantee to farmers</li>
        <li>Rating system for both farmers and buyers to build trust</li>
      </ul>
      
      <p>Farmers using the platform report receiving 20-30% higher prices compared to traditional channels. Ravi Patil, a vegetable farmer from Karnataka, shared his experience: "Earlier, I would sell my tomatoes for ₹8-10 per kg to traders. Through FarmDirect, I'm getting ₹12-15 per kg directly from restaurants in Bangalore."</p>
      
      <p>On the buyer side, restaurants and hotels appreciate the traceability and consistency in quality. The app also allows them to plan their purchases better and reduce wastage.</p>
      
      <p>The startup has raised $5 million in funding and plans to expand to 100 cities and onboard 100,000 farmers by the end of next year.</p>
    `,
    date: "2025-05-22",
    source: "Digital Farming",
    author: "Kiran Rao",
    category: "Technology",
    image: "/placeholder.svg?height=500&width=800",
    relatedArticles: [5, 6],
  },
]

export default function NewsDetailPage({ params }) {
  const { id } = params
  const { toast } = useToast()
  const [article, setArticle] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  
  useEffect(() => {
    // Find the article with the matching ID
    const foundArticle = newsItems.find(item => item.id === Number(id))
    
    if (foundArticle) {
      setArticle(foundArticle)
      
      // Get related articles
      if (foundArticle.relatedArticles && foundArticle.relatedArticles.length > 0) {
        const related = newsItems.filter(item => 
          foundArticle.relatedArticles.includes(item.id)
        )
        setRelatedArticles(related)
      }
    }
  }, [id])
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      })
    } else {
