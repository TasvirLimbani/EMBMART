import { Download, Shield, Cpu, CreditCard } from "lucide-react"

const features = [
  {
    icon: Download,
    title: "Instant Downloads",
    description: "Get your designs immediately after purchase. No waiting time required.",
  },
  {
    icon: Shield,
    title: "High-Quality Designs",
    description: "All designs are professionally digitized for perfect stitching results.",
  },
  {
    icon: Cpu,
    title: "All Machine Support",
    description: "Compatible with all major embroidery machine brands and formats.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Your transactions are protected with industry-standard encryption.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border transition hover:border-primary hover:shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
