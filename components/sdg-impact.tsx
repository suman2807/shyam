import { Card, CardContent } from "@/components/ui/card"

export default function SdgImpact() {
  const sdgs = [
    {
      number: 1,
      name: "No Poverty",
      description: "Boosts farmer incomes via direct sales",
      icon: (
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
          className="h-6 w-6 text-red-600"
        >
          <path d="M2 12h20" />
          <path d="M12 2v20" />
        </svg>
      ),
      color: "bg-red-100 text-red-700",
    },
    {
      number: 2,
      name: "Zero Hunger",
      description: "Strengthens local food systems",
      icon: (
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
          className="h-6 w-6 text-yellow-600"
        >
          <path d="M12 2a10 10 0 1 0 10 10H2A10 10 0 0 0 12 2Z" />
        </svg>
      ),
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      number: 4,
      name: "Quality Education",
      description: "Shares knowledge through AI and community tools",
      icon: (
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
          className="h-6 w-6 text-red-600"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      color: "bg-red-100 text-red-700",
    },
    {
      number: 9,
      name: "Industry, Innovation, Infrastructure",
      description: "Modernizes agriculture with tech",
      icon: (
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
          className="h-6 w-6 text-orange-600"
        >
          <path d="M2 22h20" />
          <path d="M18 8V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
          <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
          <path d="m2 8 10-5 10 5" />
        </svg>
      ),
      color: "bg-orange-100 text-orange-700",
    },
    {
      number: 10,
      name: "Reduced Inequalities",
      description: "Includes low-literacy farmers with voice support",
      icon: (
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
          className="h-6 w-6 text-pink-600"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      ),
      color: "bg-pink-100 text-pink-700",
    },
    {
      number: 12,
      name: "Responsible Consumption",
      description: "Reduces food waste via surplus redistribution",
      icon: (
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
          className="h-6 w-6 text-amber-600"
        >
          <path d="M22 12H2" />
          <path d="M12 2v20" />
          <path d="m19 15 3-3-3-3" />
          <path d="m5 9-3 3 3 3" />
        </svg>
      ),
      color: "bg-amber-100 text-amber-700",
    },
    {
      number: 13,
      name: "Climate Action",
      description: "Enhances resilience with weather insights",
      icon: (
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
          className="h-6 w-6 text-green-600"
        >
          <path d="M12 2v8" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m19.07 10.93-1.41 1.41" />
          <path d="M22 22H2" />
          <path d="M8 6h8" />
          <path d="M16 12h2" />
          <path d="M8 12h4" />
          <path d="M4 16h16" />
        </svg>
      ),
      color: "bg-green-100 text-green-700",
    },
    {
      number: 15,
      name: "Life on Land",
      description: "Promotes sustainable farming with AI crop health tools",
      icon: (
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
          className="h-6 w-6 text-green-600"
        >
          <path d="M8 19h8a4 4 0 0 0 4-4 7 7 0 0 0-7-7h-1a5 5 0 0 0-5 5v3a4 4 0 0 0 1 8Z" />
          <path d="M10 19v3" />
          <path d="M14 19v3" />
        </svg>
      ),
      color: "bg-green-100 text-green-700",
    },
  ]

  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">SDG Impact</div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Addressing Sustainable Development Goals</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            FarmLink contributes to 8 of the UN's Sustainable Development Goals through its innovative approach.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sdgs.map((sdg) => (
          <Card key={sdg.number} className="overflow-hidden">
            <div className={`p-4 ${sdg.color}`}>
              <div className="flex items-center gap-2">
                {sdg.icon}
                <span className="font-bold">Goal {sdg.number}</span>
              </div>
              <h3 className="mt-1 font-semibold">{sdg.name}</h3>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">{sdg.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
